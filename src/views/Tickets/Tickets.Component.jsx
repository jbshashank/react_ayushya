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
import {Icon, IconButton, Button} from "@material-ui/core";
// import RaisedButton from 'material-ui/RaisedButton';
import {DatePicker} from "material-ui-pickers";
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import "../../index.js";
import InputLabel from "@material-ui/core/InputLabel";
// import TableSortLabel from '@material-ui/core/TableSortLabel';

import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import {deleteTicketsWatcher} from "../../store/actions";
import CardBody from "../../components/Card/CardBody";
import moment from 'moment';

class Tickets extends Component {

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

                { key: 'visit_date', label: 'Visit Date' },
                { key: 'remarks', label: 'Complaint Description' },
                { key: 'address ', label: 'Address '},
                { key: 'service_engineer_name', label: 'Service engineer' },
                { key: 'actions', label: 'Action'}
            ];


        this.reschedulecolumns =
            [
                { key: 'ticket_id', label: 'Ticket Id', width: 150 },
                { key: 'city', label: 'City', width: 150 },
                { key: 'customer Name', label: 'Customer Name', width: 150 },
                { key: 'visit_date', label: 'Visit date', width: 150 },
                { key: 'visit_time', label: 'Visit Time', width: 150 },
                { key: 'actions', label: 'Actions', width: 150 }
            ]
    }

    redirectToRescheduleTickets=(id)=>{
        this.props.history.push(`/rescheduletickets-edit/${id}`)
    }

    createSortHandler = (e, row) => {
        this.props.resetTicketsPagination();
        const {sortOrder, sortField, visit_date, city} = this.state;
        const isDesc = sortField === row.key && sortOrder === 'desc';
        this.setState({page: 0, sortField: row.key, sortOrder: isDesc ? 'asc' : 'desc'});

        const payload = {
            isFilter: visit_date || city,
            name: visit_date ? 'visit_date' : city ? 'city' : '',
            value: visit_date ? visit_date : city ? city : '',
            page: 0,
            rowsPerPage: this.state.rowsPerPage,
            sortField: row.key,
            sortOrder: isDesc ? 'asc' : 'desc'
        };

        this.props.fetchTicketsWatcher(payload);
    };

    componentDidMount() {
        console.log("inside :componentDidMount:")
        this.props.fetchTicketsWatcher();
    }
    handleBulkFileUpload = (e) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            let formData = new FormData();
            formData.append("file", e.target.files[0]);
            this.props.createBulkTicketsWatcher(formData)
        }
    }
    handleChangePage = (event, page) => {
        console.log("on Page changes", event, page);
        this.setState({page});
        if (page < this.state.page) return;
        this.props.fetchTicketsWatcher({page, rowsPerPage: this.state.rowsPerPage});
    };

    handleChangeRowsPerPage = event => {
        console.log("event.target.value", event.target.value);
        this.props.resetTicketsPagination();
        this.setState({page: 0, rowsPerPage: event.target.value});
        this.props.fetchTicketsWatcher({page: 0, rowsPerPage: event.target.value});
    };

    handleEdit = (id) => {

    };

    handleRemove = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            new Promise((resolve, reject) => {
                this.props.deleteTicketsWatcher({id}, () => {
                    this.props.fetchTicketsWatcher();
                    resolve();
                });
            });
        }
    };

    handleChange = (name, value) => {
        this.props.resetTicketsPagination();
        if(name=="visit_date"){
            // var x = new Date(value);// x is now a date object
            var x = new Date(value);// x is now a date object
            x.setUTCHours(0,0,0,0); 
            value = new Date(x).toISOString();
        }
        this.setState({page: 0, [name]: value});
        const payload = {
            isFilter: !!value,
            name,
            value,
            page: 0,
            rowsPerPage: this.state.rowsPerPage
        };
        this.props.fetchTicketsWatcher(payload)
    };
    address_1_2Formation=(row)=>{
        return `${row.address_1},${row.address_2}`
    }
    streetFormation=(row)=>{
        return `${row.street}`
    }
    addressFormation=(row)=>{
        return`${row.state},${row.city},${row.pin_code}`
    }
    contactFormation=(row)=>{
        return`${row.mobile_number_1}, ${row.email_id}`
    }
   
    render() {       
        const {classes, tickets, totalElements} = this.props;
        const {page, rowsPerPage, sortField, sortOrder} = this.state;
        const isRescheduleTicketsPage = this.props.match.path === "/rescheduletickets"
        let searchColumns

        if (isRescheduleTicketsPage) {
            searchColumns = (
                <><GridItem xs={12} sm={12} md={4}>
                    <TextField
                        name="ticketId"
                        label="Ticket Id"
                        className={classes.filterItem}
                    // onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    />
                </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            name=" CustomerName"
                            label=" Customer Name"
                            className={classes.filterItem}
                        // onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        />
                    </GridItem>

                </>)
        }
        else {
            searchColumns = (<GridItem xs={12} sm={12} md={4}>
                <DatePicker
                    name="visit_date"
                    label="Visit Date"
                    clearable
                    value={this.state.visit_date}
                    className={classes.filterItem}
                    format="DD-MM-YYYY"
                    onChange={(value) => this.handleChange("visit_date", value)} />
            </GridItem>
            )
        }
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                                <TextField
                                    name="city"
                                    label="City Name"
                                    className={classes.filterItem}
                                    onChange={(e) => this.handleChange(e.target.name, e.target.value)}/>
                            </GridItem>
                            {searchColumns}
                            <GridItem xs={12} sm={12} md={4}>
                            {!isRescheduleTicketsPage&&<GridItem xs={12} sm={12} md={12}>
                                <div className="bulk-upload-btn-wrapper">
                                    {/* <InputLabel className="btn" style={{ marginTop: "20px" }}>
                                        Upload Bulk Tickets
                                    </InputLabel>
                                    <input accept=".xls,.xlsx,.xlsm,.xltx,.xltm" type="file" name="myfile" onChange={this.handleBulkFileUpload} /> */}
                                    <Button variant="contained" color="primary">
                                    Upload Bulk Complaints<input accept=".xls,.xlsx,.xlsm,.xltx,.xltm" type="file" name="myfile" onChange={this.handleBulkFileUpload} />
                                    </Button>
                                </div>
                            </GridItem>}
                            </GridItem>
                        </GridContainer>
                        <GridContainer alignItems="flex-end">
                            <GridItem xs={12} sm={12} md={12}>
                                <Paper className={classes.root}>
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.table}>
                                            <TableHead style={{background: "linear-gradient(60deg, #3153a5, #3153a5)"}}>
                                                <TableRow>
                                                    {!isRescheduleTicketsPage?this.columns.map((column) =>
                                                        <TableCell className="ticketTableheader"
                                                            style={{fontSize: 14, color: "#fff", width:column.width}}
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
                                                        </TableCell>
                                                    ):
                                                    this.reschedulecolumns.map((column) =>
                                                        <TableCell
                                                            style={{fontSize: 16, color: "#fff", width:column.width}}
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
                                                        </TableCell>
                                                    )}
                                                    }
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                                                    if (!isRescheduleTicketsPage) {
                                                        return (
                                                            <TableRow key={row._id}>

                                                                <TableCell style={{width: "20%", padding: 15 }}>{moment(row.visit_time).format("DD-MM-YYYY")}</TableCell>
                                                                <TableCell style={{width: "25%", padding: 15 }}><div style={{ }}>{row.remarks}</div></TableCell>
                                                                <TableCell style={{width: "30%", padding: 15 }}>
                                                                    <div>{this.address_1_2Formation(row)}</div>
                                                                    <div>{this.streetFormation(row)}</div>
                                                                    <div>{this.addressFormation(row)}</div>
                                                                    <div style={{}}>{this.contactFormation(row)}</div>
                                                                </TableCell>
                                                                <TableCell style={{width: "20%", padding: 15 }}> <div style={{paddingLeft: 50 }}>{row.tech_name}</div></TableCell>
                                                                <TableCell style={{width: "5%", padding: 15 }}>
                                                                    <IconButton href={`/ticketsedit/${row._id}`}>
                                                                        <Icon>edit</Icon>
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <TableRow key={row._id}>

                                                                <TableCell style={{ padding: 15 }}>{row._id}</TableCell>
                                                                <TableCell style={{ padding: 15 }}><div style={{ width: 150 }}>{row.city}</div></TableCell>
                                                                <TableCell style={{ padding: 15 }}>
                                                                    <div style={{ width: 150 }}>
                                                                        {row.name}
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell style={{ padding: 15 }}> <div style={{ width: 100, paddingLeft: 50 }}>{moment(row.visit_time).format("DD-MM-YYYY")}</div></TableCell>
                                                                <TableCell style={{ padding: 15 }}> <div style={{ width: 100, paddingLeft: 50 }}>{moment(row.visit_time).format("HH:MM")}</div></TableCell>
                                                                <TableCell style={{ padding: 15 }}>
                                                                    <IconButton onClick={() => this.redirectToRescheduleTickets(row._id)}>
                                                                        <Icon>edit</Icon>
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                })}
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TablePagination
                                                        className="customPagination"
                                                        rowsPerPageOptions={[10, 25, 50, 99]}
                                                        colSpan={3}
                                                        count={totalElements}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        SelectProps={{native: true,}}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </div>
                                </Paper>
                                {!isRescheduleTicketsPage&& <Fab color="primary" aria-label="Add" href='/ticketsadd' className="addEmployee">
                                    <AddIcon/>
                                </Fab> }
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </MuiPickersUtilsProvider>
        );
    }
}

export default Tickets;