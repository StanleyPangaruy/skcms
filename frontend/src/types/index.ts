import type { ReactNode } from "react";

export interface Member {
  about?: string;
  committee?: string;
  photo: string;
  id?: number;
  name: string;
  position: string;
  photo_url: string;
}

export interface Project {
  status: ReactNode;
  budget: ReactNode;
  id?: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image_url: string;
}

export interface Report {
  file_size: unknown;
  id?: number;
  title: string;
  file_path: string;
  uploaded_at: string;
}
