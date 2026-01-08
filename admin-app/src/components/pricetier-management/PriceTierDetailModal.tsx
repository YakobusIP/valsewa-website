import { useState, useEffect } from "react";

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

import { usePriceTier } from "@/hooks/usePriceTier";
import { toast } from "@/hooks/useToast";

import { PriceTier } from "@/types/pricetier.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const DURATION_RE = /^(?:(\d+)d(?:\s+([01]?\d|2[0-3])h)?|([01]?\d|2[0-3])h)$/;

const priceListSchema = z.object({
  duration: z.string().regex(DURATION_RE, "Duration must be like '1d 5h or 1d or 5h' (hours 0–23)"),
  normalPrice: z.coerce.number().min(0, "Normal price must be 0 or more"),
  lowPrice: z.coerce.number().min(0, "Low rank price must be 0 or more"),
})

const formSchema = z.object({
  code: z.string().nonempty("Code is required"),
  priceList: z.array(priceListSchema).min(1, "At least one price item is required")
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
            priceList: data.priceList
          }
        : {
            code: "",
            priceList: []
          },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });


  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "priceList"
  });

  const handleDialogChange = (nextOpen: boolean) => {
  onOpenChange(nextOpen);

  if (!nextOpen) {
    form.reset({ code: "", priceList: [] });
    replace([]);
  }
};


  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && data) {
    const mapped = data.priceList;

    form.reset({ code: data.code, priceList: mapped });
    replace(mapped);
  } else {
    form.reset({ code: "", priceList: [] });
    replace([]);
  }
}, [open, mode, data, form, replace]);

  const addRow = () => {
    append({ duration: "", normalPrice: 0, lowPrice: 0})
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoadingSubmit(true);

    try {
      const response =
        mode === "add"
          ? await priceTierService.create(values)
          : await priceTierService.update(data!.id, values);

      await refetchPriceTier();
      onOpenChange(false);

      toast({ title: "All set!", description: response.message });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: error instanceof Error ? error.message : "An unknown error occured",
      });
    } finally {
      setIsLoadingSubmit(false);
    }

  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Price List</FormLabel>

                <Button type="button" variant="secondary" onClick={addRow}>
                  <CirclePlusIcon className="mr-2 h-4 w-4" />
                  Add row
                </Button>
              </div>

              {form.formState.errors.priceList?.message && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.priceList.message}
                </p>
              )}
              
              <div className="rounded-md border">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 border-b bg-muted/40 p-2 text-sm font-medium">
                  <div>Duration</div>
                  <div>Normal Price</div>
                  <div>Low Rank Price</div>
                  <div className="w-10" />
                </div>


                  {fields.length === 0 ? (
                    <div className="p-3 text-sm text-muted-foreground">
                      No rows yet. Click <span className="font-medium">Add row</span>.
                    </div>
                  ) : (
                    fields.map((row, index) => (
                      <div
                        key={row.id}
                        className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 p-2"
                      >
                        <FormField
                        control={form.control}
                        name={`priceList.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="string"
                                min={0}
                                step="1"
                                placeholder="0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                        <FormField
                          control={form.control}
                          name={`priceList.${index}.normalPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  step="1"
                                  placeholder="0"
                                  onFocus={() => {
                                    if (field.value === 0) field.onChange("");
                                  }}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`priceList.${index}.lowPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  step="1"
                                  placeholder="0"
                                  onFocus={() => {
                                    if (field.value === 0) field.onChange("");
                                  }}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex items-start justify-end pt-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={fields.length === 1}
                            onClick={() => remove(index)}
                            aria-label="Remove row"
                          >
                            <Trash2Icon className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
              </div>

              <p className="text-xs text-muted-foreground">
                Duration format: <span className="font-medium">Nd Hh</span> (e.g.{" "}
                <span className="font-medium">1d 5h</span>), hours 0–23.
              </p>
            </div>

            <Button type="submit" className="w-full xl:w-fit self-end" disabled={isLoadingSubmit}>
              {isLoadingSubmit && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  );
}
