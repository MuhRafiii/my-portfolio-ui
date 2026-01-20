import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { EditProjectModal } from "@/components/projects/EditProjectModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/services/api";
import type { Project } from "@/types/projects";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects);
    } catch (error: any) {
      console.error(error);
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Delete project?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error: any) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Failed",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        {loading && <p>Loading...</p>}
        <Button onClick={() => setOpenCreate(true)}>+ Add Project</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="flex flex-col justify-between">
            <CardContent className="space-y-3 text-sm">
              <img src={p.image} alt={p.name} className="w-full h-48" />

              <h1 className="text-lg font-bold">{p.name}</h1>
              <p className="text-justify">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t, i) => (
                  <Badge key={i} variant="secondary" className="px-3">
                    {t}
                  </Badge>
                ))}
              </div>
              <p>
                <span className="font-semibold">Repository: </span>
                <a href={p.github} className="hover:text-blue-700 underline">
                  {p.github}
                </a>
              </p>
              <p>
                <span className="font-semibold">Demo: </span>
                {p.demo ? (
                  <a href={p.demo} className="hover:text-blue-700 underline">
                    {p.demo}
                  </a>
                ) : (
                  "Unavailable"
                )}
              </p>
            </CardContent>
            <CardFooter>
              <div className="w-full flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelected(p);
                    setOpenEdit(true);
                  }}
                  className="w-1/2"
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                  className="w-1/2"
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateProjectModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={fetchProjects}
      />

      {selected && (
        <EditProjectModal
          open={openEdit}
          project={selected}
          onClose={() => setOpenEdit(false)}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
