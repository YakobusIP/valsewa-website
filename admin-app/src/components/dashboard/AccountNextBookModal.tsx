import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";

import { accountService } from "@/services/account.service";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";

import { cn, convertHoursToDays } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, format } from "date-fns";
import { CalendarIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import parse from "parse-duration";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nextBookingDate: z.date().nullish(),
  nextBookingDuration: z
    .string({ required_error: "Duration is required" })
    .nonempty(),
  nextExpireAt: z.date().nullish()
});

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default function AccountNextBookModal({
  open,
  onOpenChange,
  data,
  resetParent
}: Props) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nextBookingDate: data.nextBookingDate
        ? new Date(data.nextBookingDate)
        : new Date(),
      nextBookingDuration:
        convertHoursToDays(data.nextBookingDuration) || undefined,
      nextExpireAt: data.nextExpireAt ? new Date(data.nextExpireAt) : undefined
    },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("nextBookingDate", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = form.getValues("nextBookingDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      const minute = parseInt(value, 10);
      newDate.setMinutes(minute);
    }

    form.setValue("nextBookingDate", newDate);
  };

  const handleDeleteBookingDate = () => {
    form.setValue("nextBookingDate", null);
    form.setValue("nextBookingDuration", "");
  };

  const parseDurationToHours = useCallback(
    (duration: string) => {
      const ms = parse(duration);
      if (ms === null) {
        form.setError("nextBookingDuration", {
          type: "validate",
          message: "Invalid date format"
        });

        return null;
      }

      return ms / (1000 * 60 * 60);
    },
    [form]
  );

  const handleUpdateBooking = async (
    id: number,
    values: z.infer<typeof formSchema>
  ) => {
    const bookingDurationNumber = parse(values.nextBookingDuration);

    const payload = {
      ...values,
      ...{
        nextBookingDuration: (bookingDurationNumber || 0) / (1000 * 60 * 60)
      }
    };
    try {
      const response = await accountService.update(id, payload);
      onOpenChange(false);
      await resetParent();

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

    await handleUpdateBooking(data.id, values);
  };

  const handleError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };

  const durationValue = form.watch("nextBookingDuration");
  const nextBookingValue = form.watch("nextBookingDate");
  const expireAtValue = form.watch("nextExpireAt");

  useEffect(() => {
    if (durationValue) {
      const hours = parseDurationToHours(durationValue) || 0;
      const nextBookingDate = nextBookingValue || new Date();

      const expireDate = addHours(new Date(nextBookingDate), hours);
      form.setValue("nextExpireAt", expireDate);
    }
  }, [durationValue, nextBookingValue, form, parseDurationToHours]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>Next Booking</DialogTitle>
          <DialogDescription>
            View and manage the next scheduled booking for this account
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex flex-col gap-4 p-4"
          >
            <div className="flex flex-col min-[1920px]:flex-row gap-4">
              <FormField
                control={form.control}
                name="nextBookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full min-[1920px]:w-3/5">
                    <FormLabel className="mt-[0.4rem] mb-[0.275rem]">
                      Next Booking
                    </FormLabel>
                    <div className="flex items-center justify-center gap-2">
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal flex-1",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "dd MMMM yyyy 'at' HH:mm")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <div className="sm:flex overflow-auto h-96 xl:h-fit">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={handleDateSelect}
                              initialFocus
                            />
                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                              <ScrollArea
                                type="always"
                                className="w-[17.25rem] sm:w-auto"
                              >
                                <div className="flex sm:flex-col p-2">
                                  {Array.from({ length: 24 }, (_, i) => i)
                                    .reverse()
                                    .map((hour) => (
                                      <Button
                                        key={hour}
                                        size="icon"
                                        variant={
                                          field.value &&
                                          field.value.getHours() === hour
                                            ? "default"
                                            : "ghost"
                                        }
                                        className="sm:w-full shrink-0 aspect-square"
                                        onClick={() =>
                                          handleTimeChange(
                                            "hour",
                                            hour.toString()
                                          )
                                        }
                                      >
                                        {hour}
                                      </Button>
                                    ))}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                              <ScrollArea
                                type="always"
                                className="w-[17.25rem] sm:w-auto"
                              >
                                <div className="flex sm:flex-col p-2">
                                  {Array.from(
                                    { length: 12 },
                                    (_, i) => i * 5
                                  ).map((minute) => (
                                    <Button
                                      key={minute}
                                      size="icon"
                                      variant={
                                        field.value &&
                                        field.value.getMinutes() === minute
                                          ? "default"
                                          : "ghost"
                                      }
                                      className="sm:w-full shrink-0 aspect-square"
                                      onClick={() =>
                                        handleTimeChange(
                                          "minute",
                                          minute.toString()
                                        )
                                      }
                                    >
                                      {minute.toString().padStart(2, "0")}
                                    </Button>
                                  ))}
                                </div>
                                <ScrollBar
                                  orientation="horizontal"
                                  className="sm:hidden"
                                />
                              </ScrollArea>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={handleDeleteBookingDate}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nextBookingDuration"
                render={({ field }) => (
                  <FormItem className="w-full min-[1920px]:w-2/5">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter duration here" {...field} />
                    </FormControl>
                    <FormDescription>Contoh format: 7d 1h</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {expireAtValue && (
              <Label className="text-destructive">
                Status sewa akan expire pada{" "}
                <span className="font-bold">
                  {format(expireAtValue, "dd MMMM yyyy 'at' HH:mm")}
                </span>
              </Label>
            )}

            <Button type="submit" className="w-full xl:w-fit place-self-end">
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
