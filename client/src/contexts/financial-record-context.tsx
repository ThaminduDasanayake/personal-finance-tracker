import { useFinancialRecordsHook } from "@/hooks/useFinancialRecordsHook";
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext } from "react";

interface FinancialRecord {
  _id?: string;
  userId: string;
  description: string;
  amount: number;
  type: string;
  date: Date;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordsContextType {
  userId: string;
  records: FinancialRecord[] | undefined;
  isLoading: boolean;
  addRecord: (record: FinancialRecord) => void;
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
>(undefined);

export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [records, setRecords] = useState<FinancialRecord[]>([]);
  // const [record, setRecord] = useState<FinancialRecord | null>(null);

  const { user } = useUser();

  const userId = user?.id ?? "";

  const { records, isLoading, addRecord } = useFinancialRecordsHook(userId, "");

  return (
    <FinancialRecordsContext.Provider
      value={{ userId, records, isLoading, addRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
};
