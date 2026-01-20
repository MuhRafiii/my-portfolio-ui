import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import type { Tech } from "@/types/techs";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Techs() {
  const [techs, setTechs] = useState<Tech[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setIcon(null);
    setEditingId(null);
  };

  const fetchTechs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/techs");
      setTechs(res.data.techs);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to load techs",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || (!icon && editingId === null)) {
      return Swal.fire("Error", "Name & icon are required", "error");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      if (icon) formData.append("icon", icon);

      if (editingId) {
        await api.put(`/techs/${editingId}`, formData);
        Swal.fire("Success", "Tech updated", "success");
      } else {
        await api.post("/techs", formData);
        Swal.fire("Success", "Tech Created", "success");
      }

      resetForm();
      fetchTechs();
    } catch (error: any) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tech: Tech) => {
    setEditingId(tech.id);
    setName(tech.name);
    setIcon(null);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Delete tech?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/techs/${id}`);
      setTechs((prev) => prev.filter((t) => t.id !== id));
      Swal.fire("Deleted!", "Tech removed", "success");
    } catch (error: any) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Techs</h1>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            <Input
              placeholder="Tech name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files?.[0] || null)}
            />

            <div className="flex gap-2">
              <Button disabled={loading} className="flex-1">
                {editingId ? "Update" : "Add"}
              </Button>

              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {techs.map((tech) => (
          <Card key={tech.id} className="relative">
            <CardContent className="flex flex-col items-center p-4 gap-3">
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-12 h-12 object-contain"
              />
              <p className="font-medium">{tech.name}</p>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(tech)}
                >
                  <Pencil size={16} />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(tech.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
