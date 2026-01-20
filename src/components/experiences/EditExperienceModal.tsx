import type { EditExpProps } from "@/types/experiences";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ExperienceForm } from "./ExperienceForm";

export function EditExperienceModal({
  open,
  onClose,
  experience,
  onSuccess,
}: EditExpProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>

        <ExperienceForm
          mode="edit"
          initialData={experience!}
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
