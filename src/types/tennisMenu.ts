import React from 'react';

export interface TennisOption {
  id: string;
  title: string;
  color: string;
  iconType:
    | 'torneios_atp'
    | 'noticias'
    | 'professores'
    | 'lojas'
    | 'hoteis'
    | 'encontrar_tenista'
    | 'encontrar_quadras'
    | 'encontrar_torneios'
    | 'rankings'
    | 'marcador';
}

export const TENNIS_MENU_OPTIONS: TennisOption[] = [
  {
    id: 'torneios-atp',
    title: 'TORNEIOS\nATP/WTA',
    color: '#00a896', // Ciano / verde-azulado
    iconType: 'torneios_atp',
  },
  {
    id: 'noticias',
    title: 'ÚLTIMAS\nNOTÍCIAS',
    color: '#8cb316', // Verde-oliva / amarelo-esverdeado
    iconType: 'noticias',
  },
  {
    id: 'professores',
    title: 'PROFESSORES\nACADEMIAS',
    color: '#8b3d9c', // Roxo
    iconType: 'professores',
  },
  {
    id: 'lojas',
    title: 'LOJAS E\nSERVIÇOS',
    color: '#e63946', // Vermelho
    iconType: 'lojas',
  },
  {
    id: 'hoteis',
    title: 'HOTÉIS C/\nQUADRAS',
    color: '#00a86b', // Verde esmeralda
    iconType: 'hoteis',
  },
  {
    id: 'encontrar-tenista',
    title: 'ENCONTRAR\nTENISTA',
    color: '#00b4d8', // Azul claro
    iconType: 'encontrar_tenista',
  },
  {
    id: 'encontrar-quadras',
    title: 'ENCONTRAR\nQUADRAS',
    color: '#e01e5a', // Rosa / magenta
    iconType: 'encontrar_quadras',
  },
  {
    id: 'encontrar-torneios',
    title: 'ENCONTRAR\nTORNEIOS',
    color: '#1d4ed8', // Azul royal
    iconType: 'encontrar_torneios',
  },
  {
    id: 'rankings',
    title: 'RANKINGS E\nTORNEIOS',
    color: '#eab308', // Amarelo dourado
    iconType: 'rankings',
  },
  {
    id: 'marcador',
    title: 'MARCADOR\nDE PLACAR',
    color: '#d946ef', // Magenta / rosa
    iconType: 'marcador',
  },
];
