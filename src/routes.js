// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Employees from "views/Employees";
import Tickets from "views/Tickets";

const dashboardRoutes = [
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
    {
        path: "/role-management-list",
        name: "Role Management List",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Tickets,
        layout: ""
    },
    {
        path: "/tickets",
        name: "Complaints",
        rtlName: "قائمة الجدول",
        icon: "content_paste",
        component: Tickets,
        layout: ""
    },
    // {
    //     path: "/rescheduletickets",
    //     name: "Reschedule-Tickets",
    //     rtlName: "قائمة الجدول",
    //     icon: "content_paste",
    //     component: Tickets,
    //     layout: ""
    // },
];

export default dashboardRoutes;
