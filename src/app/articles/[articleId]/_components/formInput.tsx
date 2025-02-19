import React from "react";
import { NewsArticle } from "../../../../../types";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: keyof NewsArticle;
  register: UseFormRegister<NewsArticle>;
};

export const FormInput = ({ label, name, register }: FormInputProps) => (
  <>
    <label className="block mb-2">{label}:</label>
    <input
      {...register(name)}
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
  </>
);
