import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
}

const InputForm = <T extends FieldValues>({
  form,
  name,
  label,
  description,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={label} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
