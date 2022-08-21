import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Put } from "@nestjs/common";
import { CardsService } from "../cards/cards.service";
import { UsersService } from "./users.service";
import { ApiNoContentResponse } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly cardsService: CardsService) {}

  @Get(":id/collection")
  async getCollection(@Param("id") twitchId: string) {
    // Vérifier la présence de l'utilisateur
    const userExist = await this.usersService.exists(twitchId);
    if (!userExist) throw new NotFoundException();

    return this.usersService.getCollection(twitchId);
  }

  @Put(":id/collection")
  @ApiNoContentResponse({ description: "Carte tirée !" })
  async dropRandomCardForCollection(@Param("id") twitchId: string) {
    // Vérifier la présence de l'utilisateur
    const userExist = await this.usersService.exists(twitchId);
    if (!userExist) throw new NotFoundException();

    // Tirage des cartes
    const cards = await this.cardsService.dropCardsForCollection(1);
    // Insertion dans la base
    return this.usersService
      .addCardToCollection(twitchId, cards)
      .catch(reason => new InternalServerErrorException(reason));
  }
}
