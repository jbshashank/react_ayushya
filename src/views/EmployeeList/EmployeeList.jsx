import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Icon, IconButton } from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardMedia from '@material-ui/core/CardMedia';
import { BASE_URL_EMPLOYEE } from "../../utils/config";
import CardActions from '@material-ui/core/CardActions';
import axios from "../../utils/axios";
import avatar from "assets/img/faces/marc.jpg";
// import backgroundimg from "assets/img/Ayushya_Logo.png";
import { EMPLOYEE_KEY, FILE_URL } from "../../utils/config";
import { withRouter } from "react-router";
import { isFirstDayOfMonth } from "date-fns";

const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    media: {
        borderRadius: "6px 6px 0px 0px",
        marginTop: "50px",
    },
};

class EmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    }

    handleOnEdit = (userId) => {
        localStorage.setItem(EMPLOYEE_KEY.EDIT_EMPLOYEE, userId);
        // update employee details
        this.props.history.push('/employeesedit/' + userId);
    };

    render() {
        const { classes, employee, userId } = this.props;
        return (
            <div className="employeeList">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile className="profileCard">
                            {/* <CardMedia
                                className={classes.media}
                                title="Contemplative Reptile" />
                            <CardAvatar profile className="customCardAvtar">
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={employee.employeePersonalDetails.uploadDir ? `${FILE_URL}${employee.employeePersonalDetails.uploadDir}` : avatar}
                                        alt="..." />
                                </a>
                            </CardAvatar> */}
                            <CardBody profile className="customCardBody">
                                <h4 className="customTitle">{employee.firstName} {employee.lastName}</h4>
                                <h5 className="customSubtitle">{employee.role}</h5>
                                <h6 className="customSubtitle">{employee.pinCode}</h6>
                                <h6 className="customSubtitle">{employee.phoneNumber}</h6>
                            </CardBody>
                            <CardActions>
                                <IconButton className="editIcon"

                                    onClick={() => this.handleOnEdit(`${employee.userId}`)}
                                >

                                    <Icon>edit</Icon>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(EmployeeList));
