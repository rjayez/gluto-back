const axios = require("axios");
const { response } = require("express");
const { DateTime } = require("luxon");
require("dotenv").config();

const BASE_URL = "https://api.twitch.tv/helix";

const gamePictureCache = {};

const HEADERS = {
  "Client-Id": process.env.CLIENT_ID,
  Authorization: `Bearer ${process.env.TWITCH_API_TOKEN}`,
};
const OFFSET = 60; // 1 heure pour UTC+1

const WEEK_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function getWeekSchedule(id) {
  const nbElement = 7;
  const monday = DateTime.now().startOf("week");

  const nextMonday = monday.plus({ days: 7 });
  let nextDay = monday;
  // Setup le tableau de la semaine avec les dates de chaque jour
  const weekSchedule = WEEK_FR.map(day => {
    const dayObject = {
      jour: day,
      date: nextDay.toUTC(60),
      estPassee: nextDay < DateTime.now().startOf("day"),
    };
    nextDay = nextDay.plus({ days: 1 });
    return dayObject;
  });

  const url = `${BASE_URL}/schedule?broadcaster_id=${id}&utc_offset=${OFFSET}&first=${nbElement}&start_time=${monday.toUTC()}`;
  return axios.get(url, { headers: HEADERS }).then(response => {
    const segments = response.data.data.segments;
    const gameIds = [...new Set(segments.map(stream => stream.category.id))];

    // Récupére les images des jeux des streams
    return Promise.all(gameIds.map(getGamePicture))
      .then(() => {
        return (
          segments
            .flatMap(segment => mapSchedule(segment))
            // Filtre pour garder uniquement les streams de la semaine en cours
            .filter(seg => DateTime.fromISO(seg.debut) < nextMonday)
            // Filtre si jamais un stream est annulé en cours de semaine
            .filter(seg => !seg.estAnnule)
        );
      })
      .then(twitchScedule => {
        return weekSchedule.map(dailySchedule => {
          const streams = twitchScedule.filter(schedule =>
            dailySchedule.date.hasSame(DateTime.fromISO(schedule.debut), "day")
          );
          return {
            ...dailySchedule,
            streams,
          };
        });
      });
  });
}

function getGamePicture(gameId) {
  if (gamePictureCache[gameId]) {
    return Promise.resolve(gamePictureCache[gameId]);
  }

  const url = `${BASE_URL}/games?id=${gameId}`;
  return axios.get(url, { headers: HEADERS }).then(res => {
    let boxArtUrl = res.data?.data[0]?.box_art_url || "";
    gamePictureCache[gameId] = boxArtUrl;
    return boxArtUrl;
  });
}

function mapSchedule(stream) {
  return {
    debut: stream?.start_time,
    fin: stream?.end_time,
    jeu: stream?.category.name,
    titre: stream?.title,
    estAnnule: stream?.canceled_until !== null,
    imageJeuUrl: gamePictureCache[stream?.category?.id],
  };
}

function getStreamPresent(id) {
  const url = `${BASE_URL}/streams?user_id=${id}`;
  return axios.get(url, { headers: HEADERS }).then(response => {
    return {
      isLive: response.data?.data?.length > 0,
    };
  });
}

module.exports = { getWeekSchedule, getStreamPresent };
