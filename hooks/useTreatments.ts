'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';
import type { Treatment } from '../types/treatment';

const fetchTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/clinic/treatments/');
  return Array.isArray(data) ? (data as Treatment[]) : [];
};

export function useTreatments() {
  return useQuery({
    queryKey: ['treatments'],
    queryFn: fetchTreatments,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
