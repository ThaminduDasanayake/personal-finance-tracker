import axiosInstance from "@/services/axios-instance";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Income } from "@/pages/income/columns";

export const useIncome = (userId?: string, id?: string) => {
  const queryClient = useQueryClient();

  // Fetch all incomes
  const { data: incomes, isLoading: isLoadingAll } = useQuery({
    queryKey: ["incomes"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/getIncomes/${userId}`);
        return response.data;
      } catch (err) {
        handleError("Error fetching all incomes.", err as AxiosError);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId && !id,
  });

  // Fetch a single income
  const { data: income, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["income", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/getSingleIncome/${userId}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single income.", err as AxiosError);
      }
    },
    enabled: !!userId && !!id,
  });

  // Add new income
  const { mutate: addIncome } = useMutation({
    mutationFn: async (data: Income) => {
      try {
        const response = await axiosInstance.post("/addIncome", data);
        return response.data;
      } catch (err) {
        handleError("Error adding income.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });

  // Update income
  const { mutate: updateIncome } = useMutation({
    mutationFn: async (data: Income) => {
      try {
        const response = await axiosInstance.put(`/updateIncome/${id}`, data);
        return response.data;
      } catch (err) {
        handleError("Error updating income.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });

  // Delete income
  const { mutate: deleteIncome } = useMutation({
    mutationFn: async (id?: string) => {
      try {
        const response = await axiosInstance.delete(`/deleteIncome/${id}`);
        return response.data;
      } catch (err) {
        handleError("Error deleting income.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
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
    incomes,
    income,
    isLoading: id ? isLoadingSingle : isLoadingAll,
    addIncome,
    updateIncome,
    deleteIncome,
  };
};
