import { UseFormRegister } from "react-hook-form";
import { NewsArticle } from "../../../../../types";

type FormDateInputProps = {
  label: string;
  name: keyof NewsArticle;
  register: UseFormRegister<NewsArticle>;
};

export const FormDateInput = ({
  label,
  name,
  register,
}: FormDateInputProps) => (
  <>
    <label className="block mb-2">{label}:</label>
    <input
      {...register(name)}
      type="date"
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
  </>
);
