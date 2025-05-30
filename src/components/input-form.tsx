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
  type?: "string" | "number";
}

const InputForm = <T extends FieldValues>({
  form,
  name,
  label,
  description,
  type = "string",
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              {...field}
              value={field.value || ""}
              onChange={(e) => {
                if (type === "string") {
                  field.onChange(e);
                  return;
                }
                const value = e.target.value;
                if (!isNaN(parseInt(value)) || !value) {
                  console.log(value);
                  field.onChange(value || undefined);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
