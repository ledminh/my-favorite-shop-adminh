import { useState } from "react";

import { AddNewCategoryResponse } from "@/types";

import { OnSubmitProps } from "../Category";

export default function useNewCatModal() {
  const onAdd = ({ name, description, image }: OnSubmitProps) => {
    addNewCategory(
      {
        name,
        description,
        image: image as File,
      },
      (res) => {
        if (res.errorMessage) {
          throw new Error(res.errorMessage);
        }

        console.log(res);
      }
    );
  };

  const submitButton = {
    text: "Add",
    className: "bg-white text-blue-950 hover:bg-blue-950 hover:text-white",
    disabledClassName: "bg-gray-300 text-gray-500 cursor-not-allowed",
  };

  return {
    submitButton,
    onAdd,
  };
}

/*******************************
 * Utils
 */

type AddNewCategory = (
  category: {
    name: string;
    description: string;
    image: File;
  },
  cb: (res: AddNewCategoryResponse) => void
) => void;

const addNewCategory: AddNewCategory = (category, cb) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("image", category.image);

  fetch("/api/categories?action=add", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => cb(res));
};
