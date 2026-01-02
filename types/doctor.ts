export type DoctorSpecialty = {
	id: number;
	name: string;
	description?: string;
};

export type Doctor = {
	id: number;
	first_name: string;
	last_name: string;
	title?: string;
	email?: string;
	phone_number?: string;
	photo?: string | null;
	specialties?: DoctorSpecialty[];
	created_at?: string;
	updated_at?: string;
};
