import { AdvertiserTier } from './tennisAcademies';

export type HotelType = 'resort' | 'hotel_fazenda' | 'pousada' | 'hotel_urbano';

export interface TennisHotel {
  id: string;
  name: string;
  hotelType: HotelType;
  typeLabel: string;
  tier: AdvertiserTier;
  description: string;
  location: string;
  city: string;
  state: string;
  distanceKm?: number;
  whatsapp: string;
  phone: string;
  imageUrl: string;
  courtsCount: number;
  courtSurfaces: string[]; // ['Saibro', 'Rápida', 'Grama', 'Coberta']
  amenities: string[]; // ['Quadras Iluminadas', 'Professor Residente', 'Aluguel de Raquetes', 'Piscina', 'Restaurante']
  priceRange?: string; // ex: "Diárias a partir de R$ 480"
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
}
