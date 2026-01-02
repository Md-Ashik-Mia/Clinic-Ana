'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';
import type { Review } from '../types/review';

const fetchReviews = async (): Promise<Review[]> => {
  const { data } = await axiosInstance.get('/reviews/rating/');
  return Array.isArray(data) ? (data as Review[]) : [];
};

export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
