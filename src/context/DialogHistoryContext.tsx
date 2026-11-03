import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationDialog } from '../types';

interface DialogHistoryContextType {
  dialogs: ConsultationDialog[];
  addDialog: (dialog: Omit<ConsultationDialog, 'id' | 'timestamp'>) => void;
  removeDialog: (id: string) => void;
  clearHistory: () => void;
  isHistoryOpen: boolean;
  openHistory: () => void;
  closeHistory: () => void;
}

const STORAGE_KEY = 'ordo_consultation_history_last_two';

const INITIAL_DEMO_DIALOGS: ConsultationDialog[] = [
  {
    id: 'dlg-init-1',
    timestamp: 'Вчера, 16:40',
    type: 'tour',
    typeLabelRu: 'Запись на экскурсию',
    typeLabelKg: 'Экскурсияга жазылуу',
    contactName: 'Нурбек',
    phone: '+996 555 12-XX-XX',
    details: {
      complexName: 'ЖК «Сулайман Резиденс»',
      preferredDate: 'Суббота, 14:00',
      comments: 'Интересует 3-комнатная квартира с видом на гору, этаж от 7 и выше.'
    },
    status: 'sent_whatsapp'
  },
  {
    id: 'dlg-init-2',
    timestamp: '3 дня назад',
    type: 'quiz',
    typeLabelRu: 'Подбор по бюджету (Квиз)',
    typeLabelKg: 'Бюджет боюнча тандоо (Квиз)',
    contactName: 'Айзада',
    phone: '+996 700 88-XX-XX',
    details: {
      rooms: '2-комнатная (65–88 м²)',
      district: 'мкр. Юго-Восток',
      paymentMethod: 'Беспроцентная рассрочка 0% до 36 мес.'
    },
    status: 'saved'
  }
];

const DialogHistoryContext = createContext<DialogHistoryContextType | undefined>(undefined);

export const DialogHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogs, setDialogs] = useState<ConsultationDialog[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, 2); // strictly keep last two dialogs
        }
      }
    } catch (e) {
      console.warn('Failed to read from localStorage', e);
    }
    return INITIAL_DEMO_DIALOGS.slice(0, 2);
  });

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dialogs.slice(0, 2)));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [dialogs]);

  const addDialog = (dialogData: Omit<ConsultationDialog, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}, ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;

    const newDialog: ConsultationDialog = {
      ...dialogData,
      id: 'dlg-' + Date.now(),
      timestamp: timeStr
    };

    setDialogs((prev) => {
      // Prepend newest dialog and strictly keep only the last TWO dialogs
      const updated = [newDialog, ...prev.filter((d) => d.id !== newDialog.id)].slice(0, 2);
      return updated;
    });

    // Provide pleasant feedback by opening history
    setIsHistoryOpen(true);
  };

  const removeDialog = (id: string) => {
    setDialogs((prev) => prev.filter((d) => d.id !== id));
  };

  const clearHistory = () => {
    setDialogs([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DialogHistoryContext.Provider
      value={{
        dialogs,
        addDialog,
        removeDialog,
        clearHistory,
        isHistoryOpen,
        openHistory: () => setIsHistoryOpen(true),
        closeHistory: () => setIsHistoryOpen(false)
      }}
    >
      {children}
    </DialogHistoryContext.Provider>
  );
};

export const useDialogHistory = () => {
  const context = useContext(DialogHistoryContext);
  if (!context) {
    throw new Error('useDialogHistory must be used within DialogHistoryProvider');
  }
  return context;
};
