import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { Icon, IconButton, Button } from "@material-ui/core";
import { DatePicker } from "material-ui-pickers";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import "../../index.js";
import moment from "moment";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      city: "",
      visitDate: null,
      sortField: "",
      sortOrder: "asc"
    };
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    // table columns
    this.columns = [
      { key: "visitDate", label: "Visit Date" },
      { key: "description", label: "Complaint Description" },
      { key: "address ", label: "Address " },
      { key: "userId", label: "Service engineer" },
      { key: "actions", label: "Action" }
    ];

    this.reschedulecolumns = [
      { key: "ticketId", label: "Ticket Id", width: 150 },
      { key: "city", label: "City", width: 150 },
      { key: "customerName", label: "Customer Name", width: 150 },
      { key: "visitDate", label: "Visit date", width: 150 },
      { key: "visitTime", label: "Visit Time", width: 150 },
      { key: "actions", label: "Actions", width: 150 }
    ];
  }

  handlePreviousPageClick() {
    var currentPage = this.state.page;
    this.setState({
      page: currentPage - 1
    });
  }

  handleNextPageClick() {
    var currentPage = this.state.page;
    this.setState({
      page: currentPage + 1
    });
  }
  redirectToRescheduleTickets = ticketId => {
    this.props.history.push(`/rescheduletickets-edit/${ticketId}`);
  };

  createSortHandler = (e, row) => {
    this.props.resetTicketsPagination();
    const { sortOrder, sortField, visitDate, city } = this.state;
    const isDesc = sortField === row.key && sortOrder === "desc";
    this.setState({
      page: 0,
      sortField: row.key,
      sortOrder: isDesc ? "asc" : "desc"
    });

    // payload
    const payload = {
      isFilter: visitDate || city,
      name: visitDate ? "visitDate" : city ? "city" : "",
      value: visitDate ? visitDate : city ? city : "",
      page: 0,
      rowsPerPage: this.state.rowsPerPage,
      sortField: row.key,
      sortOrder: isDesc ? "asc" : "desc"
    };

    this.props.fetchTicketsWatcher(payload);
  };

  componentDidMount() {
    // fetch all tickets
    this.props.fetchTicketsWatcher();
  }

  handleBulkFileUpload = e => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      // create tickets
      this.props.createBulkTicketsWatcher(formData);
    }
  };
  handleChangePage = (event, page) => {
    const { currentPage } = this.state;
    console.log("on Page changes:::::::", event, page);
    this.setState({ page });
    if (page < this.state.page) return;
    this.props.fetchTicketsWatcher({
      page,
      rowsPerPage: this.state.rowsPerPage
    });
  };

  handleChangeRowsPerPage = event => {
    console.log("event.target.value of rows per page", event.target.value);
    this.props.resetTicketsPagination();
    this.setState({ page: 0, rowsPerPage: event.target.value });
    this.props.fetchTicketsWatcher({
      page: 0,
      rowsPerPage: event.target.value
    });
  };

  //  fucntion to reset pagination
  handleChange = (name, value) => {
    this.props.resetTicketsPagination();
    if (name == "visitDate") {
      var x = new Date(value);
      x.setUTCHours(0, 0, 0, 0);
      value = new Date(x).toISOString();
    }
    this.setState({ page: 0, [name]: value });
    const payload = {
      isFilter: !!value,
      name,
      value,
      page: 0,
      rowsPerPage: this.state.rowsPerPage
    };
    this.props.fetchTicketsWatcher(payload);
  };

  // combine address 1 and 2
  address12Formation = row => {
    return `${row.customerDataModel.address1}
                ${row.customerDataModel.address2}`;
  };
  streetFormation = row => {
    return `${row.customerDataModel.street}`;
  };
  // combine city, state and pin code
  addressFormation = row => {
    return `${row.customerDataModel.state}
        ${row.customerDataModel.city}
        ${row.customerDataModel.pinCode}`;
  };
  //combine email and phone number
  contactFormation = row => {
    return `${row.customerDataModel.contactNumber}
                ${row.customerDataModel.email}`;
  };

  render() {
    const { classes, totalElements, tickets } = this.props;
    const { page, rowsPerPage, sortField, sortOrder } = this.state;
    const isRescheduleTicketsPage =
      this.props.match.path === "/rescheduletickets";
    let searchColumns;
    const token =
      JSON.parse(localStorage.getItem("roles") == "Service Engineer") ||
      JSON.parse(localStorage.getItem("roles") == "Manager") ||
      JSON.parse(localStorage.getItem("roles") == "Admin");
    if (isRescheduleTicketsPage) {
      searchColumns = (
        <>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              name="ticketId"
              label="Ticket Id"
              className={classes.filterItem}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <TextField
              name=" customerName"
              label=" Customer Name"
              className={classes.filterItem}
            />
          </GridItem>
        </>
      );
    } else {
      searchColumns = (
        <GridItem xs={12} sm={12} md={4}>
          <DatePicker
            name="visitDate"
            label="Visit Date"
            clearable
            value={this.state.visitDate}
            className={classes.filterItem}
            format="DD-MM-YYYY"
            onChange={value => this.handleChange("visitDate", value)}
          />
        </GridItem>
      );
    }
    return (
      <div>
        {token ? (
          <div>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        name="city"
                        label="City Name"
                        className={classes.filterItem}
                        onChange={e =>
                          this.handleChange(e.target.name, e.target.value)
                        }
                      />
                    </GridItem>
                    {searchColumns}
                    <GridItem xs={12} sm={12} md={4}>
                      {!isRescheduleTicketsPage && (
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="bulk-upload-btn-wrapper">
                            {/* <InputLabel className="btn" style={{ marginTop: "20px" }}>
                                        Upload Bulk Tickets
                                    </InputLabel>
                                    <input accept=".xls,.xlsx,.xlsm,.xltx,.xltm" type="file" name="myfile" onChange={this.handleBulkFileUpload} /> */}
                            <Button variant="contained" color="primary">
                              Upload Bulk Complaints
                              <input
                                accept=".xls,.xlsx,.xlsm,.xltx,.xltm"
                                type="file"
                                name="myfile"
                                onChange={this.handleBulkFileUpload}
                              />
                            </Button>
                          </div>
                        </GridItem>
                      )}
                    </GridItem>
                  </GridContainer>
                </GridItem>
                <Card style={{ margin: "15px 20px", padding: "15px 20px" }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer alignItems="flex-end">
                      {/* <GridItem xs={12} sm={12} md={12}> */}
                      <Paper
                        className={classes.root}
                        style={{ marginTop: "0" }}
                      >
                        <div className={classes.tableWrapper}>
                          <Table className={classes.table}>
                            <TableHead
                              style={{
                                background:
                                  "linear-gradient(60deg, #3153a5, #3153a5)"
                              }}
                            >
                              <TableRow>
                                {!isRescheduleTicketsPage
                                  ? this.columns.map(column => (
                                      <TableCell
                                        className="ticketTableheader"
                                        style={{
                                          fontSize: 14,
                                          color: "#fff",
                                          width: column.width
                                        }}
                                        key={column.key}
                                      >
                                        {column.key === "city" ||
                                        column.key === "visitDate" ? (
                                          <TableSortLabel
                                            active={sortField === column.key}
                                            direction={sortOrder}
                                            onClick={e =>
                                              this.createSortHandler(e, column)
                                            }
                                          >
                                            {column.label}
                                          </TableSortLabel>
                                        ) : (
                                          column.label
                                        )}
                                      </TableCell>
                                    ))
                                  : this.reschedulecolumns.map(column => (
                                      <TableCell
                                        style={{
                                          fontSize: 16,
                                          color: "#fff",
                                          width: column.width
                                        }}
                                        key={column.key}
                                      >
                                        {column.key === "city" ||
                                        column.key === "visitDate" ? (
                                          <TableSortLabel
                                            active={sortField === column.key}
                                            direction={sortOrder}
                                            onClick={e =>
                                              this.createSortHandler(e, column)
                                            }
                                          >
                                            {column.label}
                                          </TableSortLabel>
                                        ) : (
                                          column.label
                                        )}
                                      </TableCell>
                                    ))}
                                }
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tickets
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                  if (!isRescheduleTicketsPage) {
                                    return (
                                      // <TableRow>
                                      <TableRow key={row.ticketId}>
                                        <TableCell
                                          style={{ width: "20%", padding: 15 }}
                                        >
                                          {moment(row.visitDate).format(
                                            "DD-MM-YYYY"
                                          )}
                                        </TableCell>
                                        <TableCell
                                          style={{ width: "25%", padding: 15 }}
                                        >
                                          <div style={{}}>
                                            {row.description}
                                          </div>
                                        </TableCell>
                                        <TableCell
                                          style={{ width: "30%", padding: 15 }}
                                        >
                                          <div>
                                            {this.address12Formation(row)}
                                          </div>
                                          <div>{this.streetFormation(row)}</div>
                                          <div>
                                            {this.addressFormation(row)}
                                          </div>
                                          <div style={{}}>
                                            {this.contactFormation(row)}
                                          </div>
                                        </TableCell>
                                        <TableCell
                                          style={{ width: "20%", padding: 15 }}
                                        >
                                          {" "}
                                          <div style={{ paddingLeft: 50 }}>
                                            {row.userId}
                                          </div>
                                        </TableCell>
                                        <TableCell
                                          style={{ width: "5%", padding: 15 }}
                                        >
                                          <IconButton
                                            href={`/ticketsedit/${
                                              row.ticketId
                                            }`}
                                          >
                                            <Icon>edit</Icon>
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                  // else {
                                  //     return (
                                  //         // <TableRow key={row.ticketId}>
                                  //         //     <TableCell style={{ padding: 15 }}>{row.ticketId}</TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}></TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}><div style={{ width: 150 }}>{row.city}</div></TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}>
                                  //         //         <div style={{ width: 150 }}>
                                  //         //             {row.name}
                                  //         //         </div>
                                  //         //     </TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}> <div style={{ width: 100, paddingLeft: 50 }}>{moment(row.visitDate).format("DD-MM-YYYY")}</div></TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}> <div style={{ width: 100, paddingLeft: 50 }}>{moment(row.visitTime).format("HH:MM:SS")}</div></TableCell>
                                  //         //     <TableCell style={{ padding: 15 }}>
                                  //         //         <IconButton onClick={() => this.redirectToRescheduleTickets(row.ticketId)}>
                                  //         //             {/* <IconButton onClick={() => this.redirectToRescheduleTickets()}> */}
                                  //         //             <Icon>edit</Icon>
                                  //         //         </IconButton>
                                  //         //     </TableCell>
                                  //         // </TableRow>
                                  //         <div></div>
                                  //     )
                                  // }
                                })}
                            </TableBody>

                            <TableFooter>
                              <TableRow>
                                <TablePagination
                                  className="customPagination"
                                  rowsPerPageOptions={[10, 25, 50, 99]}
                                  colSpan={5}
                                  count={totalElements}
                                  rowsPerPage={rowsPerPage}
                                  page={this.state.page}
                                  backIconButtonProps={{
                                    "aria-label": "Previous Page",
                                    onClick: this.handlePreviousPageClick
                                  }}
                                  nextIconButtonProps={{
                                    "aria-label": "Next Page",
                                    onClick: this.handleNextPageClick
                                  }}
                                  SelectProps={{ native: true }}
                                  onChangePage={this.handleChangePage}
                                  onChangeRowsPerPage={
                                    this.handleChangeRowsPerPage
                                  }
                                />
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </div>
                      </Paper>
                      {!isRescheduleTicketsPage && (
                        <Fab
                          color="primary"
                          aria-label="Add"
                          href="/ticketsadd"
                          className="addEmployee"
                        >
                          <AddIcon />
                        </Fab>
                      )}
                      {/* </GridItem> */}
                    </GridContainer>
                  </GridItem>
                </Card>
              </GridContainer>
            </MuiPickersUtilsProvider>
          </div>
        ) : (
          "Dear User, unfortunately you do not have access to the Employee Page. Please contact your administartor."
        )}
      </div>
    );
  }
}

export default Tickets;
