export type CheckStatus = "pending" | "paid" | "overdue" | "today";

export interface Check {
  id: string;
  personName: string;
  amount: number;
  dueDate: string; // ISO string
  status: CheckStatus;
  note?: string;
  createdAt: string;
}
