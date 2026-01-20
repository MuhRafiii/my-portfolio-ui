import { api } from "@/services/api";
import type { ProjectProps } from "@/types/projects";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function ProjectForm({ mode, initialData, onSuccess }: ProjectProps) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    tech: initialData?.tech || [""],
    github: initialData?.github || "",
    demo: initialData?.demo || "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const updateTech = (index: number, value: string) => {
    const tech = [...form["tech"]];
    tech[index] = value;
    setForm({ ...form, ["tech"]: tech });
  };

  const addTechItem = () => {
    setForm({ ...form, ["tech"]: [...form["tech"], ""] });
  };

  const removeTechItem = (index: number) => {
    setForm({ ...form, ["tech"]: form["tech"].filter((_, i) => i !== index) });
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

      if (image) {
        formData.append("image", image);
      }

      if (mode === "edit" && initialData) {
        await api.put(`/projects/${initialData.id}`, formData);
      } else {
        await api.post("/projects", formData);
      }

      await Swal.fire({
        icon: "success",
        title: "Saved Successfully",
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
      <div className="space-y-1">
        <Label>Project Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <Label>Tech</Label>
        {form.tech.map((t, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <Input value={t} onChange={(e) => updateTech(i, e.target.value)} />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeTechItem(i)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addTechItem()}
        >
          + Add Tech
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Github URL</Label>
          <Input
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <Label>Demo Link</Label>
          <Input
            value={form.demo}
            onChange={(e) => setForm({ ...form, demo: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Image</Label>
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={form.name}
            className="h-24 rounded"
          />
        )}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Project"}
      </Button>
    </div>
  );
}
