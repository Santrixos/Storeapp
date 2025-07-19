import { useQuery } from "@tanstack/react-query";
import type { App } from "@shared/schema";

export function useAllApps() {
  return useQuery<App[]>({
    queryKey: ["/api/apps"],
  });
}

export function useFeaturedApps() {
  return useQuery<App[]>({
    queryKey: ["/api/apps/featured"],
  });
}

export function useAppsByCategory(category: string) {
  return useQuery<App[]>({
    queryKey: [`/api/apps/category/${category}`],
    enabled: !!category,
  });
}

export function useSearchApps(query: string) {
  return useQuery<App[]>({
    queryKey: [`/api/apps/search?q=${encodeURIComponent(query)}`],
    enabled: !!query.trim(),
  });
}

export function useAppById(id: number) {
  return useQuery<App>({
    queryKey: [`/api/apps/${id}`],
    enabled: !!id,
  });
}
