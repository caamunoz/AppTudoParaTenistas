export interface TennisPlayerMarker {
  id: string;
  name: string;
  photoUrl: string;
  level: string;
  yearsPlaying: number | string;
  placesPlaying: string;
  distanceKm: number;
  neighborhood: string;
  city: string;
  xPercent: number; // 0 a 100 para posicionamento exato no mapa
  yPercent: number;
  isCurrentUser?: boolean;
}

export interface PlayerChatMessage {
  id: string;
  sender: 'me' | 'player';
  text: string;
  time: string;
}
