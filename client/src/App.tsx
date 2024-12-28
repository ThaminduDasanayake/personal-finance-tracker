import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { FinancialRecordEdit } from "./pages/financial-record-form/financial-record-edit";
import { FinancialRecordAdd } from "./pages/financial-record-form/financial-record-add";
import { Layout } from "./pages/layout";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <FinancialRecordsProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add" element={<FinancialRecordAdd />} />
                    <Route path=":id/edit" element={<FinancialRecordEdit />} />
                  </Route>
                </Routes>
              </FinancialRecordsProvider>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
