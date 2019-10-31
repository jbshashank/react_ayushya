import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    createEmployeesWatcher,
    updateEmployeesWatcher,
    fetchEmployeeByIdWatcher,
    imageUploadWatcher,
    fetchStateWatcher,
    fetchCityWatcher
} from "../../store/actions";
import EmployeeForm from "./EmployeeForm.Component";
import styles from "./styles";

const mapStateToProps = (state) => {
    console.log("Employee Form State ", state);
    const { employee } = state.employees;
    return {
        employee
    };
};
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        createEmployeesWatcher, updateEmployeesWatcher,
        fetchEmployeeByIdWatcher, imageUploadWatcher,
        fetchStateWatcher, fetchCityWatcher
    }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EmployeeForm));