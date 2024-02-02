"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface InputActionProps {
  name: string;
  description: string;
}
export const InputAction = async (data: InputActionProps) => {
  try {
    const createdData = await db.inputModel.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
    revalidatePath("/");
    return createdData;
  } catch (error) {
    console.log(error, ":Error while input");
  }
};

export const getAllData = async () => {
  try {
    const data = await db.inputModel.findMany();
    return data;
  } catch (error) {
    console.log(error);
  }
};
