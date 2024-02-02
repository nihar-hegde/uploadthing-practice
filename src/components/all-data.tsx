import { getAllData } from "@/actions/input-action";
import React from "react";

export const AllData = async () => {
  const allData = await getAllData();
  return (
    <div>
      <ul>{allData?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
};
