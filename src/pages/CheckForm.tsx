import { useEffect } from "react";
import type { Check } from "../models/Check";
import { checkService } from "../services/checkService";
import { Button, Form, Input, DatePicker, Card } from "antd";
import dayjs from "dayjs";

interface Props {
  initialData?: Check;
  onSaved: () => void;
}

export default function CheckForm({ initialData, onSaved }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        personName: initialData.personName,
        amount: initialData.amount,
        dueDate: dayjs(initialData.dueDate),
        note: initialData.note,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = (values: any) => {
    const payload: Check = initialData
      ? {
          ...initialData,
          personName: values.personName,
          amount: values.amount,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          note: values.note,
        }
      : {
          id: crypto.randomUUID(),
          personName: values.personName,
          amount: values.amount,
          dueDate: values.dueDate.format("YYYY-MM-DD"),
          status: "pending",
          note: values.note,
          createdAt: new Date().toISOString(),
        };

    initialData ? checkService.update(payload) : checkService.create(payload);
    onSaved();
  };

  return (
    <Card bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Kişi"
          name="personName"
          rules={[{ required: true, message: "Kişi zorunlu" }]}
        >
          <Input placeholder="Örn: Ahmet Yılmaz" />
        </Form.Item>

        <Form.Item
          label="Tutar"
          name="amount"
          rules={[{ required: true, message: "Tutar zorunlu" }]}
        >
          <Input type="number" placeholder="₺" />
        </Form.Item>

        <Form.Item
          label="Vade Tarihi"
          name="dueDate"
          rules={[{ required: true, message: "Vade zorunlu" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Not" name="note">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {initialData ? "Güncelle" : "Kaydet"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
