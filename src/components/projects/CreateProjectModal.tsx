import type { CreateProjectProps } from "@/types/projects";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ProjectForm } from "./ProjectForm";

export function CreateProjectModal({
  open,
  onClose,
  onSuccess,
}: CreateProjectProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <ProjectForm
          mode="create"
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
