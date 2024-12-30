import { DataTable } from "@/components/data-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useFinancialRecords } from "@/contexts/financial-record-context";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getColumns } from "./columns";
import { useIncome } from "@/hooks/useIncome";

export const FinancialRecordList = () => {
  const { userId } = useFinancialRecords();

  const { incomes, isLoading, deleteIncome } = useIncome(userId, "");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleDelete = (id?: string) => {
    setRecordToDelete(id ?? null); // Set the record to delete
    setDialogOpen(true); // Open the dialog
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      deleteIncome(recordToDelete); // Perform the deletion
      setRecordToDelete(null); // Reset state
    }
    setDialogOpen(false); // Close the dialog
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  const columns = getColumns(handleDelete);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
        <Link to="/add" className={buttonVariants({ variant: "default" })}>
          Add New Record
        </Link>
      </div>
      <DataTable data={incomes ?? []} columns={columns} />

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
