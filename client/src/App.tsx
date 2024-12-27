import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { FinancialRecordEdit } from "./pages/financial-record-form/financial-record-edit";
import { FinancialRecordAdd } from "./pages/financial-record-form/financial-record-add";

function App() {
  return (
    <Router>
      <div>
        <FinancialRecordsProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<FinancialRecordAdd />} />
            <Route path="/edit/:id" element={<FinancialRecordEdit />} />
          </Routes>
        </FinancialRecordsProvider>

        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
