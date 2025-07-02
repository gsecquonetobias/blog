import { create } from 'zustand'

export const usePostStore = create((set) => ({
  open: false,
  postId: undefined,
  Create: () => set((state) => ({ open: true, postId: undefined })),
  Close: () => set((state) => ({ open: false, postId: undefined })),
  Edit: (postId) => set({ open: true, postId }),
}))