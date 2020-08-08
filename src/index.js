import "./scss/index.scss";
import { Router } from "@core/routes/Router";
import { DashboardPage } from "@/components/pages/DashboardPage";
import { ExcelPage } from "@/components/pages/ExcelPage";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage
});
