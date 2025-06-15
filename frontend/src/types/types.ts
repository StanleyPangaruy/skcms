export interface Member {
  id: number;
  name: string;
  position: string;
  photo?: string;
  photoFile?: File;
  photoPreview?: string;
}