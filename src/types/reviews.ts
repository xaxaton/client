export interface Review {
  id: number;
  text: string;
  image: string | null;
  video: string | null;
  date: string;
}

export interface CreateReviewData {
  text: string;
  video?: string;
  image?: string;
}
