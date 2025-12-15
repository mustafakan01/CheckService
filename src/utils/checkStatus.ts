import type { Check, CheckStatus } from "../models/Check";
import { isToday } from "./date";

export const calculateStatus = (
  check: Check
): CheckStatus => {
  if (check.status === "paid") return "paid";
  if (isToday(check.dueDate)) return "overdue";
  return "pending";
};
