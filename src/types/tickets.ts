export interface Ticket {
  id: number;
  text: string;
  full_name: string;
  answer: {
    id: number;
    text: string;
  } | null;
}
