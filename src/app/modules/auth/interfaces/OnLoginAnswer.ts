export interface OnLoginAnswer {
  error: boolean;
  message: string;
  id?: string;
  token?: string;
}

export interface RegisterInfo {
  email: string;
  password: string;
  nickname: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender_orientation: string;
  city: string;
  country: string;
  date_of_birth_day: number;
  date_of_birth_month: number;
  date_of_birth_year: number;
}
