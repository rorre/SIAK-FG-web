export interface ServerResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface UserInfo {
  name: string;
  role: string;
  group: string;
}

export interface CookieData {
  siakng_cc: string;
  mojavi: string;
}
