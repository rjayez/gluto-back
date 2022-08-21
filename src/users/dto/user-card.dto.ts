export class UserCardDto {
  name?: string;
  description?: string;
  rarity: string;
  serie: string;
  category: string;
  subCategory: string;
  order: number;
  rarityOrder: number;
  serieOrder: number;
  categoryOrder: number;
  subCategoryOrder: number;
  revealed: boolean;
  pictureUrl?: string;
}
