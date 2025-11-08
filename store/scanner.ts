import { create } from "zustand";

export type AnswerMap = Record<string, string>;

type ScannerState = {
  answers: AnswerMap;
  setAnswer: (questionId: string, trait: string) => void;
  reset: () => void;
};

export const useScannerStore = create<ScannerState>((set) => ({
  answers: {},
  setAnswer: (questionId, trait) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: trait
      }
    })),
  reset: () =>
    set({
      answers: {}
    })
}));
