import { UseFormRegister } from "react-hook-form";
import { NewsArticle } from "../../../../../types";

type FormTextareaProps = {
  label: string;
  name: keyof NewsArticle;
  register: UseFormRegister<NewsArticle>;
};

export const FormTextarea = ({ label, name, register }: FormTextareaProps) => (
  <>
    <label className="block mb-2">{label}:</label>
    <textarea
      {...register(name)}
      className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
    />
  </>
);
