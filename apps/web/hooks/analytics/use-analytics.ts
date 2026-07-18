import { trpc } from "@/trpc/client";

export const useFormStats = (formId: string) => {
  const { data, error, isLoading } = trpc.analytics.getFormStats.useQuery({ formId });

  return {
    data,
    error,
    isLoading,
  };
};

export const useFormSubmissionsOverTime = (formId: string, days: number) => {
  const { data, error, isLoading } = trpc.analytics.getFormSubmissionsOverTime.useQuery({
    formId,
    days,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useDashboardStats = () => {
  const { data, error, isLoading } = trpc.analytics.getDashboardStats.useQuery();

  return {
    data,
    error,
    isLoading,
  };
};
