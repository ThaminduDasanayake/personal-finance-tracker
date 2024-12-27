import { useFinancialRecords } from "@/contexts/financial-record-context";
import { getColumns } from "./columns";
import { DataTable } from "./data-table";
import { useFinancialRecordsHook } from "@/hooks/useFinancialRecordsHook";
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
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const FinancialRecordList = () => {
  const { userId } = useFinancialRecords();

  const { records, isLoading, deleteRecord } = useFinancialRecordsHook(
    userId,
    ""
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const handleDelete = (id?: string) => {
    setRecordToDelete(id ?? null); // Set the record to delete
    setDialogOpen(true); // Open the dialog
  };

  const confirmDelete = () => {
    if (recordToDelete) {
      deleteRecord(recordToDelete); // Perform the deletion
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
      <Link to="/add" className={buttonVariants({ variant: "default" })}>
        Add New Record
      </Link>
      <DataTable data={records ?? []} columns={columns} />

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              financial record.
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
