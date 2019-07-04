/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import {Switch, Route} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

import Navbar from "components/Navbars/Navbar.jsx";
// import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import routes from "routes";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import EmployeeForm from "views/EmployeeForm";
import Tickets from "../views/Tickets";
import TicketsForm from "../views/Tickets/TicketsForm";
import RoleManagementForm from "../views/RoleManagementForm/index";
import RoleManagementList from "../views/RoleManagementList/index";
import BusinessClientsForm from "../views/BusinessClientsForm/";
import BusinessClientList from "../views/BusinessClientsList/"
import Employees from "views/Employees";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import pageLoader from "../store/reducers/page_loader";
import CustomSneakBar from "../components/CustomizedSnackbars/CustomizedSnackbars";

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: image,
            color: "blue",
            hasImage: true,
            fixedClasses: "dropdown show",
            mobileOpen: false
        };
    }

    handleImageClick = image => {
        this.setState({image: image});
    };

    handleColorClick = color => {
        this.setState({color: color});
    };

    handleFixedClick = () => {
        if (this.state.fixedClasses === "dropdown") {
            this.setState({fixedClasses: "dropdown show"});
        } else {
            this.setState({fixedClasses: "dropdown"});
        }
    };

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false});
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, pageLoaderCount, ...rest} = this.props;
        return (
            <div className={classes.wrapper}>
                {pageLoaderCount > 0 && <div className='loader-container'>
                    <div className="loader"/>
                </div>}
                <Sidebar
                    routes={routes}
                    logoText={"AYUSHYA PORTAL"}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Navbar
                        routes={routes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <Switch>
                                <Route
                                    path='/employees'
                                    component={Employees}
                                />
                                <Route
                                    path='/employeesadd'
                                    component={EmployeeForm}
                                />
                                <Route
                                    path='/employeesedit/:id'
                                    component={EmployeeForm}
                                />
                                <Route
                                    path='/role-management'
                                    component={RoleManagementForm}
                                />
                                <Route
                                    path='/role-management-list'
                                    component={RoleManagementList}
                                />
                                <Route
                                    path='/tickets'
                                    component={Tickets}
                                />
                                 <Route
                                    path='/rescheduletickets'
                                    component={Tickets}
                                />
                                <Route
                                    path='/ticketsadd'
                                    component={TicketsForm}
                                />
                                <Route
                                    path='/ticketsedit/:id'
                                    component={TicketsForm}
                                />
                                <Route
                                    path='/rescheduletickets-edit/:id'
                                    component={TicketsForm}
                                />
                                <Route
                                    path='/businessclients'
                                    component={BusinessClientsForm}
                                /> 
                                <Route
                                    path='/businessclientlist'
                                    component={BusinessClientList}
                                />
                                 <Route
                                    path='/businessclients-edit/:id'
                                    component={BusinessClientsForm}
                                />                              
                                <Route
                                    path='/dashboard'
                                    component={DashboardPage}
                                />
                            </Switch>
                        </div>
                    </div>
                    {/* <Footer/> */}
                    <CustomSneakBar />
                </div>
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        pageLoaderCount: state.pageLoader.pageLoaderCount,
    }
};

export default withStyles(dashboardStyle)(connect(mapStateToProps, null)(Admin));
