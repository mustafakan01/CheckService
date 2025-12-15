import { useEffect, useState } from "react";
import type { Check } from "../models/Check";
import { checkService } from "../services/checkService";
import { CheckStatusTag } from "../components/CheckStatusTag";
import { calculateStatus } from "../utils/checkStatus";
import {  isToday } from "../utils/date";
 import { Card, Button, Space, Tag, List , Segmented} from "antd";
import CheckForm from "./CheckForm";

type Filter = "all" | "pending" | "overdue" | "paid" | "today";

export default function CheckList() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [editingCheck, setEditingCheck] = useState<Check | null>(null);

const filteredChecks = checks.filter((c) => {
  if (filter === "all") return true;
  if (filter === "today") return isToday(c.dueDate); // Today filtresi eklendi
  return c.status === filter;
});


  const loadData = () => {
    const data = checkService.getAll().map((c) => ({
      ...c,
      status: calculateStatus(c),
    }));
    setChecks(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const togglePaid = (check: Check) => {
    const updated: Check = {
      ...check,
      status: check.status === "paid" ? "pending" : "paid",
    };

    checkService.update(updated);
    loadData();
  };

  const deleteCheck = (id: string) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    checkService.remove(id);
    loadData();
  };

  return (
    <>
    <CheckForm
  initialData={editingCheck || undefined}
  onSaved={() => {
    setEditingCheck(null);
    loadData();
  }}
/>

<Segmented
  value={filter}
  onChange={(val) => setFilter(val as Filter)}
  options={[
    { label: "Hepsi", value: "all" },
    { label: "Bugün", value: "today" },
    { label: "Beklemede", value: "pending" },
    { label: "Geciken", value: "overdue" },
    { label: "Ödendi", value: "paid" },
  ]}
  style={{ marginBottom: 24 }}
/>
<List
  dataSource={filteredChecks}
  renderItem={(c) => (
    <Card
      key={c.id}
      style={{ marginBottom: 16 }}
      hoverable
    >
      <Space
        style={{ width: "100%", justifyContent: "space-between" }}
        align="start"
      >



        <div>
          <h3 style={{ marginBottom: 4 }}>{c.personName}</h3>
          <div style={{ color: "#888" }}>
            Vade: {c.dueDate}
            {isToday(c.dueDate) && c.status === "pending" && (
              <Tag color="orange" style={{ marginLeft: 8 }}>
                Vade Yaklaşıyor
              </Tag>
            )}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {c.amount}₺
          </div>

          <CheckStatusTag status={c.status} />

          <Space style={{ marginTop: 8 }}>
            <Button
              size="small"
              type={c.status === "paid" ? "default" : "primary"}
              onClick={() => togglePaid(c)}
            >
              {c.status === "paid" ? "Geri Al" : "Ödendi"}
            </Button>

            <Button size="small" onClick={() => setEditingCheck(c)}>
              Düzenle
            </Button>

            <Button
              size="small"
              danger
              onClick={() => deleteCheck(c.id)}
            >
              Sil
            </Button>
          </Space>
        </div>
      </Space>
    </Card>
  )}
/>
     
    </>
  );
}
