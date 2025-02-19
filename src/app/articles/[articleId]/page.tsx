"use client";
import { useParams } from "next/navigation";
import { BackButton } from "./_components/backButton";
import { FormInput } from "./_components/formInput";
import { FormTextarea } from "./_components/formTextarea";
import { FormDateInput } from "./_components/formDateInput";
import { useArticleForm } from "./_components/useArticleForm";

export default function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const { register, handleSubmit, onSubmit, selected } =
    useArticleForm(articleId);

  return (
    <div className="max-w-3xl my-14 mx-auto p-6 border border-gray-300 rounded shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
        <BackButton />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Title" name="title" register={register} />
        <FormInput label="Author" name="author" register={register} />
        <FormTextarea
          label="Description"
          name="description"
          register={register}
        />
        <FormDateInput
          label="Published Date"
          name="published"
          register={register}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {selected ? "Save Changes" : "Save & Add to Selected"}
        </button>
      </form>
    </div>
  );
}
