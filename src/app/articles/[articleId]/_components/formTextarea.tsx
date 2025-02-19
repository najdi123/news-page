type FormTextareaProps = {
  label: string;
  name: string;
  register: any;
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
