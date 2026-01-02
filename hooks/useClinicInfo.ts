'use client';

import axiosInstance from '@/lib/axiosInstance';
import type { ClinicInfo } from '@/types/clinicInfo';
import { useQuery } from '@tanstack/react-query';

const fetchClinicInfo = async (): Promise<ClinicInfo> => {
  const { data } = await axiosInstance.get('/clinic/clinic_info/');
  return data as ClinicInfo;
};

function toWhatsAppPhone(value: string): string {
  // WhatsApp wa.me expects digits only with country code.
  // Examples: +880123456789 -> 880123456789
  const trimmed = value.trim();
  if (!trimmed) return '';

  // Convert leading 00 to +
  const normalized = trimmed.startsWith('00') ? `+${trimmed.slice(2)}` : trimmed;

  // Keep digits only
  const digits = normalized.replace(/\D/g, '');
  return digits;
}

export function getWhatsAppHref(whatsAppNumber?: string | null): string | null {
  if (!whatsAppNumber) return null;
  const phone = toWhatsAppPhone(whatsAppNumber);
  if (!phone) return null;
  return `https://wa.me/${phone}`;
}

export function getTelHref(phone?: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\s+/g, '');
  return `tel:${digits}`;
}

export function getMailtoHref(email?: string | null): string | null {
  if (!email) return null;
  return `mailto:${email}`;
}

export const useClinicInfo = () => {
  return useQuery({
    queryKey: ['clinicInfo'],
    queryFn: fetchClinicInfo,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
