import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import "../../index.js";
import axios from 'axios';
import "react-table/react-table.css";
import './style.css';
import { CSVLink } from "react-csv";

import ReactTable from 'react-table';
import { BASE_URL_REPORT_JOB } from "../../utils/config.js";

// table columns
const columns = [
    {
        Header: 'Job Code',
        accessor: 'jobId',
    },
    {
        Header: 'Status',
        accessor: 'statusId',
    },
    {
        Header: 'Start Date',
        accessor: 'startDate',
    },
    {
        Header: 'Actual Start Date',
        accessor: 'actualStartDate',
    },
    {
        Header: 'Actual End Date',
        accessor: 'actualEndDate',
    },
    {
        Header: 'Engineer',
        accessor: 'userId',
    },
    {
        Header: 'Last Updated On',
        accessor: 'lastUpdatedOn',
    },
    {
        Header: 'Customer Name',
        accessor: 'customerName',
    },
];
export default class ReportJob extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [{
                jobId: '',
                statusId: '',
                startDate: '',
                actualEndDate: '',
                userId: '',
                lastUpdatedOn: '',
                customerName: ''
            }],

        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(e) {
        // get all jobs
        axios.get(`${BASE_URL_REPORT_JOB}getAllJob`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ tableData: data.content });
            });
    }
    // called on typing the serch text
    handleChange(e) {
        const searchValue = e.target.value;
        console.log('jobId is:::' + e.target.value)
        axios.get(`${BASE_URL_REPORT_JOB}jobSearch?Search=${searchValue}`)
            .then(response => response.data)
            .then((data) => {
                this.setState({ tableData: data.content });
            });
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.tableData;
            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.toString().toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.tableData;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            tableData: newList
        });
    }
    render() {
        const { tableData } = this.state;
        return (
            <div>
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search by Job, Status, Engineer or Customer" />
                <Card>
                    <CardBody>

                        <ReactTable
                            data={tableData}
                            columns={columns}
                            showPagination={true}
                        />
                    </CardBody>
                    <div className="csv-link">
                        <CSVLink
                            data={tableData}
                            filename={"jobs.csv"}
                            className="btn btn-primary"
                            target="_blank"
                        >
                            Download the report in CSV format
                    </CSVLink>
                    </div>
                </Card>
                {/* ))} */}
            </div>
        );
    }
}


