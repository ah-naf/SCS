"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const INPUTS = [
  { name: "name", label: "University Name", placeholder: "Name" },
  {
    name: "web_address",
    label: "Web Address",
    placeholder: "http://example.com",
  },
  { name: "country", label: "Country", placeholder: "USA" },
  { name: "state", label: "State", placeholder: "New York" },
  { name: "status", label: "Status" },
  { name: "statement", label: "Statement", placeholder: "statement" },
  
];

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Must be 2 or more character long" }),
  web_address: z.string({ required_error: "Url is required" }).url({
    message: "Invalid url",
  }),
  country: z.string({ required_error: "Country is required" }),
  state: z.string({ required_error: "State is required" }),
  statement: z
    .string({ required_error: "Statement is required" })
    .min(2, { message: "Must be 2 or more character long" }),
  status: z.string({ required_error: "State is required" }),
});

function UniversityForm({ onDialogOpenChange }) {
  const form = useForm({ resolver: zodResolver(formSchema) });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="mb-1.5 mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-8">
          {INPUTS.slice(0, 2).map((input, ind) => (
            <FormField
              control={form.control}
              name={input.name}
              key={ind}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label ?? "Label"}</FormLabel>
                  {renderFormControl(field, input.name, input.placeholder)}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <FormItem>
            <FormLabel>Logo</FormLabel>
            <Input type="file" />
          </FormItem>
          {INPUTS.slice(2, INPUTS.length).map((input, ind) => (
            <FormField
              control={form.control}
              name={input.name}
              key={ind}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label ?? "Label"}</FormLabel>
                  {renderFormControl(field, input.name, input.placeholder)}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="w-full col-span-2 flex items-center justify-end gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" size="lg">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function renderFormControl(field, name, placeholder = "") {
  switch (name) {
    case "name":
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );

    case "web_address":
      return (
        <FormControl>
          <Input placeholder={placeholder} type="url" {...field} />
        </FormControl>
      );

    case "country":
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );
    case "state":
      return (
        <FormControl>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      );

    case "statement":
      return (
        <FormControl>
          <Textarea placeholder={placeholder} {...field} />
        </FormControl>
      );

    case "status":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      );
  }
}

export default UniversityForm;
