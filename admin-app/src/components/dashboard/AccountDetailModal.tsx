import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { accountService } from "@/services/account.service";
import { uploadService } from "@/services/upload.service";

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

import { usePriceTier } from "@/hooks/usePriceTier";
import { toast } from "@/hooks/useToast";

import { AccountEntity } from "@/types/account.type";

import { availabilityStatuses, ranks } from "@/lib/constants";
import { AVAILABILITY_STATUS } from "@/lib/enums";
import { cn, convertHoursToDays } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { addHours, format } from "date-fns";
import {
  CalendarIcon,
  CirclePlusIcon,
  CopyIcon,
  Loader2Icon,
  LockIcon,
  Trash2Icon
} from "lucide-react";
import parse from "parse-duration";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .regex(
      /^(?!.*#.*#)(.*\S)#(\S.*)$/,
      "Username must be in the format name#tag"
    ),
  accountCode: z.string().nonempty("Code is required"),
  description: z.string().optional(),
  priceTier: z.number({ required_error: "Price tier is required" }),
  accountRank: z.string().nonempty("Rank is required"),
  availabilityStatus: z.enum(["AVAILABLE", "IN_USE", "NOT_AVAILABLE"]),
  nextBooking: z.date().optional(),
  nextBookingDuration: z.string().optional(),
  forceUpdateExpiry: z.boolean().default(false).optional(),
  expireAt: z.date().optional(),
  password: z.string().nonempty("Password is required"),
  skinList: z
    .array(z.object({ name: z.string().optional() }))
    .transform((listOfSkins) =>
      listOfSkins.filter((skin) => skin.name && skin.name.trim() !== "")
    )
    .refine(
      (filteredSkins) => filteredSkins.length > 0,
      "At least 1 skin is required"
    ),
  thumbnail: z.union([
    z.instanceof(File, { message: "Thumbnail is required" }),
    z.object({ id: z.number(), imageUrl: z.string().url() })
  ]),
  otherImages: z
    .array(
      z.union([
        z.instanceof(File),
        z.object({ id: z.number(), imageUrl: z.string().url() })
      ])
    )
    .optional()
});

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  mode: "add" | "edit";
  data?: AccountEntity;
  resetParent: () => Promise<void>;
};

