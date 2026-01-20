export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string | null;
  image: string;
}

export interface ProjectProps {
  mode: "create" | "edit";
  initialData?: Project;
  onSuccess: () => void;
}

export interface EditProjectProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  onSuccess: () => void;
}

export interface CreateProjectProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
