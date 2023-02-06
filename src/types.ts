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

export interface Score {
  code: string;
  curriculum: string;
  name: string;
  class: string;
  credits: number;
  status: string;
  final_score: string;
  final_index: string;
}

export interface Student {
  npm: string;
  name: string;
  year: number;
  major: string;
  tutor: string;
  status: string;
  credits_passed: number;
  grade_points: number;
  gpa: number;
  credits_earned: number;
}

export interface TermData {
  subjects_taken: number;
  credits_taken: number;
  credits_passed: number;
  grade_point: number;
  grade_point_average: number;
  total_credits_taken: number;
  total_credits_passed: number;
  total_credits_earned: number;
  total_grade_point: number;
  total_grade_point_average: number;
  total_passed_grade_point_average: number;
}

export interface Term {
  period: string;
  term: string;
  data: TermData;
}

export interface SummaryData {
  student: Student;
  scores_overview: Map<string, number>;
  terms: Term[];
}
