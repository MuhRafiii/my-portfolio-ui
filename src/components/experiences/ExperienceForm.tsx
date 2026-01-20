import { api } from "@/services/api";
import type { ExpProps, Month } from "@/types/experiences";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MONTH: Month[] = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

export function ExperienceForm({ mode, initialData, onSuccess }: ExpProps) {
  const [form, setForm] = useState({
    position: initialData?.position || "",
    company: initialData?.company || "",
    start_month: initialData?.start_month || ("JANUARY" as Month),
    start_year: initialData?.start_year || "",
    end_month: initialData?.end_month || "",
    end_year: initialData?.end_year || "",
    jobdesk: initialData?.jobdesk || [""],
    tech: initialData?.tech || [""],
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const updateArray = (
    key: "jobdesk" | "tech",
    index: number,
    value: string
  ) => {
    const updated = [...form[key]];
    updated[index] = value;
    setForm({ ...form, [key]: updated });
  };

  const addArrayItem = (key: "jobdesk" | "tech") => {
    setForm({ ...form, [key]: [...form[key], ""] });
  };

  const removeArrayItem = (key: "jobdesk" | "tech", index: number) => {
    setForm({
      ...form,
      [key]: form[key].filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([Key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(Key, v));
        } else if (value) {
          formData.append(Key, String(value));
        }
      });

      if (logo) {
        formData.append("logo", logo);
      }

      if (mode === "edit" && initialData) {
        await api.put(`/experiences/${initialData.id}`, formData);
      } else {
        await api.post("/experiences", formData);
      }

      await Swal.fire({
        icon: "success",
        title: "Saved successfully",
        timer: 1200,
        showConfirmButton: false,
      });

      onSuccess();
    } catch (error: any) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Something went wrong",
        timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-96 overflow-y-scroll space-y-4 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Position</Label>
          <Input
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label>Company</Label>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Jobdesk</Label>
        {form.jobdesk.map((j, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input
              value={j}
              onChange={(e) => updateArray("jobdesk", i, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeArrayItem("jobdesk", i)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("jobdesk")}
        >
          + Add Jobdesk
        </Button>
      </div>

      <div className="space-y-1">
        <Label>Tech Stack</Label>
        {form.tech.map((t, i) => (
          <div className="flex gap-2 mt-2">
            <Input
              value={t}
              onChange={(e) => updateArray("tech", i, e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeArrayItem("tech", i)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("tech")}
        >
          + Add Tech
        </Button>
      </div>

      <div className="space-y-1">
        <Label>Start Month</Label>
        <Select
          value={form.start_month}
          onValueChange={(value) =>
            setForm({ ...form, start_month: value as Month })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {MONTH.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Start Year</Label>
        <Input
          type="number"
          value={form.start_year}
          onChange={(e) => setForm({ ...form, start_year: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label>End Month</Label>
        <Select
          value={form.end_month}
          onValueChange={(value) =>
            setForm({ ...form, end_month: value as Month })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              <SelectItem value="present">PRESENT</SelectItem>
              {MONTH.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className={`${form.end_month === "present" && "text-gray-300"}`}>
          End Year
        </Label>
        <Input
          type="number"
          value={form.end_year}
          onChange={(e) => setForm({ ...form, end_year: e.target.value })}
          disabled={form.end_month === "present"}
        />
      </div>

      <div className="space-y-1">
        <Label>Logo</Label>
        <Input
          type="file"
          onChange={(e) => setLogo(e.target.files?.[0] || null)}
        />
        {logo && (
          <img
            src={URL.createObjectURL(logo)}
            alt={form.company}
            className="w-24 h-24 rounded"
          />
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Experience"}
      </Button>
    </div>
  );
}
