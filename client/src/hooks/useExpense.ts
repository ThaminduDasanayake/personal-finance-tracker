import axiosInstance from "@/services/axios-instance";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Expense } from "@/pages/expense/columns";

export const useExpense = (userId?: string, id?: string) => {
  const queryClient = useQueryClient();

  // Fetch all expenses
  const { data: expenses, isLoading: isLoadingAll } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/getExpenses/${userId}`);
        return response.data;
      } catch (err) {
        handleError("Error fetching all expenses.", err as AxiosError);
      }
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!userId && !id,
  });

  // Fetch a single expense
  const { data: expense, isLoading: isLoadingSingle } = useQuery({
    queryKey: ["expense", id],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          `/getSingleExpense/${userId}/${id}`
        );
        return response.data;
      } catch (err) {
        handleError("Error fetching single expense.", err as AxiosError);
      }
    },
    enabled: !!userId && !!id,
  });

  // Add new expense
  const { mutate: addExpense } = useMutation({
    mutationFn: async (data: Expense) => {
      try {
        const response = await axiosInstance.post("/addExpense", data);
        return response.data;
      } catch (err) {
        handleError("Error adding expense.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  // Update expense
  const { mutate: updateExpense } = useMutation({
    mutationFn: async (data: Expense) => {
      try {
        const response = await axiosInstance.put(`/updateExpense/${id}`, data);
        return response.data;
      } catch (err) {
        handleError("Error updating expense.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  // Delete expense
  const { mutate: deleteExpense } = useMutation({
    mutationFn: async (id?: string) => {
      try {
        const response = await axiosInstance.delete(`/deleteExpense/${id}`);
        return response.data;
      } catch (err) {
        handleError("Error deleting expense.", err as AxiosError);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
    expenses,
    expense,
    isLoading: id ? isLoadingSingle : isLoadingAll,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
