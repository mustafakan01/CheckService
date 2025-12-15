import { Tag } from "antd";
import type { CheckStatus } from "../models/Check";

export function CheckStatusTag({ status }: { status: CheckStatus }) {
  if (status === "paid") return <Tag color="green">Ödendi</Tag>;
  if (status === "overdue") return <Tag color="red">Gecikti</Tag>;
  return <Tag color="blue">Beklemede</Tag>;
}
