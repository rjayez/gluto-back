import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Card } from "../cards/schema/card.schema";
import { CardsService } from "../cards/cards.service";
import { CollectionCard } from "./schema/collectionCard.schema";
import { UserCardDto } from "./dto/user-card.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cardsService: CardsService
  ) {}

  getCollection(twitchId: string): Promise<UserCardDto[]> {
    const allCards = this.cardsService.findAll();

    const then = this.userModel
      .findOne({ id: twitchId })
      .then(user => user.cards)
      .then(cards => cards.map(card => this.cardsService.findOne(card.card._id)))
      .then(cards => Promise.all(cards));

    return Promise.all([allCards, then]).then(array => {
      const allCards = array[0];
      const collectionCards = array[1];

      return this.buildUserCollection(allCards, collectionCards);
    });
  }

  buildUserCollection(allCards: Card[], collectionCards: Card[]): UserCardDto[] {
    const collectionIds = collectionCards.map(card => card._id.toString());
    const uncaughtCard = allCards.filter(card => !collectionIds.includes(card._id.toString()));

    const uncaughtUserCard = uncaughtCard.map(card => {
      const userCard = new UserCardDto();
      userCard.order = card.order;
      userCard.rarity = card.rarity.name;
      userCard.serie = card.serie.name;
      userCard.category = card.category.name;
      userCard.subCategory = card.subCategory.name;
      userCard.rarityOrder = card.rarity.order;
      userCard.serieOrder = card.serie.order;
      userCard.categoryOrder = card.category.order;
      userCard.subCategoryOrder = card.subCategory.order;
      userCard.revealed = false;
      userCard.pictureUrl = "";
      return userCard;
    });

    const userCollectionCard = collectionCards.map(card => {
      const userCard = new UserCardDto();
      userCard.name = card.name;
      userCard.description = card.description;
      // TODO Refacto
      userCard.order = card.order;
      userCard.rarity = card.rarity.name;
      userCard.serie = card.serie.name;
      userCard.category = card.category.name;
      userCard.subCategory = card.subCategory.name;
      userCard.rarityOrder = card.rarity.order;
      userCard.serieOrder = card.serie.order;
      userCard.categoryOrder = card.category.order;
      userCard.subCategoryOrder = card.subCategory.order;
      userCard.revealed = true;
      userCard.pictureUrl = card.pictureUrl;
      return userCard;
    });

    uncaughtUserCard.push(...userCollectionCard);
    return uncaughtUserCard;
  }

  exists(twitchId: string): Promise<boolean> {
    return this.userModel.exists({ id: twitchId }).then(user => user !== null);
  }

  findOrCreate(twitchId: number, username: string, displayName: string) {
    return this.userModel.findOneAndUpdate(
      { id: twitchId },
      { id: twitchId, username: username, displayName: displayName },
      { upsert: true }
    );
  }

  async addCardToCollection(userId: string, droppedCards: Card[]): Promise<boolean> {
    // return

    // Récupére la collection actuelle et prépare la mise à jour avec les nouvelles cartes tirées
    const then = await this.userModel
      .findOne({ id: userId })
      .populate("cards")
      .then(result => this.buildUpdatedCollection(result.cards, droppedCards));

    // Mets à jour MongoDB avec les nouvelles cartes
    return this.userModel
      .updateMany({
        $set: {
          cards: then,
        },
      })
      .then(_ => {
        // console.info("COLLECTION", _);
        return true;
      })
      .catch(_ => false);
  }

  // TODO Refacto et simplifier
  buildUpdatedCollection(previousCollection: CollectionCard[], droppedCards: Card[]) {
    let droppedIds = droppedCards.map(droppedCard => droppedCard._id.toString());
    const collectionCardIds = previousCollection.map(value => value.card._id.toString());

    // Mets à jour la collection si doublon sur le tirage
    const collectionCards = previousCollection.map(cardCollection => {
      if (droppedIds.includes(cardCollection.card._id.toString())) {
        cardCollection.timeDropped += 1;
      }
      return cardCollection;
    });

    const newCards = droppedCards
      .filter(droppedCard => !collectionCardIds.includes(droppedCard._id.toString()))
      .map(value => this.buildCollectionCardModel(value._id));

    collectionCards.push(...newCards);

    return collectionCards;
  }

  buildCollectionCardModel(cardId) {
    const collectionCard = new CollectionCard();
    collectionCard.card = new Card();
    collectionCard.card._id = cardId;
    collectionCard.timeDropped = 1;

    return {
      card: cardId,
      timeDropped: 1,
    };
  }
}
