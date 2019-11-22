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

const columns = [
    {
        Header: 'Job Code',
        accessor: 'jobCode',
    },
    {
        Header: 'Generated On',
        accessor: 'generatedOn',
    },
    {
        Header: 'Coupon Code',
        accessor: 'couponCode',
    },
    {
        Header: 'Sub Total',
        accessor: 'subTotal',
    },
    {
        Header: 'Grand Total',
        accessor: 'grandTotal',
    },
    {
        Header: 'Paid Status',
        accessor: 'paidStatus',
    },
    {
        Header: 'Requested By',
        accessor: 'requestedBy',
    },
];
export default class ReportInvoice extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [{
                jobCode: '',
                generatedOn: '',
                couponCode: '',
                subTotal: '',
                grandTotal: '',
                paidStatus: '',
                requestedBy: ''
            }],
        };
    }
    componentDidMount() {
        axios.get('http://134.209.147.111:8096/payments/cashreceipt/getAllInvoice')
            .then(response => response.data)
            .then((data) => {
                this.setState({ tableData: data.content })
                console.log(this.state.tableData)
            })
    }
    render() {
        const { tableData } = this.state;
        return (
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
                        filename={"tickets_status.csv"}
                        className="btn btn-primary"
                        target="_blank"
                    >
                        Download the report in CSV format
                    </CSVLink>
                </div>
            </Card>
        );
    }
}


