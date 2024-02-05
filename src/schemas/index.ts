import { z } from "zod";

export const InputSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  images: z
    .array(z.string())
    .min(1, "Please enter at least one image")
    .max(4, "You can upload a max of 4 images."),
});
