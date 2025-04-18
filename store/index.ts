import { create } from 'zustand';

interface CommentStore {
  openComments: boolean;
  toggleComments: () => void;
  open: () => void;
  close: () => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  openComments: false,
  toggleComments: () => set((state) => ({ openComments: !state.openComments })),
  open: () => set({ openComments: true }),
  close: () => set({ openComments: false }),
}));
