export type AdvertiserTier = 'diamond' | 'gold' | 'silver' | 'bronze' | 'free';

export interface TennisCoachAcademy {
  id: string;
  name: string;
  type: 'professor' | 'academia' | 'rebatedor' | 'encordoamento';
  tier: AdvertiserTier;
  description: string;
  location: string;
  city: string;
  state: string;
  distanceKm?: number;
  whatsapp: string;
  phone: string;
  imageUrl: string;
  services: string[];
  hourlyRate?: string;
  rating?: number;
  reviewsCount?: number;
  featured?: boolean;
}
