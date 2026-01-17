import { useCallback, useEffect, useRef, useState } from "react";

import { skinService } from "@/services/skin.service";

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

import { useSkin } from "@/hooks/useSkin";
import { toast } from "@/hooks/useToast";

import { Skin } from "@/types/skin.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlusIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  imageUrl: z.string(),
  keyword: z.string()
});

type Props = {
  mode: "add" | "edit";
  data?: Skin;
};

export default function SkinDetailModal({ mode, data }: Props) {
  const { refetchSkin } = useSkin();
  const isFirstRenderRank = useRef(true);

  const [open, onOpenChange] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoadingFetchImage, setIsLoadingFetchImage] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && data
        ? {
            name: data.name,
            keyword: data.keyword,
            imageUrl: data.imageUrl ?? ""
          }
        : {
            name: "",
            keyword: "",
            imageUrl: ""
          },
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  const handleNameInput = useCallback(
    async (name: string) => {
      setIsLoadingFetchImage(true);
      try {
        const imageResponse = await skinService.fetchImage(name.toLowerCase());
        setImageUrl(imageResponse.imageUrl);
        form.setValue("imageUrl", imageResponse.imageUrl);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occured";

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong!",
          description: errorMessage
        });
      } finally {
        setIsLoadingFetchImage(false);
      }
    },
    [form]
  );

  const debouncedNameHandler = useDebouncedCallback(handleNameInput, 1000);

  const nameValue = form.watch("name");

  useEffect(() => {
    if (!open) return;
    if (isFirstRenderRank.current) {
      isFirstRenderRank.current = false;
      return;
    }

    if (nameValue && nameValue.trim() !== "") {
      debouncedNameHandler(nameValue);
    }
  }, [nameValue, debouncedNameHandler, open]);

  useEffect(() => {
    if (!open) return;

    isFirstRenderRank.current = true;

    if (mode === "edit" && data) {
      const initialImageUrl = data.imageUrl ?? "";

      form.reset({
        name: data.name ?? "",
        keyword: data.keyword ?? "",
        imageUrl: initialImageUrl
      });

      setImageUrl(initialImageUrl);
    } else {
      form.reset({
        name: "",
        keyword: "",
        imageUrl: ""
      });

      setImageUrl("");
    }
  }, [open, mode, data, form]);

  const handleAddSkin = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await skinService.create(values);
      await refetchSkin();
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
      form.setValue("name", "");
      form.setValue("imageUrl", "");
      form.setValue("keyword", "");
      setImageUrl("");
    }
  };

  const handleEditSkin = async (
    id: number,
    values: z.infer<typeof formSchema>
  ) => {
    try {
      const response = await skinService.update(id, values);
      await refetchSkin();
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
      form.setValue("name", "");
      form.setValue("imageUrl", "");
      form.setValue("keyword", "");
      setImageUrl("");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoadingSubmit(true);
    if (mode === "add") await handleAddSkin(values);
    else if (mode === "edit" && data) await handleEditSkin(data.id, values);
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
              ? `Edit Skin (${data && data.name})`
              : "Add New Skin"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 xl:grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter skin name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          isLoadingFetchImage
                            ? "Fetching skin image link..."
                            : "Enter skin image link here"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keyword</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter skin keyword here"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col">
              <div className="text-sm font-medium text-muted-foreground">
                Preview
              </div>

              <div className="relative mt-2 border rounded-md overflow-hidden bg-muted aspect-video">
                {isLoadingFetchImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">
                      Loading image…
                    </div>
                  </div>
                )}

                {!isLoadingFetchImage && imageUrl != "" && (
                  <img
                    src={imageUrl}
                    alt={form.getValues("name") || "Image preview"}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
            </div>

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
