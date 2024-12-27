import axiosInstance from "@/services/axios-instance";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FinancialRecord } from "@/pages/dashboard/columns";

export const useFinancialRecordsHook = (userId?: string, id?: string) => {
  const queryClient = useQueryClient();

  // Fetch all financial records
  const { data: records, isLoading: isLoadingAll } = useQuery({
    queryKey: ["records"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/getAllByUserID/${userId}`);
        return response.data;
      } catch (err) {
        handleError("Error fetching all records.", err as AxiosError);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId && !id,
  });

  // Fetch a single financial record
  const { data: record, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["record", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/getRecordByUserID/${userId}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single record.", err as AxiosError);
      }
    },
    enabled: !!userId && !!id,
  });

  // Add new record
  const { mutate: addRecord } = useMutation({
    mutationFn: async (data: FinancialRecord) => {
      try {
        const response = await axiosInstance.post("/", data);
        return response.data;
      } catch (err) {
        handleError("Error adding record.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  // Update record
  const { mutate: updateRecord } = useMutation({
    mutationFn: async (data: FinancialRecord) => {
      try {
        const response = await axiosInstance.put(`/${id}`, data);
        return response.data;
      } catch (err) {
        handleError("Error updating record.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  // Delete record
  const { mutate: deleteRecord } = useMutation({
    mutationFn: async (id?: string) => {
      try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
      } catch (err) {
        handleError("Error deleting record.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["records"] });
    },
  });

  // Handle errors
  const handleError = (message: string, err: unknown) => {
    if (axios.isAxiosError(err)) {
      console.error(message, err.response?.data || err.message);
    } else {
      console.error(message, err);
    }
  };

  return {
    records,
    record,
    isLoading: id ? isLoadingSingle : isLoadingAll,
    addRecord,
    updateRecord,
    deleteRecord,
  };
};
