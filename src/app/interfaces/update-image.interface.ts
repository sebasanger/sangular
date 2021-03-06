export interface UpdateImage {
  type: 'user' | 'customer' | null;
  id: number;
  file?: File;
}
