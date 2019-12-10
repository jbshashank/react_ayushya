import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Icon, IconButton } from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import CardActions from '@material-ui/core/CardActions';
import { EMPLOYEE_KEY, FILE_URL } from "../../utils/config";
import { withRouter } from "react-router";

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
        height: 140,
        borderRadius: "6px 6px 0px 0px"
    },

};

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        }
    }

    // update clients
    handleOnEdit = (id) => {
        localStorage.setItem(EMPLOYEE_KEY.EDIT_EMPLOYEE, id);
        this.props.history.push('/employeesedit/' + id);
    };

    render() {
        const { classes, Client } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile className="profileCard BusinessClientProfileCard">
                            <CardBody profile className="customCardBody">
                                <h4 className="customTitle">{Client.clientName}</h4>
                                <h5 className="customSubtitle">{Client.state}</h5>
                            </CardBody>
                            <CardActions>
                                <IconButton className="editIcon" onClick={() => this.props.history.push(`businessclients-edit/${Client.clientId}`)}>
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

export default withStyles(styles)(withRouter(ClientList));
