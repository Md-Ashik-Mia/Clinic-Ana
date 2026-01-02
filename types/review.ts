export type Review = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  rating?: number | null;
  comment?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  user?: number | null;
};
