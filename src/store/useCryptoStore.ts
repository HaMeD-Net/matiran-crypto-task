import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ICoin {
  label: string;
  value: string;
}

interface IAlert {
  open: boolean;
  message: string;
}

interface ICoinStore {
  selectedCoinStore: ICoin | null;
  setSelectedCoinStore: (coin: ICoin) => void;

  alert: IAlert;
  setAlert: (data: IAlert) => void;
}

export const useCryptoStore = create<ICoinStore>()(
  persist(
    (set) => ({
      selectedCoinStore: null,
      setSelectedCoinStore: (coin) => set({ selectedCoinStore: coin }),

      alert: { open: false, message: "!خطا در دریافت اطلاعات" },
      setAlert: (data) => set({ alert: data }),
    }),
    {
      name: "selected-coin",
      partialize: (state) => ({
        selectedCoinStore: state.selectedCoinStore,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
