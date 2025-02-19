import React from "react";

type FormInputProps = {
  label: string;
  name: string;
  register: any;
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
