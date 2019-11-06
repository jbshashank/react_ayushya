import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';

import {
    createTicketsWatcher,
    fetchTicketsByIdWatcher,
    updateTicketsWatcher,
    fetchBrandWatcher,
    fetchProductByBrandIdWatcher,
    fetchModeByProductIdWatcher,
    fetchStateWatcher,
    fetchEmployeesWatcher,
    fetchCityWatcher,
    fetchAllProductWatcher,
    fetchAllModelWatcher,
    fetchAllCityWatcher,
    fetchProductSubcategoryByBrandIdAndProductIdWatcher,
    fetchAllProductSubCategoryWatcher,
} from "../../../store/actions";
import Tickets from './TicketsForm.Component';
import styles from './styles';
import { ticket } from '../dummyData';

const mapStateToProps = (state, props) => {
    // const {ticket} = state.tickets;
    const { id } = props.match.params;
    console.log("value of State in MSTP", state);
    console.log("value of brands" + state.form);
    return {
        formData: state.form,
        brands: state.tickets.brand,
        products: state.tickets.product,
        productSubcategory: state.tickets.productSubcategory,
        models: state.tickets.models,
        userId: state.employees.userId,
        cities: state.employees.cities,
        ticketTypes: [
            { id: 'test_date', name: 'Text Data' }
        ],
        callTypes: [
            { id: 'test_date', name: 'Text Data' }
        ],
        assignees: [
            { id: 'test_date', name: 'Text Data' }
        ],
        statuses: [
            { id: 'test_date', name: 'Text Data' }
        ],
        states: state.employees.states,
        initialValues:
            id ? state.tickets.ticket
                : {
                    visitTime: +new Date(),
                    visitDate: +new Date(),
                }
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        createTicketsWatcher, fetchTicketsByIdWatcher,
        updateTicketsWatcher, fetchBrandWatcher,
        fetchProductByBrandIdWatcher, fetchModeByProductIdWatcher,
        fetchStateWatcher, fetchEmployeesWatcher,
        fetchCityWatcher, fetchAllProductWatcher,
        fetchAllModelWatcher, fetchAllCityWatcher,
        fetchProductSubcategoryByBrandIdAndProductIdWatcher,
        fetchAllProductSubCategoryWatcher
    }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Tickets));
