export type Language = 'en' | 'ta';

export type InquiryCategory = 'electricity' | 'ration' | 'land' | 'women' | 'edu' | 'grievance';

export interface Inquiry {
  id: string;
  category: InquiryCategory;
  citizenName: string;
  identifier: string; // e.g. EB Consumer No, Ration Card No, Survey No, Aadhaar
  detail: string;
  createdAt: string;
  status: 'Pending' | 'Assigned' | 'In Progress' | 'Resolved';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface ServiceGuide {
  title: string;
  titleTa: string;
  icon: string;
  shortDesc: string;
  shortDescTa: string;
  badge: string;
  badgeTa: string;
  bannerTitle: string;
  bannerTitleTa: string;
  idLabel: string;
  idLabelTa: string;
  idPlaceholder: string;
  idPlaceholderTa: string;
  highlights: string[];
  highlightsTa: string[];
  ctaText: string;
  ctaTextTa: string;
}