export default function AccountDetailModal({
  open,
  onOpenChange,
  mode,
  data,
  resetParent
}: Props) {
  const { priceTierList } = usePriceTier();

  const isFirstRender = useRef(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingFetchRank, setIsLoadingFetchRank] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(
    !data?.stale_password || false
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && data
        ? {
            username: data.username,
            accountCode: data.accountCode,
            description: data.description,
            priceTier: data.priceTier.id,
            accountRank: data.accountRank,
            availabilityStatus: data.availabilityStatus as AVAILABILITY_STATUS,
            nextBooking: data.nextBooking
              ? new Date(data.nextBooking)
              : new Date(),
            nextBookingDuration: convertHoursToDays(data.nextBookingDuration),
            expireAt: data.expireAt ? new Date(data.expireAt) : undefined,
            password: data.password,
            skinList: data.skinList.map((skinName) => ({ name: skinName })),
            thumbnail: data.thumbnail,
            otherImages: data.otherImages ? data.otherImages : []
          }
        : {
            username: "",
            accountCode: "",
            description: "",
            priceTier: undefined,
            accountRank: "",
            availabilityStatus: "AVAILABLE",
            nextBooking: undefined,
            nextBookingDuration: "",
            expireAt: undefined,
            password: "",
            skinList: [{ name: "" }],
            thumbnail: undefined,
            otherImages: []
          },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const {
    fields: skinFields,
    append: appendSkin,
    remove: removeSkin
  } = useFieldArray({
    control: form.control,
    name: "skinList"
  });

  const handleUsernameInput = useCallback(
    async (username: string) => {
      setIsLoadingFetchRank(true);
      try {
        const [name, tag] = username.split("#");
        const rankResponse = await accountService.fetchRank(name, tag);
        form.setValue("accountRank", rankResponse.currentRank);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      } finally {
        setIsLoadingFetchRank(false);
      }
    },
    [form]
  );

  const debouncedUsernameHandler = useDebouncedCallback(
    handleUsernameInput,
    5000
  );

  const handlePriceTierChange = (value: string) => {
    form.setValue("priceTier", parseInt(value));
    form.trigger("priceTier");
  };

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

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+{}[]<>?/";

    const getRandomChars = (source: string, length: number) =>
      Array.from(
        { length },
        () => source[Math.floor(Math.random() * source.length)]
      ).join("");

    return (
      getRandomChars(lowercase, 4) +
      getRandomChars(uppercase, 2) +
      getRandomChars(numbers, 4) +
      getRandomChars(specialChars, 2)
    );
  };

  const generateAndSetPassword = () => {
    const newPassword = generatePassword();
    form.setValue("password", newPassword, { shouldValidate: true });
    setIsPasswordUpdated(true);
  };

  const copyPasswordToClipboard = async () => {
    const password = form.watch("password");
    if (password) {
      await navigator.clipboard.writeText(password);
      toast({
        title: "All set!",
        description: "Copied to clipboard!"
      });
    }
  };

  const copyReminderToClipboard = async () => {
    await navigator.clipboard.writeText(reminderText);
    toast({
      title: "All set!",
      description: "Copied to clipboard!"
    });
  };

  const handleAddAccount = async (
    values: z.infer<typeof formSchema>,
    thumbnail_id: number,
    other_image_ids: number[]
  ) => {
    const payload = {
      ...values,
      nextBookingDuration: parse(values.nextBookingDuration) / (1000 * 60 * 60),
      passwordUpdatedAt: new Date(),
      thumbnail: thumbnail_id,
      otherImages: other_image_ids,
      skinList: values.skinList.map((skin) => skin.name || "")
    };
    try {
      const response = await accountService.create(payload);
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

  const handleEditAccount = async (
    id: number,
    values: z.infer<typeof formSchema>,
    thumbnail_id?: number,
    other_image_ids?: number[]
  ) => {
    const passwordUpdatedAt =
      mode === "edit" && data && values.password === data.password
        ? data.passwordUpdatedAt
        : new Date();

    const payload = {
      ...values,
      nextBookingDuration: parse(values.nextBookingDuration) / (1000 * 60 * 60),
      passwordUpdatedAt,
      thumbnail: thumbnail_id,
      otherImages: other_image_ids,
      skinList: values.skinList.map((skin) => skin.name || "")
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

    let thumbnail_id: number;
    if (values.thumbnail instanceof File) {
      thumbnail_id = (await uploadService.uploadImages([values.thumbnail]))[0]
        .id;
    } else {
      thumbnail_id = values.thumbnail.id;
    }

    const otherImageIds: number[] = [];
    const imagesToUpload: File[] = [];
    const unchangedImageIds: number[] = [];

    values.otherImages?.forEach((img) => {
      if (img instanceof File) {
        imagesToUpload.push(img);
      } else if (typeof img === "object" && img.id) {
        unchangedImageIds.push(img.id);
      }
    });

    if (imagesToUpload.length > 0) {
      const uploadedIds = (
        await uploadService.uploadImages(imagesToUpload)
      ).map((response) => response.id);
      otherImageIds.push(...unchangedImageIds, ...uploadedIds);
    } else {
      otherImageIds.push(...unchangedImageIds);
    }

    if (mode === "edit" && data) {
      await handleEditAccount(data.id, values, thumbnail_id, otherImageIds);
    } else if (mode === "add") {
      await handleAddAccount(values, thumbnail_id, otherImageIds);
    }
  };

  const handleError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };

  const selectedStatusColor =
    availabilityStatuses.find(
      (status) => status.value === form.watch("availabilityStatus")
    )?.color || "bg-white";
  const hasPasswordError = !!form.formState.errors.password;
  const hasSkinsError = !!form.formState.errors.skinList;
  const hasThumbnail = !!form.getValues("thumbnail");

  const usernameValue = form.watch("username");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (mode === "add" && usernameValue && usernameValue.trim() !== "") {
      debouncedUsernameHandler(usernameValue);
    }
  }, [mode, usernameValue, debouncedUsernameHandler]);

  const durationValue = form.watch("nextBookingDuration");
  const nextBookingValue = form.watch("nextBooking");
  const expireAtValue = form.watch("expireAt");

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
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  useEffect(() => {
    setReminderText(`${form.watch("username")}\n${form.watch("password")}\n${form.watch("accountCode")}\nExpired on ${format(form.watch("expireAt") || new Date(), "dd MMMM yyyy 'at' HH:mm")}
                  \nMOHON DILOGOUT AKUNNYA PADA/SEBELUM WAKTU RENTAL HABIS‼ agar tidak terkena penalty pada akun yang menyebabkan anda terkena DENDA❗
                  \nJika sudah bisa login tolong bantu comment testimoni anda di postingan akun yang di sewa jika berkenan
                  \nTHANK YOUU udah rental akun di @valsewa, enjoy and have a nice day! Kalau ada kendala langsung chat mimin yaa👌🏻.
                  \nJangan lupa untuk ngisi form kepuasan yaa😼
                  \nhttps://forms.gle/tLtQdX1SFyyFhXE86`);
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Account" : "Edit Account"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80dvh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, handleError)}
              className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4"
            >
              <div className="flex flex-col col-span-1 xl:col-span-2 gap-2">
                <p className="font-semibold">Account Details</p>
                <hr />
              </div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountCode"
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
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Tier</FormLabel>
                    <Select
                      onValueChange={(value) => handlePriceTierChange(value)}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a price tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceTierList.length > 0 ? (
                          priceTierList.map((tier) => {
                            return (
                              <SelectItem
                                key={tier.id}
                                value={tier.id.toString()}
                              >
                                {tier.code}
                              </SelectItem>
                            );
                          })
                        ) : (
                          <SelectItem value="no_price_tier" disabled>
                            No price tier available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountRank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rank</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={isLoadingFetchRank ? "Loading" : field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ranks.map((rank) => {
                          return (
                            <SelectItem key={rank.value} value={rank.value}>
                              {rank.label}
                            </SelectItem>
                          );
                        })}
                        <SelectItem value="Loading">
                          Fetching rank...
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col col-span-1 xl:col-span-2 gap-2">
                <p className="font-semibold">Booking Details</p>
                <hr />
              </div>

              {mode === "edit" && nextBookingValue && (
                <FormField
                  control={form.control}
                  name="forceUpdateExpiry"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-1 xl:col-span-2">
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

              <div className="flex flex-col xl:flex-row col-span-1 xl:col-span-2 gap-4">
                <FormField
                  control={form.control}
                  name="availabilityStatus"
                  render={({ field }) => (
                    <FormItem className="w-full xl:w-1/5">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    <FormItem className="flex flex-col w-full xl:w-2/5">
                      <FormLabel className="mt-[0.4rem] mb-[0.275rem]">
                        Next Booking
                      </FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
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
                              selected={field.value}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nextBookingDuration"
                  render={({ field }) => (
                    <FormItem className="w-full xl:w-2/5">
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
                <Label className="col-span-1 xl:col-span-2 text-destructive">
                  Status sewa akan expire pada{" "}
                  <span className="font-bold">
                    {format(expireAtValue, "dd MMMM yyyy 'at' HH:mm")}
                  </span>
                </Label>
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password here"
                        {...field}
                        endIcon={
                          form.watch("password") ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <CopyIcon
                                    size={18}
                                    className="text-muted-foreground hover:cursor-pointer"
                                    aria-label="Copy password to clipboard"
                                    onClick={() => copyPasswordToClipboard()}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copy to clipboard</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : undefined
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className={cn("xl:self-end", hasPasswordError && "xl:mb-7")}
                onClick={generateAndSetPassword}
              >
                <LockIcon />
                Generate New Password
              </Button>

              {!isPasswordUpdated && (
                <p className="text-destructive text-sm font-bold col-span-1 xl:col-span-2">
                  Password needs to be updated!
                </p>
              )}

              <div className="flex flex-col col-span-1 xl:col-span-2 gap-2">
                <p className="font-semibold">Skins</p>
                <hr />
                <p className="text-sm">
                  3 entri pertama akan ditampilkan di halaman utama
                </p>
              </div>

              {skinFields.map((field, index) => (
                <FormField
                  key={`skin-${field.id}`}
                  control={form.control}
                  name={`skinList.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skin {index + 1}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter skin name here"
                          {...field}
                          endIcon={
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Trash2Icon
                                    size={18}
                                    className="text-destructive hover:cursor-pointer"
                                    aria-label={`Delete skin ${index}`}
                                    onClick={() => removeSkin(index)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete skin</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                onClick={() => appendSkin({ name: "" })}
                className={cn(
                  "self-end",
                  hasSkinsError && skinFields.length / 2 === 0 && "mb-7"
                )}
              >
                <CirclePlusIcon />
                Add New Skin
              </Button>
              {form.formState.errors.skinList && (
                <p className="text-sm font-medium text-destructive col-span-1 xl:col-span-2">
                  {form.formState.errors.skinList.root?.message}
                </p>
              )}

              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Thumbnail</FormLabel>
                    <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-4">
                      <div
                        className={cn(
                          "flex flex-col w-full xl:w-1/2",
                          !hasThumbnail && "pr-2"
                        )}
                      >
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (!files || files.length === 0) {
                                field.onChange("");
                                return;
                              }
                              field.onChange(files[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                      <div className="mt-2 w-full xl:w-1/2">
                        {field.value instanceof File ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Thumbnail Preview"
                            className="object-cover rounded-md border"
                          />
                        ) : typeof field.value === "object" ? (
                          <img
                            src={field.value.imageUrl}
                            alt="Thumbnail Preview"
                            className="object-cover rounded-md border"
                          />
                        ) : null}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherImages"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Other Images</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const newFiles = e.target.files;
                          if (!newFiles || newFiles.length === 0) {
                            return;
                          }
                          const existingFiles =
                            form.getValues("otherImages") || [];
                          const appended = [
                            ...existingFiles,
                            ...Array.from(newFiles)
                          ];
                          field.onChange(appended);
                        }}
                      />
                    </FormControl>

                    {Array.isArray(field.value) && field.value.length > 0 && (
                      <div className="mt-2 grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {field.value.map((file, idx) => (
                          <div key={`image-${idx}`} className="relative">
                            {file instanceof File ? (
                              <img
                                src={URL.createObjectURL(file as File)}
                                alt={`image-${idx}`}
                                className="object-cover rounded-md border"
                              />
                            ) : typeof file === "object" ? (
                              <img
                                src={file.imageUrl}
                                alt={`image-${idx}`}
                                className="object-cover rounded-md border"
                              />
                            ) : null}
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1"
                              onClick={() => {
                                const newFiles = [...(field.value as File[])];
                                newFiles.splice(idx, 1);
                                field.onChange(newFiles);
                              }}
                            >
                              <Trash2Icon />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="relative col-span-1 xl:col-span-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        className="absolute top-1 right-1"
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
              <Button
                type="submit"
                className="xl:col-start-2 w-full xl:w-fit justify-self-end"
              >
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
