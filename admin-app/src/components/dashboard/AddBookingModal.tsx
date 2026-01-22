import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from "react";

import { bookingService } from "@/services/transaction.service";
import { settingService } from "@/services/setting.service";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";

import { cn, convertHoursToDays } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, format } from "date-fns";
import { CalendarIcon, CopyIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import parse from "parse-duration";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  bookingDate: z.date({ required_error: "Booking date is required" }),
  duration: z
    .string({ required_error: "Duration is required" })
    .nonempty("Duration is required"),
  totalValue: z
    .number({ required_error: "Total price is required" })
    .min(1, "Total price must be greater than 0"),
  expireAt: z.date().nullish()
});

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default function AddBookingModal({
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
      bookingDate: new Date(),
      duration: "",
      totalValue: 0,
      expireAt: undefined
    },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("bookingDate", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = form.getValues("bookingDate") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      const minute = parseInt(value, 10);
      newDate.setMinutes(minute);
    }

    form.setValue("bookingDate", newDate);
  };

  const handleDeleteBookingDate = () => {
    form.setValue("bookingDate", new Date());
    form.setValue("duration", "");
  };

  const parseDurationToHours = useCallback(
    (duration: string) => {
      const ms = parse(duration);
      if (ms === null) {
        form.setError("duration", {
          type: "validate",
          message: "Invalid duration format"
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

  const handleCreateBooking = async (
    accountId: number,
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const response = await bookingService.createAdminBooking({
        accountId,
        startAt: values.bookingDate,
        duration: values.duration,
        totalValue: values.totalValue
      });
      onOpenChange(false);
      await resetParent();

      toast({
        title: "All set!",
        description: response.message || "Booking created successfully"
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

    await handleCreateBooking(data.id, values);
  };

  const handleError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };

  const durationValue = form.watch("duration");
  const bookingDateValue = form.watch("bookingDate");
  const expireAtValue = form.watch("expireAt");

  useEffect(() => {
    if (durationValue) {
      const hours = parseDurationToHours(durationValue) || 0;
      const bookingDate = bookingDateValue || new Date();

      const expireDate = addHours(new Date(bookingDate), hours);
      form.setValue("expireAt", expireDate);
    }
  }, [durationValue, bookingDateValue, form, parseDurationToHours]);

  const [reminderTemplate, setReminderTemplate] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const setting = await settingService.getSetting("reminder_text");
        if (setting && setting.value) {
          setReminderTemplate(setting.value);
        } else {
          setReminderTemplate(
            `Username Riot: {username}\nPassword Riot: {password}\nKode Akun: {accountCode}\nExpired: {expired} WIB\n\n⚠ HARAP LOGOUT AKUN SEBELUM RENTAL BERAKHIR! ⚠\n\n Pastikan akun sudah logout tepat waktu untuk menghindari penalty yang dapat menyebabkan denda ❗\n\n 📌 Setelah berhasil login, jika berkenan, bisa bantu berikan testimoni dan rekomendasi ke teman-teman kalian yaa 😱\n\n 📢 Join Discord Community Valforum.id & dapatkan role @Juragan Valsewa 👇🏻\n\n https://discord.gg/ywqTZSTwRY`
          );
        }
      } catch (error) {
        console.error("Failed to fetch reminder settings", error);
      }
    };

    if (open) {
      fetchSettings();
    }
  }, [open]);

  useEffect(() => {
    if (!reminderTemplate) return;

    let text = reminderTemplate;
    text = text.replace(/{username}/g, data.username);
    text = text.replace(/{password}/g, data.password);
    text = text.replace(/{accountCode}/g, data.accountCode);
    text = text.replace(
      /{expired}/g,
      format(expireAtValue || new Date(), "dd MMMM yyyy 'at' HH:mm")
    );

    setReminderText(text);
  }, [expireAtValue, data, reminderTemplate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5 overflow-y-auto max-h-[100dvh]">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
          <DialogDescription>
            Create a new booking for this account
          </DialogDescription>
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
                name="bookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full min-[1920px]:w-2/5">
                    <FormLabel className="mt-[0.4rem] mb-[0.275rem]">
                      Booking Date
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
                name="duration"
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
              <FormField
                control={form.control}
                name="totalValue"
                render={({ field }) => (
                  <FormItem className="w-full min-[1920px]:w-2/5">
                    <FormLabel>Total Price</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter total price"
                        value={field.value === 0 ? "" : field.value.toString()}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            field.onChange(0);
                          } else {
                            const numValue = parseFloat(value);
                            if (!isNaN(numValue)) {
                              field.onChange(numValue);
                            }
                          }
                        }}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
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

            <div className="sticky bottom-0 bg-background p-4 border rounded-md flex justify-between gap-4 items-center">
              <p className="text-sm">
                Akun ini sudah pernah disewa selama{" "}
                <b>
                  {data?.totalRentHour
                    ? convertHoursToDays(data?.totalRentHour)
                    : "0d 0h"}
                </b>
              </p>

              <Button type="submit" className="w-fit">
                {isLoadingSubmit && (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
