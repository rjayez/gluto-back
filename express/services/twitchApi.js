const axios = require('axios');
const {response} = require("express");
require('dotenv').config();

const BASE_URL = "https://api.twitch.tv/helix";

const gamePictureCache = {};

const HEADERS = {
    "Client-Id": process.env.CLIENT_ID,
    "Authorization": `Bearer ${process.env.TWITCH_API_TOKEN}`
};
const OFFSET = 60 // 1 heure pour UTC+1

function getWeekSchedule(id) {

    const nbElement = 7;
    const monday = getMonday(new Date().setHours(1, 0, 0));

    console.log(monday.toISOString());
    const nextMonday = new Date();
    nextMonday.setHours(1, 0, 0);
    nextMonday.setDate(monday.getDate() + 7);
    console.log(nextMonday.toISOString());


    const url = `${BASE_URL}/schedule?broadcaster_id=${id}&utc_offset=${OFFSET}&first=${nbElement}&start_time=${monday.toISOString()}`
    console.log(url);
    return axios.get(url, {headers: HEADERS})
        .then(response => {

            const segments = response.data.data.segments;
            const gameIds = [...new Set(segments.map(stream => stream.category.id))];

            //
            return Promise.all(gameIds.map(getGamePicture))
                .then(() => {
                    return segments
                        .flatMap(segment => mapSchedule(segment))
                        .filter(seg => new Date(seg.debut) < nextMonday)
                })
        });

}


function getGamePicture(gameId) {

    if (gamePictureCache[gameId]) {
        return Promise.resolve(gamePictureCache[gameId]);
    }

    const url = `${BASE_URL}/games?id=${gameId}`
    return axios.get(url, {headers: HEADERS})
        .then(res => {
                let boxArtUrl = res.data?.data[0]?.box_art_url || "";
                gamePictureCache[gameId] = boxArtUrl;
                return boxArtUrl
            }
        );

}

function mapSchedule(stream) {
    // const image_jeu_url = await getGamePicture(stream?.category?.id)
    return {
        debut: stream?.start_time,
        fin: stream?.end_time,
        jeu: stream?.category.name,
        estPassee : new Date(stream?.end_time) < new Date(),
        image_jeu_url: gamePictureCache[stream?.category?.id]
    }
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

getMonday(new Date());

function getStreamPresent(id){

    const url = `${BASE_URL}/streams?user_id=${id}`
    return axios.get(url, {headers: HEADERS})
        .then((response) => {
            return {
                isLive : response.data?.data?.length > 0
            }
        })
}

module.exports = {getWeekSchedule, getStreamPresent};