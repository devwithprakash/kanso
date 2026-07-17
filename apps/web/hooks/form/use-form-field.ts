import { trpc } from "@/trpc/client";
import { Field } from "@/types/form";

export const useSyncFormFields = () => {
  const utils = trpc.useUtils();

  const syncFieldsMutation = trpc.formField.sync.useMutation({
    onSuccess: (data) => {
      utils.formField.invalidate();
    },

    onError: (err) => {
      console.error("Failed to save form configuration:", err.message);
    },
  });

  const submitFormFieldData = async (fieldsData: Field[]) => {
    await syncFieldsMutation.mutateAsync(fieldsData);
  };

  return {
    submitFormFieldData,
  };
};
