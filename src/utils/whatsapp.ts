import { OSH_OFFICE_DETAILS } from '../data/content';

export const getWhatsAppUrl = (messageText: string): string => {
  const cleanPhone = OSH_OFFICE_DETAILS.whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(messageText);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
};

export const openWhatsApp = (messageText: string) => {
  const url = getWhatsAppUrl(messageText);
  window.open(url, '_blank', 'noopener,noreferrer');
};
