export type DoctorSpecialty = {
  id: number;
  name: string;
  name_es?: string;
  description?: string;
  description_es?: string;
};

export type Doctor = {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  title_es?: string;
  email?: string;
  phone_number?: string;
  photo?: string | null;
  specialties?: DoctorSpecialty[];
  created_at?: string;
  updated_at?: string;
};
