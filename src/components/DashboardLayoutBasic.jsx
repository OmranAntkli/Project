import { Routes, Route } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import HomePage from "../Pages/HomePage";
import AddProblem from "../Pages/AddProblem";
import ListIssuePage from "../Pages/ListIssuePage";
import { useEffect } from "react";

const NAVIGATION = [
  { kind: "header", title: "Main items" },
  { segment: "dashboardLayoutBasic", title: "Home", icon: <DashboardIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  { segment: "listIssuePage", title: "View Issues", icon: <LayersIcon /> },
];

export default function DashboardLayoutBasic() {
  useEffect(() => {
    const titleElement = document.querySelector(".MuiTypography-h6");
    if (titleElement) {
      titleElement.textContent = "Issue Tracker";
    }
  }, []);
  return (
    <AppProvider navigation={NAVIGATION}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="addProblem" element={<AddProblem />} />
            <Route path="listIssuePage" element={<ListIssuePage />} />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
