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

export default function PriceTierModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full xl:w-fit">
          <CirclePlusIcon />
          Add New Account
        </Button>
      </DialogTrigger>
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
                  <FormItem className="col-span-1 xl:col-span-2">
                    <FormLabel>Description</FormLabel>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a price tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priceTiers.map((tier) => {
                          return (
                            <SelectItem key={tier.value} value={tier.value}>
                              {tier.label}
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
                name="rank"
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
                  name="status"
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
                  name="duration"
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
                      {field.value instanceof File && (
                        <div className="mt-2 w-full xl:w-1/2">
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Thumbnail Preview"
                            className="object-cover rounded-md border"
                          />
                        </div>
                      )}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
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
                          const existingFiles = form.getValues("images") || [];
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
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`image-${idx}`}
                              className="object-cover rounded-md border"
                            />
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
                className="xl:col-start-2 w-fit justify-self-end"
              >
                Submit
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
