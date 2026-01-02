export type ClinicInfo = {
  id: number;
  location: string;
  location_es?: string | null;
  location_link?: string | null;
  phone_numbers?: string[];
  whatsapp_numbers?: string | null;
  emails?: string[];
  facebook_link?: string | null;
  twitter_link?: string | null;
  instagram_link?: string | null;
  linkedin_link?: string | null;
  created_at?: string;
};
