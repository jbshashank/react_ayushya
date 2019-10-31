// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Employees from "views/Employees";
import Tickets from "views/Tickets";
import Reportpage from "views/Reports/Reports.jsx";
import ReportInvoice from "views/Reports/ReportInvoice.jsx";
import ReportEstimate from "views/Reports/ReportEstimate.jsx";
const dashboardRoutes = [
    // {
    //     path: "/",
    //     name: "Dashboard",
    //     rtlName: "لوحة القيادة",
    //     icon: DashboardIcon,
    //     component: DashboardPage,
    //     layout: ""
    // },
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: DashboardIcon,
        component: DashboardPage,
        layout: ""
    },
    {
        path: "/employees",
        name: "Employees",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Employees,
        layout: ""
    },
    {
        path: "/businessclientlist",
        name: "Business Client",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Tickets,
        layout: ""
    },
    // {
    //     path: "/role-management-list",
    //     name: "Role Management List",
    //     rtlName: "قائمة الجدول",
    //     icon: "content_paste",
    //     component: Tickets,
    //     layout: ""
    // },
    {
        path: "/tickets",
        name: "Complaints",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Tickets,
        layout: ""
    },
    {
        path: "/reports",
        name: "Report Job",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Reportpage,
        layout: ""
    },
    {
        path: "/reportInvoice",
        name: "Report Invoice",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: ReportInvoice,
        layout: ""
    },
    {
        path: "/reportEstimate",
        name: "Report Estimate",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: ReportEstimate,
        layout: ""
    },

];

export default dashboardRoutes;
