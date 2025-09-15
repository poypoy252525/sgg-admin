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
import { competencySchema, ZodCompetency } from "@/schemas/competency";
import { useCompetencyStore } from "@/stores/competency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  courseId: number;
}

const AddCompetencyDialog = ({ courseId }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="w-full">
          <Plus />
          Add Competency
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Competency Details</DialogTitle>
          <DialogDescription>Fill up the form</DialogDescription>
        </DialogHeader>
        <CompetencyForm courseId={courseId} onSuccess={() => setOpen(false)} />
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" form="competency-form" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CompetencyForm = ({
  courseId,
  onSuccess,
}: {
  courseId: number;
  onSuccess?: () => void;
}) => {
  const form = useForm<ZodCompetency>({
    resolver: zodResolver(competencySchema),
    defaultValues: {
      courseId,
    },
  });

  const refresh = useCompetencyStore((state) => state.refresh);

  return (
    <Form {...form}>
      <form
        id="competency-form"
        className="space-y-4"
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
          try {
            await window.electron.createCompetency(data);
            refresh();
            onSuccess?.();
          } catch (error) {
            console.error(error);
          }
        })}
      >
        <InputForm form={form} label="Competency Name" name="name" />
        <InputForm
          form={form}
          label="Duration"
          name="duration"
          type="number"
          description="Value of duration in hour"
        />
        <SelectForm
          form={form}
          items={["BASIC", "COMMON", "CORE"].map((item) => ({
            label: item.toLowerCase(),
            value: item,
          }))}
          label="Type"
          name="type"
        />
      </form>
    </Form>
  );
};

export default AddCompetencyDialog;
