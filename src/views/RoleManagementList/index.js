import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

// import {tickets} from './dummyData';
// import {deleteTicketsWatcher, fetchTicketsWatcher, resetTicketsPagination,createBulkTicketsWatcher} from "../../store/actions";
import RoleManagementList from './RoleManagementList.Component';
import styles from './styles';

const mapStateToProps = state => {
    // const {tickets} = state.tickets;
    // let ticketsData = [];
    // if (tickets && tickets.content) {
    //     Object.keys(tickets.content).map(key => {
    //         ticketsData = ticketsData.concat(tickets.content[key]);
    //     })
    // }
    // return {
    //     tickets: ticketsData,
    //     totalElements: tickets && tickets.totalElements ? tickets.totalElements : 0
    // };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            // deleteTicketsWatcher, fetchTicketsWatcher, resetTicketsPagination,createBulkTicketsWatcher
        }
        , dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RoleManagementList));
