import { IAddress } from "@/types/getAddressTypes";
import { create } from "zustand";


interface ICheckoutStore {
  name: string;
  setName: (name: string) => void;
  comment: string;
  setComment: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  isModal: boolean;
  setModal: (isModal: boolean) => void;
  modalAddress?: IAddress;
  setModalAddress: (address: IAddress | undefined) => void;
  checkedVal?: IAddress;
  setCheckedVal: (address: IAddress | undefined) => void;
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  addresses: IAddress[];
  setAddresses: (addresses: IAddress[]) => void;
  user: {
    client?: { id?: number, full_name?: string  };
    phones?: { number?: string };
  };
  setUser: (user: { client?: { id?: number }; phones?: { number?: string } }) => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set) => ({
  name: "",
  setName: (name) => set({ name }),

  comment: "",
  setComment: (comment) => set({ comment }),

  phoneNumber: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

  isModal: false,
  setModal: (isModal) => set({ isModal }),

  modalAddress: undefined,
  setModalAddress: (address) => set({ modalAddress: address }),

  checkedVal: undefined,
  setCheckedVal: (address) => set({ checkedVal: address }),

  selectedPayment: "",
  setSelectedPayment: (payment) => set({ selectedPayment: payment }),

  addresses: [],
  setAddresses: (addresses) => set({ addresses }),

  user: {},
  setUser: (user) => set({ user }),

}));
