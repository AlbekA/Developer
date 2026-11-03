import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DialogHistoryProvider } from './context/DialogHistoryContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustNumbers } from './components/TrustNumbers';
import { Catalog } from './components/Catalog';
import { Cases } from './components/Cases';
import { Leadership } from './components/Leadership';
import { HowWeWork } from './components/HowWeWork';
import { PurchaseOptions } from './components/PurchaseOptions';
import { Reviews } from './components/Reviews';
import { Documents } from './components/Documents';
import { Faq } from './components/Faq';
import { Quiz } from './components/Quiz';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { FloatingBar } from './components/FloatingBar';

import { LayoutModal } from './components/modals/LayoutModal';
import { TourModal } from './components/modals/TourModal';
import { DocumentModal } from './components/modals/DocumentModal';
import { DialogHistoryDrawer } from './components/modals/DialogHistoryDrawer';

import { ResidentialComplex, LegalDocument } from './types';

export default function App() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedComplexForLayouts, setSelectedComplexForLayouts] = useState<ResidentialComplex | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);

  const handleExploreCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <DialogHistoryProvider>
        <div className="min-h-screen bg-[#fafaf8] text-[#1c1d21] font-sans antialiased selection:bg-amber-400 selection:text-gray-950">
          {/* Main Top Navigation */}
          <Navbar onOpenTourModal={() => setIsTourModalOpen(true)} />

          <main>
            {/* Block 1: Hero */}
            <Hero
              onOpenTourModal={() => setIsTourModalOpen(true)}
              onExploreCatalog={handleExploreCatalog}
            />

            {/* Block 2: Trust Numbers */}
            <TrustNumbers />

            {/* Block 3: Catalog of complexes */}
            <Catalog
              onSelectComplexForLayouts={(complex) => setSelectedComplexForLayouts(complex)}
            />

            {/* Block 4: Cases (Already completed projects) */}
            <Cases />

            {/* Block 5: Leadership & Key team */}
            <Leadership />

            {/* Block 6: How We Work (5 steps) */}
            <HowWeWork onOpenTourModal={() => setIsTourModalOpen(true)} />

            {/* Block 7: Purchase & Financing options (Tariffs + Calculator) */}
            <PurchaseOptions />

            {/* Block 8: Reviews & Social Proof */}
            <Reviews />

            {/* Block 9: Documents, permits & Red Book */}
            <Documents
              onSelectDocument={(doc) => setSelectedDocument(doc)}
            />

            {/* Block 10: FAQ */}
            <Faq />

            {/* Block 11: Interactive Quiz / Lead Magnet */}
            <Quiz />

            {/* Block 12: Sales Office & Contacts in Osh */}
            <Contacts />
          </main>

          {/* Block 13: Footer */}
          <Footer />

          {/* Mobile Bottom Floating Action Bar */}
          <FloatingBar onOpenTourModal={() => setIsTourModalOpen(true)} />

          {/* Interactive Modals */}
          <LayoutModal
            complex={selectedComplexForLayouts}
            onClose={() => setSelectedComplexForLayouts(null)}
          />

          <TourModal
            isOpen={isTourModalOpen}
            onClose={() => setIsTourModalOpen(false)}
          />

          <DocumentModal
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />

          {/* Consultation & Dialog History Drawer (strictly keeps last 2 dialogs) */}
          <DialogHistoryDrawer />
        </div>
      </DialogHistoryProvider>
    </LanguageProvider>
  );
}
