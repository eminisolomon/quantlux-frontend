import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000/api/v1" });

export const useSystemStatus = (enabled = true) => {
  return useQuery({
    queryKey: ["systemStatus"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/status");
      return data;
    },
    refetchInterval: enabled ? 5000 : false,
  });
};

export const usePerformanceMetrics = (enabled = true) => {
  return useQuery({
    queryKey: ["performanceMetrics"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard/performance");
      return data;
    },
    refetchInterval: enabled ? 5000 : false,
  });
};
