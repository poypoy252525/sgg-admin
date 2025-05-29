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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

interface Props {
  courseId: number;
}

const AddCompetencyDialog = ({ courseId }: Props) => {
  return (
    <Dialog>
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
        <CompetencyForm courseId={courseId} />
        <DialogFooter>
          <Button size="sm" form="competency-form" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CompetencyForm = ({ courseId }: Props) => {
  const form = useForm<ZodCompetency>({
    resolver: zodResolver(competencySchema),
    defaultValues: {
      courseId,
    },
  });

  return (
    <Form {...form}>
      <form
        id="competency-form"
        className="space-y-4"
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
          try {
            await window.electron.createCompetency(data);
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
