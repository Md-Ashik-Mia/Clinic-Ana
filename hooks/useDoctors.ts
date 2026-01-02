'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';
import type { Doctor } from '../types/doctor';

const fetchDoctors = async (): Promise<Doctor[]> => {
	const { data } = await axiosInstance.get('/clinic/doctors/');
	return Array.isArray(data) ? (data as Doctor[]) : [];
};

export function useDoctors() {
	return useQuery({
		queryKey: ['doctors'],
		queryFn: fetchDoctors,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
}
