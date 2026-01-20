import type { EditProjectProps } from "@/types/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ProjectForm } from "./ProjectForm";

export function EditProjectModal({
  open,
  onClose,
  project,
  onSuccess,
}: EditProjectProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <ProjectForm
          mode="edit"
          initialData={project}
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
