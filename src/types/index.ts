export type Language = 'ru' | 'kg';
export type Currency = 'USD' | 'KGS';

export interface Layout {
  id: string;
  rooms: 1 | 2 | 3 | 4 | 'penthouse';
  roomsLabelRu: string;
  roomsLabelKg: string;
  areaSqm: number;
  floor: string;
  priceUsd: number;
  priceKgs: number;
  planImage: string;
  features: string[];
}

export interface ResidentialComplex {
  id: string;
  name: string;
  districtRu: string;
  districtKg: string;
  locationArea: 'center' | 'yugo-vostok' | 'anar' | 'naberezhnaya';
  status: 'building' | 'ready';
  statusLabelRu: string;
  statusLabelKg: string;
  classType: 'comfort' | 'comfort_plus' | 'business' | 'premium';
  classLabelRu: string;
  classLabelKg: string;
  completionRu: string;
  completionKg: string;
  priceUsdPerSqm: number;
  priceKgsPerSqm: number;
  image: string;
  badge?: string;
  floors: number;
  addressRu: string;
  addressKg: string;
  taglineRu: string;
  taglineKg: string;
  descriptionRu: string;
  descriptionKg: string;
  specs: {
    seismic: string;
    ceiling: string;
    parking: string;
    courtyard: string;
    materials: string;
  };
  layouts: Layout[];
}

export interface CaseStudy {
  id: string;
  name: string;
  locationRu: string;
  locationKg: string;
  yearCompleted: string;
  image: string;
  situationRu: string;
  situationKg: string;
  solutionRu: string[];
  solutionKg: string[];
  results: {
    value: string;
    labelRu: string;
    labelKg: string;
  }[];
}

export interface TeamMember {
  id: string;
  nameRu: string;
  nameKg: string;
  roleRu: string;
  roleKg: string;
  experienceRu: string;
  experienceKg: string;
  image: string;
}

export interface PurchaseOption {
  id: string;
  titleRu: string;
  titleKg: string;
  tagRu: string;
  tagKg: string;
  highlightRu: string;
  highlightKg: string;
  descriptionRu: string;
  descriptionKg: string;
  benefitsRu: string[];
  benefitsKg: string[];
  isPopular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  complex: string;
  apartmentType: string;
  rating: number;
  date: string;
  source: '2gis' | 'google' | 'video';
  videoPreviewUrl?: string;
  videoDuration?: string;
  avatar: string;
  textRu: string;
  textKg: string;
  verifiedResident: boolean;
}

export interface LegalDocument {
  id: string;
  titleRu: string;
  titleKg: string;
  docNumber: string;
  issuerRu: string;
  issuerKg: string;
  date: string;
  descriptionRu: string;
  descriptionKg: string;
  thumbImage: string;
  fullImage: string;
  badgeRu: string;
  badgeKg: string;
}

export interface FaqItem {
  id: string;
  questionRu: string;
  questionKg: string;
  answerRu: string;
  answerKg: string;
  category: 'legal' | 'construction' | 'finance';
}

export interface ConsultationDialog {
  id: string;
  timestamp: string;
  type: 'quiz' | 'tour' | 'plan_request' | 'trade_in' | 'whatsapp_direct';
  typeLabelRu: string;
  typeLabelKg: string;
  contactName: string;
  phone: string;
  details: {
    complexName?: string;
    rooms?: string;
    district?: string;
    paymentMethod?: string;
    preferredDate?: string;
    comments?: string;
  };
  status: 'saved' | 'sent_whatsapp';
}
