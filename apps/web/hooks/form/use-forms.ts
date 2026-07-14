import { trpc } from "@/trpc/client";

import type { FormRecord, FormFieldData, FormFieldOptionData } from "@/types/form";
import { ThemeKey } from "@/types/theme";

type Visibility = "public" | "unlisted" | "private";

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const createFormMutation = trpc.form.create.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },
    onError: (err) => {
      console.error("Failed to create form:", err.message);
    },
  });

  const submitForm = async (title: string, description: string, formFieldData: FormFieldData[]) => {
    return await createFormMutation.mutateAsync({
      title,
      description,
      formFieldData,
    });
  };

  return {
    submitForm,
    isLoading: createFormMutation.isPending,
  };
};

export const useGetForm = (
  formId: string,
): {
  form: FormRecord | undefined;
  isLoading: boolean;
  error: any;
  refetch: () => void;
} => {
  const { data, isLoading, error, refetch } = trpc.form.getById.useQuery({ formId });

  return {
    form: data as FormRecord | undefined,
    isLoading,
    error,
    refetch: refetch as any,
  };
};

export const useGetAllForms = () => {
  const { data, isLoading, error } = trpc.form.getAll.useQuery();

  return {
    data,
    isLoading,
    error,
  };
};

export const useUpdateForm = () => {
  const utils = trpc.useUtils();

  const updateFormMutation = trpc.form.update.useMutation({
    onSuccess: () => {
      utils.form.invalidate();
    },

    onError: (error) => {
      console.error("Failed to update form:", error.message);
    },
  });

  const updateForm = async (
    formId: string,
    title: string,
    description: string,
    theme: ThemeKey,
    visibility: Visibility,
    formFieldData: FormFieldData[],
  ) => {
    return await updateFormMutation.mutateAsync({
      formId,
      title,
      description,
      visibility,
      theme,
      formFieldData,
    });
  };
  return {
    updateForm,
    isSubmitting: updateFormMutation.isPending
  };
};

export const useDeleteForm = () => {
  const utils = trpc.useUtils();

  const deleteMutation = trpc.form.delete.useMutation({
    onSuccess: (data) => {
      utils.form.invalidate();
    },
    onError: (error) => {
      console.error("Failed to delete form:", error.message);
    },
  });

  return {
    deleteMutation,
  };
};

export const useGetFormBySlug = (slug: string) => {
  const { data, error, isLoading } = trpc.form.getBySlug.useQuery({ slug });

  return {
    data,
    error,
    isLoading,
  };
};

export const useGetAllPublicForms = () => {
  const { data, error, isLoading } = trpc.form.listPublic.useQuery();

  return {
    data,
    error,
    isLoading,
  };
};
