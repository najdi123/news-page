type FormDateInputProps = {
  label: string;
  name: string;
  register: any;
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
