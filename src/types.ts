export interface Band {
  id: string;
  name: string;
  logo: string; // fallback initials or styling description
  slogan: string;
  description: string;
  established: string;
  vocalist: string;
  famousSongs: { title: string; year: string; previewNote?: string; mp3Url?: string }[];
  accentColor: string; // e.g. text-gold-500 or shadow-red-500
  memberNames: string[];
  image?: string;
  totalMembers?: number;
  photoDescription?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  earlyBirdPrice?: number;
  normalPrice?: number;
  type?: string;
  level?: string;
  perks: string[];
  color: string;
  status: 'Available' | 'Selling Fast' | 'Sold Out';
  seatsLeft?: number;
  hideNormalPrice?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    pointsFor: 'search' | 'wings' | 'xpdc';
  }[];
}

export interface Shoutout {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
  badge?: string;
}
