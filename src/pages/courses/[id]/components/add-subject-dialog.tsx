import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ALSSubjectType, subjectSchema, ZodSubject } from "@/schemas/subject";
import { useSubjectStore } from "@/stores/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  courseId: number;
}

const AddSubjectDialog = ({ courseId }: Props) => {
  const [open, setOpen] = useState(false);

  const refreshSubjects = useSubjectStore((state) => state.refresh);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add subject</DialogTitle>
          <DialogDescription>Fill up the information</DialogDescription>
        </DialogHeader>
        <div>
          <SubjectForm
            courseId={courseId}
            onSuccess={() => {
              setOpen(false);
              refreshSubjects();
            }}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-subject-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SubjectForm = ({
  courseId,
  onSuccess,
}: {
  courseId: number;
  onSuccess?: () => void;
}) => {
  const form = useForm<ZodSubject>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      courseId,
    },
  });

  const handleSubmit = async (subject: ZodSubject) => {
    try {
      await window.electron.createSubject(subject);
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        id="add-subject-form"
        className="flex flex-col space-y-6"
      >
        <InputForm form={form} label="Name" name="name" />
        <SelectForm
          form={form}
          items={Object.values(ALSSubjectType).map((item) => ({
            label: item.replace("_", " "),
            value: item,
          }))}
          label="Type"
          name="type"
        />
      </form>
    </Form>
  );
};

export default AddSubjectDialog;
