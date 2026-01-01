// hooks/useWorkingHours.js

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axiosInstance';

// Function to fetch working hours from the API
const fetchWorkingHours = async () => {
  const { data } = await axiosInstance.get('/clinic/open_hours/');
  return data;
};

// Custom hook to use working hours data
export const useWorkingHours = () => {
  return useQuery({
    queryKey: ['workingHours'],
    queryFn: fetchWorkingHours,
    staleTime: 5 * 60 * 1000,  // Cache the data for 5 minutes
    refetchOnWindowFocus: false,  // Don't refetch on window focus
  });
};
