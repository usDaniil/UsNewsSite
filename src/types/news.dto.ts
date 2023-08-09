export interface INews {
  id: number;
  header: string;
  userId: number;
  imagePath?: string;
  text: string;
  createAt: Date;
  updateAt: Date;
}
