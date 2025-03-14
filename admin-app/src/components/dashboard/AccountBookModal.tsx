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
import { Checkbox } from "@/components/ui/checkbox";
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
import { CheckedState } from "@radix-ui/react-checkbox";
import { addHours, format } from "date-fns";
import { CalendarIcon, CopyIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import parse from "parse-duration";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  availabilityStatus: z.enum(["AVAILABLE", "IN_USE", "NOT_AVAILABLE"]),
  nextBooking: z.date().nullish(),
  nextBookingDuration: z.string().optional(),
  forceUpdateExpiry: z.boolean().default(false).optional(),
  forceUpdateTotalRentHour: z.boolean().default(false).optional(),
  expireAt: z.date().optional(),
  totalRentHour: z.string().optional()
});

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  data: AccountEntity;
  resetParent: () => Promise<void>;
};

export default function AccountBookModal({
  open,
  onOpenChange,
  data,
  resetParent
}: Props) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [skinListText, setSkinListText] = useState("");
  const [enableTotalRentHourEdit, setEnableTotalRentHourEdit] =
    useState<CheckedState>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availabilityStatus:
        (data.availabilityStatus as AVAILABILITY_STATUS) || "AVAILABLE",
      nextBooking: data.nextBooking ? new Date(data.nextBooking) : new Date(),
      nextBookingDuration:
        convertHoursToDays(data.nextBookingDuration) || undefined,
      expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
      totalRentHour: convertHoursToDays(data.totalRentHour) || undefined
    },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("nextBooking", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = form.getValues("nextBooking") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      const minute = parseInt(value, 10);
      newDate.setMinutes(minute);
    }

    form.setValue("nextBooking", newDate);
  };

  const handleDeleteBookingDate = () => {
    form.setValue("nextBooking", null);
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

  const copyReminderToClipboard = async () => {
    await navigator.clipboard.writeText(reminderText);
    toast({
      title: "All set!",
      description: "Copied to clipboard!"
    });
  };

  const copySkinListToClipboard = async () => {
    await navigator.clipboard.writeText(skinListText);
    toast({
      title: "All set!",
      description: "Copied to clipboard!"
    });
  };

  const handleUpdateBooking = async (
    id: number,
    values: z.infer<typeof formSchema>
  ) => {
    const bookingDurationNumber = parse(values.nextBookingDuration);
    const totalRentHourNumber = parse(values.totalRentHour);

    delete values.nextBookingDuration;
    delete values.totalRentHour;

    const payload = {
      ...values,
      bookingScheduledAt: values.nextBooking ? new Date() : undefined,
      ...(bookingDurationNumber !== null
        ? { nextBookingDuration: bookingDurationNumber / (1000 * 60 * 60) }
        : {}),
      ...(totalRentHourNumber !== null && enableTotalRentHourEdit
        ? { totalRentHour: totalRentHourNumber / (1000 * 60 * 60) }
        : {})
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

  const selectedStatusColor =
    availabilityStatuses.find(
      (status) => status.value === form.watch("availabilityStatus")
    )?.color || "bg-white";

  const durationValue = form.watch("nextBookingDuration");
  const nextBookingValue = form.watch("nextBooking");
  const expireAtValue = form.watch("expireAt");
  const forceUpdateTotalRentHourValue = form.watch("forceUpdateTotalRentHour");

  useEffect(() => {
    if (durationValue) {
      const hours = parseDurationToHours(durationValue) || 0;
      const nextBooking = nextBookingValue || new Date();
      const nextBookingDate = new Date(nextBooking);

      const expireDate = addHours(nextBookingDate, hours);
      form.setValue("expireAt", expireDate);
    }
  }, [durationValue, nextBookingValue, form, parseDurationToHours]);

  useEffect(() => {
    setReminderText(`Username Riot: ${data.username}\nPassword Riot: ${data.password}\nKode Akun: ${data.accountCode}\nExpired: ${format(expireAtValue || new Date(), "dd MMMM yyyy 'at' HH:mm")}
                    \nMOHON DILOGOUT AKUNNYA PADA/SEBELUM WAKTU RENTAL HABIS‼ agar tidak terkena penalty pada akun yang menyebabkan anda terkena DENDA❗
                    \nJika sudah bisa login tolong bantu comment testimoni anda di postingan akun yang di sewa jika berkenan
                    \nTHANK YOUU udah rental akun di @valsewa, enjoy and have a nice day! Kalau ada kendala langsung chat mimin yaa👌🏻.
                    \nJangan lupa untuk ngisi form kepuasan yaa😼
                    \nhttps://forms.gle/tLtQdX1SFyyFhXE86`);
  }, [expireAtValue, data]);

  useEffect(() => {
    const text = `List of skins akun ${data.accountCode}:\n${data.skinList.map((skin, index) => `${index + 1}. ${skin}`).join("\n")}`;
    setSkinListText(text);
  }, [data]);

  useEffect(() => {
    if (forceUpdateTotalRentHourValue) {
      form.setValue("availabilityStatus", "AVAILABLE");
      form.setValue("nextBooking", null);
      form.setValue("nextBookingDuration", "");
    }
  }, [form, forceUpdateTotalRentHourValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80dvh] xl:h-[60dvh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, handleError)}
              className="flex flex-col gap-4 p-4"
            >
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Booking Details</p>
                <hr />
              </div>

              {nextBookingValue && (
                <FormField
                  control={form.control}
                  name="forceUpdateExpiry"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Override Booking Date</FormLabel>
                        <FormDescription>
                          Override apabila terjadi kesalahan pada booking date
                          atau booking duration
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="forceUpdateTotalRentHour"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Finish Previous Booking</FormLabel>
                      <FormDescription>
                        Jika dicentang, maka booking sebelumnya selesai dan
                        total rent hour akan ditambahkan
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex flex-col min-[1920px]:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="availabilityStatus"
                  render={({ field }) => (
                    <FormItem className="w-full min-[1920px]:w-1/5">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={selectedStatusColor}>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availabilityStatuses.map((status) => {
                            return (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
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
                  name="nextBooking"
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
                            <div className="sm:flex">
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

              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={enableTotalRentHourEdit}
                    onCheckedChange={(checked) =>
                      setEnableTotalRentHourEdit(checked)
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Override Total Rent Hour
                  </label>
                </div>
                {enableTotalRentHourEdit ? (
                  <FormField
                    control={form.control}
                    name="totalRentHour"
                    render={({ field }) => (
                      <FormItem className="w-full xl:w-2/5">
                        <FormLabel>Total Rent Hour</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter total rent hour here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : null}
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

              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        className="absolute top-1 right-1 z-50"
                        onClick={() => copySkinListToClipboard()}
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
                  value={skinListText}
                  onChange={(e) => setSkinListText(e.target.value)}
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
