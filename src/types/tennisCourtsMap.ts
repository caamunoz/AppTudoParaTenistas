export type CourtSurface = 'Saibro' | 'Rápida' | 'Grama Sintética' | 'Grama Natural' | 'Mista';

export interface TennisCourtMarker {
  id: string;
  name: string;
  courtType: CourtSurface;
  courtCount: number;
  isCovered: boolean;
  isPublic: boolean;
  pricePerHour: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  phone?: string;
  whatsapp?: string;
  photoUrl: string;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  hasLighting: boolean;
  hasParking: boolean;
  hasLockerRooms: boolean;
  hasCanteen: boolean;
  openingHours: string;
  xPercent: number; // Coordenadas percentuais no mapa
  yPercent: number;
}
