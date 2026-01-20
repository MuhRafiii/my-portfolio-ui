import { CreateExperienceModal } from "@/components/experiences/CreateExperienceModal";
import { EditExperienceModal } from "@/components/experiences/EditExperienceModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/services/api";
import type { Experience } from "@/types/experiences";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await api.get("/experiences");
      setExperiences(res.data.experiences);
    } catch (error: any) {
      console.error(error);
      Swal.fire(
        "Error",
        error?.response?.data?.messsage || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Delete experience?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(`/experiences/${id}`);
      setExperiences((prev) => prev.filter((e) => e.id !== id));

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
        <h1 className="text-xl font-semibold">Experiences</h1>
        {loading && <p>Loading...</p>}
        <Button onClick={() => setOpenCreate(true)}>+ Add Experience</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {experiences.map((e) => (
          <Card key={e.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                <img
                  src={e.logo}
                  alt={e.company}
                  className="w-10 h-10 rounded"
                />
                {e.position} - {e.company}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                {e.start_month} {e.start_year} -{" "}
                {e.end_month ? `${e.end_month} ${e.end_year}` : "Present"}
              </p>

              <ul className="list-disc ml-5 text-justify">
                {e.jobdesk.map((j, i) => (
                  <li key={i}>{j}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {e.tech.map((t, i) => (
                  <Badge key={i} variant="secondary" className="px-3">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelected(e);
                    setOpenEdit(true);
                  }}
                  className="w-1/2"
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(e.id)}
                  className="w-1/2"
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CreateExperienceModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={fetchExperiences}
      />

      {selected && (
        <EditExperienceModal
          open={openEdit}
          experience={selected}
          onClose={() => setOpenEdit(false)}
          onSuccess={fetchExperiences}
        />
      )}
    </div>
  );
}
