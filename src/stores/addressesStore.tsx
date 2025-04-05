/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddress } from "@/types/getAddressTypes";
import { create } from "zustand";

interface IAddressesStore {
  storeAddresses: IAddress[];
  setStoreAddresses: (entity: IAddress[]) => void;
}

export const useAddressesStore = create<IAddressesStore>((set) => ({
  storeAddresses: [],

  setStoreAddresses: (entity) => set(() => ({ storeAddresses: entity })),
}));
