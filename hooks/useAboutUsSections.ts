'use client';

import axiosInstance from '@/lib/axiosInstance';
import type { AboutUsSection } from '@/types/aboutUs';
import { useQuery } from '@tanstack/react-query';

async function fetchAboutUsSections(): Promise<AboutUsSection[]> {
  const { data } = await axiosInstance.get('/clinic/about/us/');
  return Array.isArray(data) ? (data as AboutUsSection[]) : [];
}

export function useAboutUsSections() {
  return useQuery({
    queryKey: ['about-us-sections'],
    queryFn: fetchAboutUsSections,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
