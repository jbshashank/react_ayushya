import React, { Component } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import EmployeeList from "../EmployeeList/EmployeeList";
import TextField from "@material-ui/core/TextField";
import Dashboard from "../Dashboard/Dashboard.jsx";
import axios from '../../utils/axios';
const styles = theme => ({
    userCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userNameContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    userName: {
        fontSize: 18,
        marginLeft: "10px",
        fontWeight: 200
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 26,
    }
});

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            searchTerm: '',
            employees: {}
        }
    }
    // fetch all employees
    componentDidMount() {
        this.fetchEmployees('');
    }

    // fetch based on user search
    fetchEmployees = (userSearch) => {
        this.props.fetchEmployeesWatcher({ userSearch });
    };

    // reset employee search
    resetEmployeesSearch = () => {
        this.setState({
            searchTerm: ""
        }, () => {
            this.fetchEmployees("")
        })
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { employees, classes } = this.props;

        const { searchTerm } = this.state;
        const token = JSON.parse(localStorage.getItem('roles') == "Service Engineer") || JSON.parse(localStorage.getItem('roles') == "Manager") || JSON.parse(localStorage.getItem('roles') == "Admin");
        return (
            <div>
                {token
                    ? <div>
                        <Grid container alignItems="flex-end">
                            <GridItem xs={12} sm={12} md={12}>
                                <Grid container>
                                    <Grid item xs={4} className={classes.searchContainer}>
                                        <TextField
                                            id="searchTerm"
                                            label="Search"
                                            placeholder="Search by First Name, Last Name or Role"
                                            className={classes.textField}
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item className={classes.searchContainer}>
                                        <Button variant="contained" color="primary" style={{ marginTop: '25px', marginLeft: '10px' }}
                                            onClick={() => this.fetchEmployees(searchTerm)}
                                        >
                                            Search
                            </Button>
                                    </Grid>

                                    <Grid item xs={2} className={classes.searchContainer}>
                                        <Button variant="contained" color="primary" style={{ marginTop: '25px', marginLeft: '10px' }}
                                            onClick={this.resetEmployeesSearch}
                                        >
                                            Reset
                            </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={16}>
                                    {employees.map((employee, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={`EMP_${index}`}>
                                            <EmployeeList employee={employee}
                                                fetchEmployeesWatcher={this.props.fetchEmployeesWatcher}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Fab color="primary" aria-label="Add" href='/employeesadd' className="addEmployee">
                                    <AddIcon />
                                </Fab>
                            </GridItem>
                        </Grid>
                    </div> : 'Dear User, unfortunately you do not have access to the Employee Page. Please contact your administartor.'}
            </div>
        );
    }
}

export default withStyles(styles)(Employees);
