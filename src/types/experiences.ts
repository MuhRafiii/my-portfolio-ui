export type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER";

export interface Experience {
  id: number;
  position: string;
  company: string;
  jobdesk: string[];
  tech: string[];
  logo: string;
  start_month: Month;
  start_year: number;
  end_month?: Month | null;
  end_year?: number | null;
}

export interface ExpProps {
  mode: "create" | "edit";
  initialData?: Experience;
  onSuccess: () => void;
}

export interface EditExpProps {
  open: boolean;
  onClose: () => void;
  experience: Experience;
  onSuccess: () => void;
}

export interface CreateExpProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
