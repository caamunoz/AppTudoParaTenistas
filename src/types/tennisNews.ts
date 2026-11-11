export interface TennisNewsArticle {
  id: string;
  title: string;
  date: string;
  time: string;
  imageUrl: string;
  source: 'ESPN Tênis' | 'TênisNews' | 'ATP Tour' | 'WTA Brasil';
  sourceUrl?: string;
  category: 'ATP' | 'WTA' | 'Rio Open' | 'Circuito Brasileiro' | 'Grand Slam';
  author: string;
  lead: string;
  paragraphs: string[];
  tags: string[];
}
