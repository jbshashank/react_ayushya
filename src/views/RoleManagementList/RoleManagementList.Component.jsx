import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import {Icon, IconButton} from "@material-ui/core";
import {DatePicker} from "material-ui-pickers";
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import InputLabel from "@material-ui/core/InputLabel";
// import TableSortLabel from '@material-ui/core/TableSortLabel';

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import {deleteTicketsWatcher} from "../../store/actions";
import CardBody from "../../components/Card/CardBody";
import moment from 'moment';

class RoleManagementList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            city: '',
            visit_date:null,
            sortField: '',
            sortOrder: 'asc'
       };
       this.columns =

       [

           { key: 'role_name', label: 'Role Name', width: 150 },
           { key: 'functionality', label: 'Functionality', width: 450 },
           { key: 'actions', label: 'Actions', width: 150 }
       ];
    }

    componentDidMount() {
        // console.log("inside :componentDidMount:")
        // this.props.fetchTicketsWatcher();
    }
    handleChangePage = (event, page) => {
       
    };

    handleChangeRowsPerPage = event => {
        
    };

  

    handleRemove = (id) => {
       
    };

    handleChange = (name, value) => {
       
    };
   
   
    render() {       
        const {classes, tickets, totalElements} = this.props;
        const {page, rowsPerPage, sortField, sortOrder} = this.state;
        let searchColumns

        
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer alignItems="flex-end">
                            <GridItem xs={12} sm={12} md={12}>
                                <Paper className={classes.root}>
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.table}>
                                            <TableHead style={{background: "linear-gradient(60deg, #354DA2, #354DA2)"}}>
                                                <TableRow>
                                                {this.columns.map((column) =>
                                                        <TableCell
                                                            style={{fontSize: 18, color: "#fff", width:column.width}}
                                                            key={column.key}>
                                                            {column.key === 'city' || column.key === 'visit_date' ?
                                                                <TableSortLabel
                                                                    active={sortField === column.key}
                                                                    direction={sortOrder}
                                                                    onClick={(e) => this.createSortHandler(e, column)}>
                                                                    {column.label}
                                                                </TableSortLabel> :
                                                                column.label
                                                            }
                                                        </TableCell>)}
                                                
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            </TableBody>
                                            {/* <TableFooter>
                                                <TableRow>
                                                    <TablePagination
                                                        rowsPerPageOptions={[10, 25, 50, 99]}
                                                        colSpan={3}
                                                        count={10 }
                                                        rowsPerPage={10}
                                                        page={page}
                                                        SelectProps={{native: true,}}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                        />
                                                </TableRow>
                                            </TableFooter> */}
                                        </Table>
                                    </div>
                                </Paper>
                                 <Fab color="primary" aria-label="Add" href='/role-management' className="addEmployee">
                                    <AddIcon/>
                                </Fab> 
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </MuiPickersUtilsProvider>
        );
    }
}

export default RoleManagementList;