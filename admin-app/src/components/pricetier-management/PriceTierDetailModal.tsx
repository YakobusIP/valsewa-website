import { useState } from "react";

import { priceTierService } from "@/services/pricetier.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { usePriceTier } from "@/hooks/usePriceTier";
import { toast } from "@/hooks/useToast";

import { PriceTier } from "@/types/pricetier.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  code: z.string().nonempty("Code is required"),
  description: z.string().nonempty("Description is required")
});

type Props = {
  mode: "add" | "edit";
  data?: PriceTier;
};

export default function PriceTierDetailModal({ mode, data }: Props) {
  const { refetchPriceTier } = usePriceTier();

  const [open, onOpenChange] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && data
        ? {
            code: data.code,
            description: data.description
          }
        : {
            code: "",
            description: ""
          },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleAddPriceTier = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await priceTierService.create(values);
      await refetchPriceTier();
      onOpenChange(false);

      toast({
        title: "All set!",
        description: response.message
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleEditPriceTier = async (
    id: number,
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const response = await priceTierService.update(id, values);
      await refetchPriceTier();
      onOpenChange(false);

      toast({
        title: "All set!",
        description: response.message
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoadingSubmit(true);
    if (mode === "add") await handleAddPriceTier(values);
    else if (mode === "edit" && data)
      await handleEditPriceTier(data.id, values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button className="justify-self-end">Edit</Button>
        ) : (
          <Button className="w-full xl:w-fit">
            <CirclePlusIcon />
            Add
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full xl:w-2/5">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit"
              ? `Edit Price Tier (${data && data.code})`
              : "Add New Price Tier"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter code here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description here"
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full xl:w-fit self-end">
              {isLoadingSubmit && (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
