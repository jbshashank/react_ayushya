// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import ListIcon from "@material-ui/icons/List";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Employees from "views/Employees";
import Tickets from "views/Tickets";
import ClientList from "views/BusinessClientsList";
import ReportJob from "views/Reports/ReportJob.jsx";
import ReportInvoice from "views/Reports/ReportInvoice.jsx";
import ReportEstimate from "views/Reports/ReportEstimate.jsx";
import Report from "views/Reports/Reports.jsx";
const dashboardRoutes = [
  // {
  //     path: "/",
  //     name: "Dashboard",
  //     rtlName: "لوحة القيادة",
  //     icon: DashboardIcon,
  //     component: DashboardPage,
  //     layout: ""
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: DashboardIcon,
  //   component: DashboardPage,
  //   layout: ""
  // },
  {
    path: "/employees",
    name: "Employees",
    rtlName: "قائمة الجدول",
    icon: GroupIcon,
    component: Employees,
    layout: ""
  },
  {
    path: "/businessclientlist",
    name: "Clients",
    rtlName: "قائمة الجدول",
    icon: BusinessIcon,
    component: ClientList,
    layout: ""
  },
  {
    path: "/tickets",
    name: "Complaints",
    rtlName: "قائمة الجدول",
    icon: ListIcon,
    component: Tickets,
    layout: ""
  },
  {
    path: "/jobs",
    name: "Jobs",
    rtlName: "قائمة الجدول",
    icon: WorkOutlineIcon,
    component: ReportJob,
    layout: ""
  },
  {
    path: "/invoices",
    name: "Invoices",
    rtlName: "قائمة الجدول",
    icon: ReceiptOutlinedIcon,
    component: ReportInvoice,
    layout: ""
  },
  {
    path: "/estimates",
    name: "Estimates",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ReportEstimate,
    layout: ""
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Report,
    layout: ""
  }
];

export default dashboardRoutes;
