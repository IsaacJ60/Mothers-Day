// src/store/useMotherStore.ts
import { create } from 'zustand'
import { MotherInfo } from '@/components/MotherInfoForm'

type MotherState = {
  info: MotherInfo | null
  setInfo: (data: MotherInfo) => void
}

export const useMotherStore = create<MotherState>((set) => ({
  info: null,
  setInfo: (data) => set({ info: data }),
}))
