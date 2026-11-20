"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { TourDate } from "@/types/podcast";
import { TOUR_DATES } from "@/lib/data";

interface TicketContextType {
  isTicketModalOpen: boolean;
  selectedTour: TourDate;
  openTicketModal: (tour?: TourDate) => void;
  closeTicketModal: () => void;
  selectTour: (tour: TourDate) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: React.ReactNode }) {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourDate>(TOUR_DATES[0]);

  const openTicketModal = useCallback((tour?: TourDate) => {
    if (tour) {
      setSelectedTour(tour);
    }
    setIsTicketModalOpen(true);
  }, []);

  const closeTicketModal = useCallback(() => {
    setIsTicketModalOpen(false);
  }, []);

  const selectTour = useCallback((tour: TourDate) => {
    setSelectedTour(tour);
  }, []);

  return (
    <TicketContext.Provider
      value={{
        isTicketModalOpen,
        selectedTour,
        openTicketModal,
        closeTicketModal,
        selectTour,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
}
