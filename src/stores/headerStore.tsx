/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetData, IProduct } from '@/types/getDataTypes'
import { create } from 'zustand'

interface IHeaderStore{
    isCart: boolean
    appData: IGetData
    setAppData: (entity:IGetData)=> void
    isMenu: boolean
    isMapOpened: boolean
    modalProd: IProduct
    setModalProd: (entity:IProduct)=> void
    toggleMenu: VoidFunction
    isModalProd: boolean
    toggleModalProd: (entity:boolean)=> void
    toggleMapOpened: (entity:boolean)=> void
    isMobMenu: boolean
    isReg: boolean
    toggleReg: (entity:boolean)=> void
    toggleMobMenu: VoidFunction
    toggleCart: (entity:boolean)=> void
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  isCart: false,
  isMapOpened: false,
  appData: [],
  isMenu: false,
  modalProd: {},
  isReg: false,
  isModalProd: false,
  isMobMenu: false,
  setAppData: (entity)=> set(() => ({ appData: entity})),
  toggleReg: (entity)=> set(() => ({ isReg: entity})),
  setModalProd: (entity)=> set(() => ({ modalProd: entity})),
  toggleMenu: () => set((state) => ({ isMenu: !state.isMenu })),
  toggleMobMenu: () => set((state) => ({ isMobMenu: !state.isMobMenu })),
  toggleCart: (entity) => set(() => ({ isCart: entity })),
  toggleMapOpened: (entity) => set(() => ({ isMapOpened: entity })),
  toggleModalProd: () => set((state) => ({ isModalProd: !state.isModalProd })),
}))
