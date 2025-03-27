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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";

import { availabilityStatuses } from "@/lib/constants";
import { AVAILABILITY_STATUS } from "@/lib/enums";
import { cn, convertHoursToDays } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, format } from "date-fns";
import { CalendarIcon, CopyIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import parse from "parse-duration";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  availabilityStatus: z.enum(["AVAILABLE", "IN_USE", "NOT_AVAILABLE"]),
  currentBookingDate: z.date().nullish(),
  currentBookingDuration: z
    .string({ required_error: "Duration is required" })
    .nonempty(),
  currentExpireAt: z.date().nullish()
});

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default function AccountCurrentBookModal({
  open,
  onOpenChange,
  data,
  resetParent
}: Props) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [reminderText, setReminderText] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availabilityStatus:
        (data.availabilityStatus as AVAILABILITY_STATUS) || "AVAILABLE",
      currentBookingDate: data.currentBookingDate
        ? new Date(data.currentBookingDate)
        : new Date(),
      currentBookingDuration:
        convertHoursToDays(data.currentBookingDuration) || undefined,
      currentExpireAt: data.currentExpireAt
        ? new Date(data.currentExpireAt)
        : undefined
    },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("currentBookingDate", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = form.getValues("currentBookingDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      const minute = parseInt(value, 10);
      newDate.setMinutes(minute);
    }

    form.setValue("currentBookingDate", newDate);
  };

  const handleDeleteBookingDate = () => {
    form.setValue("currentBookingDate", null);
    form.setValue("currentBookingDuration", "");
  };

  const parseDurationToHours = useCallback(
    (duration: string) => {
      const ms = parse(duration);
      if (ms === null) {
        form.setError("currentBookingDuration", {
          type: "validate",
          message: "Invalid date format"
        });

        return null;
      }

      return ms / (1000 * 60 * 60);
    },
    [form]
  );

  const copyReminderToClipboard = async () => {
    await navigator.clipboard.writeText(reminderText);
    toast({
      title: "All set!",
      description: "Copied to clipboard!"
    });
  };

  const handleUpdateBooking = async (
    id: number,
    values: z.infer<typeof formSchema>
  ) => {
    const bookingDurationNumber = parse(values.currentBookingDuration);

    const payload = {
      ...values,
      ...{
        currentBookingDuration: (bookingDurationNumber || 0) / (1000 * 60 * 60)
      }
    };
    try {
      const response = await accountService.update(id, payload, true);
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

  const selectedStatusColor =
    availabilityStatuses.find(
      (status) => status.value === form.watch("availabilityStatus")
    )?.color || "bg-white";

  const durationValue = form.watch("currentBookingDuration");
  const currentBookingValue = form.watch("currentBookingDate");
  const expireAtValue = form.watch("currentExpireAt");

  useEffect(() => {
    if (durationValue) {
      const hours = parseDurationToHours(durationValue) || 0;
      const currentBookingDate = currentBookingValue || new Date();

      const expireDate = addHours(new Date(currentBookingDate), hours);
      form.setValue("currentExpireAt", expireDate);
    }
  }, [durationValue, currentBookingValue, form, parseDurationToHours]);

  useEffect(() => {
    setReminderText(`Username Riot: ${data.username}\nPassword Riot: ${data.password}\nKode Akun: ${data.accountCode}\nExpired: ${format(expireAtValue || new Date(), "dd MMMM yyyy 'at' HH:mm")} WIB
                    \n⚠ HARAP LOGOUT AKUN SEBELUM RENTAL BERAKHIR!⚠ 
                    \n Pastikan akun sudah logout tepat waktu untuk menghindari penalty yang dapat menyebabkan denda❗
                    \n 📌Setelah berhasil login, jika berkenan, bantu berikan testimoni di postingan akun yang disewa.
                    \n Terima kasih sudah menyewa akun di @valsewa! Enjoy and have a great time! ✨🙏 Jika ada kendala, langsung hubungi admin ya 👌🏻
                    \nDiscord Community Valorant
👇
https://discord.gg/ywqTZSTwRY `);
  }, [expireAtValue, data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>Current Booking</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="flex flex-col gap-4 p-4"
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Booking Details</p>
              <hr />
            </div>

            <div className="flex flex-col min-[1920px]:flex-row gap-4">
              <FormField
                control={form.control}
                name="availabilityStatus"
                render={({ field }) => (
                  <FormItem className="w-full min-[1920px]:w-1/5">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className={selectedStatusColor}>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availabilityStatuses.map((status) => {
                          return (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentBookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full min-[1920px]:w-2/5">
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
                name="currentBookingDuration"
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

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Transactional Info</p>
              <hr />
            </div>

            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      className="absolute top-1 right-1 z-50"
                      onClick={() => copyReminderToClipboard()}
                    >
                      <CopyIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Textarea
                rows={16}
                className="whitespace-pre-wrap"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
              />
            </div>

            <p className="place-self-end text-sm">
              Akun ini sudah pernah disewa selama{" "}
              <b>
                {data?.totalRentHour
                  ? convertHoursToDays(data?.totalRentHour)
                  : "0d 0h"}
              </b>
            </p>

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
