import { useUser } from "@clerk/clerk-react";
import { FinancialRecordList } from "./financial-record-list";

export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="py-20 px-40">
      <h1>Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordList />
    </div>
  );
};
