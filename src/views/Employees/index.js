import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {fetchEmployeesWatcher, deleteEmployeesWatcher} from "../../store/actions";

import Employees from './Employees.Component';
import styles from './styles';

const mapStateToProps = state => {
    const {employees} = state.employees;
    return {
        employees
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({fetchEmployeesWatcher, deleteEmployeesWatcher}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Employees));