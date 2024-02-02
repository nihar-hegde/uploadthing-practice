import { Form } from "@/components/forms/form";
import React from "react";

const FormPage = () => {
  return (
    <div className="flex flex-col items-center ">
      <h1 className="flex items-center p-20 justify-center text-2xl font-semibold">
        Form Page
      </h1>
      <Form />
    </div>
  );
};

export default FormPage;
