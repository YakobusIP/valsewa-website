import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { accountService } from "@/services/account.service";
import { priceTierService } from "@/services/pricetier.service";
import { uploadService } from "@/services/upload.service";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { PriceTier } from "@/types/pricetier.type";

import { ranks } from "@/lib/constants";
import { cn, convertHoursToDays } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CirclePlusIcon,
  CopyIcon,
  Loader2Icon,
  LockIcon,
  Trash2Icon
} from "lucide-react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

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
  const isFirstRenderRank = useRef(true);
  const isFirstRenderDuplicate = useRef(true);
  const [isLoadingPriceTierList, setIsLoadingPriceTierList] = useState(false);
  const [priceTierList, setPriceTierList] = useState<PriceTier[]>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingFetchRank, setIsLoadingFetchRank] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(
    !data?.stale_password || false
  );
  const [thumbnailInputKey, setThumbnailInputKey] = useState(Date.now());
  const [accountDuplicate, setAccountDuplicate] = useState(false);

  const fetchPriceTierList = useCallback(async () => {
    setIsLoadingPriceTierList(true);
    try {
      const response = await priceTierService.fetchAll();
      setPriceTierList(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingPriceTierList(false);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && data
        ? {
            username: data.username,
            accountCode: data.accountCode,
            description: data.description ?? undefined,
            priceTier: data.priceTier.id,
            accountRank: data.accountRank,
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

  const handleDuplicateCheck = async (username: string, code: string) => {
    if (username && code) {
      try {
        const [name, tag] = username.split("#");
        const response = await accountService.fetchDuplicate(name, tag, code);
        setAccountDuplicate(response.exists);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      }
    }
  };

  const debouncedDuplicateHandler = useDebouncedCallback(
    handleDuplicateCheck,
    2000
  );

  const handlePriceTierChange = (value: string) => {
    form.setValue("priceTier", parseInt(value));
    form.trigger("priceTier");
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijkmnpqrstuvwxyz";
    const uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbers = "123456789";
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

  const handleAddAccount = async (
    values: z.infer<typeof formSchema>,
    thumbnail_id: number,
    other_image_ids: number[]
  ) => {
    const payload = {
      ...values,
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
        ? undefined
        : new Date();

    const payload = {
      ...values,
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
    if (accountDuplicate) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: "Username or code already exists!"
      });

      return;
    }
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

    form.reset();
    setThumbnailInputKey(Date.now());
  };

  const handleError = (errors: FieldErrors<z.infer<typeof formSchema>>) => {
    console.log(errors);
  };

  const hasPasswordError = !!form.formState.errors.password;
  const hasSkinsError = !!form.formState.errors.skinList;
  const hasThumbnail = !!form.getValues("thumbnail");

  const usernameValue = form.watch("username");
  const accountCodeValue = form.watch("accountCode");

  useEffect(() => {
    if (isFirstRenderRank.current) {
      isFirstRenderRank.current = false;
      return;
    }

    if (mode === "add" && usernameValue && usernameValue.trim() !== "") {
      debouncedUsernameHandler(usernameValue);
    }
  }, [mode, usernameValue, debouncedUsernameHandler]);

  useEffect(() => {
    if (isFirstRenderDuplicate.current) {
      isFirstRenderDuplicate.current = false;
      return;
    }

    if (
      mode === "add" &&
      usernameValue &&
      usernameValue.trim() !== "" &&
      accountCodeValue &&
      accountCodeValue.trim() !== ""
    ) {
      debouncedDuplicateHandler(usernameValue, accountCodeValue);
    }
  }, [mode, usernameValue, accountCodeValue, debouncedDuplicateHandler]);

  useEffect(() => {
    if (mode === "edit" && data) {
      form.reset({
        username: data.username,
        accountCode: data.accountCode,
        description: data.description ?? undefined,
        priceTier: data.priceTier.id,
        accountRank: data.accountRank,
        password: data.password,
        skinList: data.skinList.map((skinName) => ({ name: skinName })),
        thumbnail: data.thumbnail,
        otherImages: data.otherImages || []
      });
    } else if (mode === "add") {
      form.reset({
        username: "",
        accountCode: "",
        description: "",
        priceTier: undefined,
        accountRank: "",
        password: "",
        skinList: [{ name: "" }],
        thumbnail: undefined,
        otherImages: []
      });
    }
  }, [mode, data, form]);

  useEffect(() => {
    if (open) fetchPriceTierList();
  }, [fetchPriceTierList, open]);

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
                    <FormLabel>
                      Username <span className="text-destructive">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Code <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter code here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {accountDuplicate && (
                <p className="text-destructive text-sm font-bold col-span-1 xl:col-span-2">
                  Username or code already in use!
                </p>
              )}

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description here"
                        rows={5}
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
                    <FormLabel>
                      Price Tier <span className="text-destructive">*</span>
                    </FormLabel>
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
                        {isLoadingPriceTierList && (
                          <SelectItem value="Loading">
                            Fetching price tier...
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
                    <FormLabel>
                      Rank <span className="text-destructive">*</span>
                    </FormLabel>
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
                        {isLoadingFetchRank && (
                          <SelectItem value="Loading">
                            Fetching rank...
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-destructive">*</span>
                    </FormLabel>
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
                      <FormLabel>
                        Skin {index + 1}{" "}
                        {index === 0 && (
                          <span className="text-destructive">*</span>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter skin name here"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              appendSkin({ name: "" });
                            }
                          }}
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
                    <FormLabel>
                      Thumbnail <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-4">
                      <div
                        className={cn(
                          "flex flex-col w-full xl:w-1/2",
                          !hasThumbnail && "pr-2"
                        )}
                      >
                        <FormControl>
                          <Input
                            key={thumbnailInputKey}
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

              <p className="xl:col-start-2 justify-self-end text-sm">
                Akun ini sudah pernah disewa selama{" "}
                <b>
                  {data?.totalRentHour
                    ? convertHoursToDays(data?.totalRentHour)
                    : "0d 0h"}
                </b>
              </p>

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
