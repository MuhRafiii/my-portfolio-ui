import type { CreateExpProps } from "@/types/experiences";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ExperienceForm } from "./ExperienceForm";

export function CreateExperienceModal({
  open,
  onClose,
  onSuccess,
}: CreateExpProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Experience</DialogTitle>
        </DialogHeader>

        <ExperienceForm
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
