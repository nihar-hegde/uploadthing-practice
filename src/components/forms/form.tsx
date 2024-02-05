"use client";
import React, { useState } from "react";
import { CardWrapper } from "../card-wrapper";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputSchema } from "@/schemas";
import { InputAction } from "@/actions/input-action";
import { FileUploader } from "./file-uploader";
import { useUploadThing } from "@/utils/uploadthing";

export const InputForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  const images = useWatch({
    control: form.control,
    name: "images",
  });

  const imageUrls = Array.isArray(images) ? images : [images];

  const onSubmit = async (values: z.infer<typeof InputSchema>) => {
    try {
      let uploadedImageUrl = values.images;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
          return;
        }

        uploadedImageUrl = uploadedImages.map((image) => image.url); // Extract URLs
      }
      const { name, description } = values;
      const formData = await InputAction({
        name: name,
        description: description,
        images: uploadedImageUrl,
      });
      console.log(formData, "Success created data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Input Form"
        backButtonHref="/"
        backButtonLabel="Go To Home"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description..."
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        onFieldChange={field.onChange}
                        imageUrls={imageUrls}
                        files={files}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
