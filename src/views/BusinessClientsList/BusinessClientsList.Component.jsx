import React, { Component } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.jsx";
import ClientList from "../BusinessClientsList/ClientList";
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

class BusinessClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
        }
    }

    //fetch business clients
    componentDidMount() {
        this.props.fetchBusinessClientWatcher();

    }
    // on change set values
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { BusinessClientList } = this.props;
        const token = JSON.parse(localStorage.getItem('roles') == "Admin") || JSON.parse(localStorage.getItem('roles') == "Manager");
        return (
            <div>
                {token
                    ?
                    <div>
                        <Grid container alignItems="flex-end">
                            <GridItem xs={12} sm={12} md={12}>

                                <Grid container spacing={16}>
                                    {BusinessClientList.map((Client, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={`EMP_${index}`}>
                                            <ClientList Client={Client} />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Fab color="primary" aria-label="Add" href='/businessclients' className="addEmployee">
                                    <AddIcon />
                                </Fab>
                            </GridItem>
                        </Grid>
                    </div> : 'Dear User, unfortunately you do not have access to the Client list Page. Please contact your administartor.'}
            </div>
        );
    }
}

export default withStyles(styles)(BusinessClientList);
