import { AdvertiserTier } from './tennisAcademies';

export type StoreCategory =
  | 'loja'
  | 'encordoamento'
  | 'customizacao'
  | 'fisioterapia'
  | 'calcados_vestuario';

export interface ProductServiceItem {
  name: string;
  price?: string;
  description?: string;
}

export interface TennisStoreService {
  id: string;
  name: string;
  category: StoreCategory;
  categoryLabel: string;
  tier: AdvertiserTier;
  description: string;
  location: string;
  city: string;
  state: string;
  distanceKm?: number;
  whatsapp: string;
  phone: string;
  imageUrl: string;
  catalog: ProductServiceItem[];
  brands?: string[]; // Babolat, Wilson, Head, Yonex, Asics, Nike
  openingHours?: string;
  website?: string;
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
}
