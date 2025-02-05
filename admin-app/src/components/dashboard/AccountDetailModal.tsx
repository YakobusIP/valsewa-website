import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

import { accountService } from "@/services/account.service";
import { priceTierService } from "@/services/pricetier.service";
import { uploadService } from "@/services/upload.service";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

import { useToast } from "@/hooks/useToast";

import { AccountEntity, AccountEntityRequest } from "@/types/account.type";
import { PriceTier } from "@/types/pricetier.type";

import { availabilityStatuses, ranks } from "@/lib/constants";
import { AVAILABILITY_STATUS } from "@/lib/enums";
import { cn, convertHoursToDays } from "@/lib/utils";

import { PriceTierContext } from "@/contexts/PriceTierContext";
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
import { z } from "zod";

const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
  account_code: z.string().nonempty("Code is required"),
  description: z.string().optional(),
  price_tier: z.number({ message: "Price tier is required" }),
  account_rank: z.string().nonempty("Rank is required"),
  availability_status: z.enum(["available", "in_use", "not_available"]),
  next_booking: z.date().optional(),
  expire_at: z.date().optional(),
  next_booking_duration: z.string().optional(),
  password: z.string().nonempty("Password is required"),
  skins: z
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
    z.string().nonempty("Thumbnail is required")
  ]),
  other_images: z.array(z.union([z.instanceof(File), z.string()])).optional()
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
  const context = useContext(PriceTierContext);

  if (!context) {
    throw new Error("Price tier context is missing");
  }

  const { priceTierList } = context;

  const toast = useToast();

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && data
        ? {
            username: data.username,
            account_code: data.account_code,
            description: data.description,
            price_tier: data.price_tier.id,
            account_rank: data.account_rank,
            availability_status:
              data.availability_status as AVAILABILITY_STATUS,
            next_booking: data.next_booking
              ? new Date(data.next_booking)
              : undefined,
            expire_at: data.expire_at ? new Date(data.expire_at) : undefined,
            next_booking_duration: convertHoursToDays(
              data.next_booking_duration
            ),
            password: data.password,
            skins: data.skins.names.map((skinName) => ({ name: skinName })),
            thumbnail: data.thumbnail.url,
            other_images: data.other_images?.map((img) => img.url)
          }
        : {
            username: "",
            account_code: "",
            description: "",
            price_tier: undefined,
            account_rank: "",
            availability_status: "available",
            next_booking: undefined,
            expire_at: undefined,
            next_booking_duration: "",
            password: "",
            skins: [{ name: "" }],
            thumbnail: undefined,
            other_images: []
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
    name: "skins"
  });

  const handlePriceTierChange = (value: string) => {
    form.setValue("price_tier", parseInt(value));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("next_booking", date);
    }
  };

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const currentDate = form.getValues("next_booking") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      const minute = parseInt(value, 10);
      newDate.setMinutes(minute);
    }

    form.setValue("next_booking", newDate);
  };

  const parseDurationToHours = useCallback(
    (duration: string) => {
      const ms = parse(duration);
      if (ms === null) {
        form.setError("next_booking_duration", {
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
  };

  const copyToClipboard = async () => {
    const password = form.watch("password");
    if (password) {
      await navigator.clipboard.writeText(password);
      toast.toast({
        title: "All set!",
        description: "Copied to clipboard!"
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoadingSubmit(true);
    let thumbnail_id = -1;
    if (values.thumbnail instanceof File) {
      thumbnail_id = (await uploadService.uploadImages([values.thumbnail]))[0]
        .id;
    }

    const other_images: File[] = [];
    values.other_images?.forEach((image) => {
      if (image instanceof File) {
        other_images.push(image);
      }
    });

    const other_image_ids = (
      await uploadService.uploadImages(other_images)
    ).map((response) => response.id);

    if (mode === "add") {
      const data = {
        ...values,
        next_booking_duration: parse(values.next_booking_duration),
        password_updated_at: new Date(),
        thumbnail: thumbnail_id,
        other_images: other_image_ids,
        skins: { names: values.skins.map((skin) => skin.name || "") }
      };
      try {
        const response = await accountService.create(data);
        onOpenChange(false);
        resetParent();

        toast.toast({
          title: "All set!",
          description: "Account created successfully"
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast.toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      } finally {
        setIsLoadingSubmit(false);
      }
    }
  };

  const handleError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };

  const selectedStatusColor =
    availabilityStatuses.find(
      (status) => status.value === form.watch("availability_status")
    )?.color || "bg-white";
  const hasPasswordError = !!form.formState.errors.password;
  const hasSkinsError = !!form.formState.errors.skins;
  const hasThumbnail = !!form.getValues("thumbnail");

  const durationValue = form.watch("next_booking_duration");
  const nextBookingValue = form.watch("next_booking");
  const expireAtValue = form.watch("expire_at");

  useEffect(() => {
    if (durationValue) {
      const hours = parseDurationToHours(durationValue) || 0;
      const nextBooking = nextBookingValue || new Date();
      const nextBookingDate = new Date(nextBooking);

      const expireDate = addHours(nextBookingDate, hours);
      form.setValue("expire_at", expireDate);
    }
  }, [durationValue, nextBookingValue, form, parseDurationToHours]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full xl:w-2/5">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80dvh]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, handleError)}
              className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4"
            >
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
                name="account_code"
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
                name="price_tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Tier</FormLabel>
                    <Select
                      onValueChange={(value) => handlePriceTierChange(value)}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a price tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceTierList.map((tier) => {
                          return (
                            <SelectItem
                              key={tier.id}
                              value={tier.id.toString()}
                            >
                              {tier.code}
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
                name="account_rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rank</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col xl:flex-row col-span-1 xl:col-span-2 gap-4">
                <FormField
                  control={form.control}
                  name="availability_status"
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
                  name="next_booking"
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
                  name="next_booking_duration"
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
                                    onClick={() => copyToClipboard()}
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

              <div className="flex flex-col col-span-1 xl:col-span-2">
                <h4 className="font-bold">Skins</h4>
                <p>3 entri pertama akan ditampilkan di halaman utama</p>
              </div>

              {skinFields.map((field, index) => (
                <FormField
                  key={`skin-${field.id}`}
                  control={form.control}
                  name={`skins.${index}.name`}
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
              {form.formState.errors.skins && (
                <p className="text-sm font-medium text-destructive col-span-2">
                  {form.formState.errors.skins.root?.message}
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
                        ) : typeof field.value === "string" ? (
                          <img
                            src={`${import.meta.env.VITE_AXIOS_BASE_URL}${field.value}`}
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
                name="other_images"
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
                            form.getValues("other_images") || [];
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
                            ) : typeof file === "string" ? (
                              <img
                                src={`${import.meta.env.VITE_AXIOS_BASE_URL}${file}`}
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
