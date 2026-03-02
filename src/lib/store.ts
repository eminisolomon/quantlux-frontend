import { create } from "zustand";

interface DashboardState {
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  autoRefresh: true,
  toggleAutoRefresh: () =>
    set((state) => ({ autoRefresh: !state.autoRefresh })),
}));
