"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { types } from "@/common/const/types";
import { suitabilities } from "@/common/const/suitabilities";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  types: z.string().default(""),
  suitability: z.string().default(""),
  drops: z.string().default(""),
  key: z.string().default(""),
  term: z.string().default(""),
});

type PaldeckSearchFormProps = {
  defaultValues?: z.infer<typeof formSchema>;
};

export function PaldeckSearchForm({ defaultValues }: PaldeckSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const uri = new URLSearchParams(
      Object.entries({
        types: values.types,
        suitability: values.suitability,
        drops: values.drops,
        key: values.key,
        term: values.term,
      }).filter(([_, value]) => value !== "")
    );
    console.log(uri.toString());
    console.log(pathname);

    router.push(`${pathname}?${uri.toString()}`, {
      scroll: false,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full items-stretch py-6"
      >
        <div className="flex items-center gap-6 flex-wrap">
          <FormField
            control={form.control}
            name="types"
            render={({ field }) => (
              <FormItem className=" flex-1 min-w-[16rem] max-w-full">
                <FormLabel>Types</FormLabel>
                <div className="flex items-center gap-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {field.value ? (
                          <SelectValue placeholder="Select a type" />
                        ) : (
                          "Select a type"
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex gap-4 items-center flex-nowrap">
                            <Image
                              src={`${process.env.API_URL}${type.iconUrl}`}
                              alt={type.label}
                              className="w-4 h-4"
                              width={16}
                              height={16}
                            />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      form.resetField("types");
                    }}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="suitability"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[16rem] max-w-full">
                <FormLabel>Suitability</FormLabel>
                <div className="flex items-center gap-2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {field.value ? (
                          <SelectValue placeholder="Select a suitability" />
                        ) : (
                          "Select a suitability"
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suitabilities.map((suitability) => (
                        <SelectItem
                          key={suitability.value}
                          value={suitability.value}
                        >
                          <div className="flex gap-4 items-center flex-nowrap">
                            <Image
                              src={`${process.env.API_URL}${suitability.iconUrl}`}
                              alt={suitability.label}
                              className="w-4 h-4"
                              width={16}
                              height={16}
                            />
                            {suitability.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      form.resetField("suitability");
                    }}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* drops */}
          <FormField
            control={form.control}
            name="drops"
            render={({ field }) => (
              <FormItem className="flex-1 min-w-[16rem] max-w-full">
                <FormLabel>Drops</FormLabel>
                <FormControl>
                  <Input placeholder="Type a drop" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-center gap-6">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem className=" flex-1 min-w-[16rem] max-w-full">
                <FormLabel />
                <FormControl>
                  <Input placeholder="Type anything..." {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
}
