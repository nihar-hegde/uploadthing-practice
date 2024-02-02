"use server";

import { db } from "@/lib/db";

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
    return createdData;
  } catch (error) {
    console.log(error, ":Error while input");
  }
};
