import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, FieldArray } from "redux";
import moment from "moment";
import BusinessClientsForm from "./BusinessClientsForm.Component";
import styles from "./style";
import {
  fetchStateWatcher,
  fetchAllCityWatcher,
  fetchCityWatcher,
  updateBusinessClientWatcher,
  fetchBusinessClientByIdWatcher
} from "../../store/actions";
import {
  createBusinessClientWatcher
} from "../../store/actions/businessclient";

const mapStateToProps = (state, props) => {
  const clientId = props.match.params.id;
  console.log("inside MSTP", clientId)
  return {
    formData: state.form,
    cities: state.employees.cities,
    states: state.employees.states,
    initialValues: clientId && state.businessclient.businessClient
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStateWatcher,
      fetchAllCityWatcher,
      fetchCityWatcher,
      createBusinessClientWatcher,
      updateBusinessClientWatcher,
      fetchBusinessClientByIdWatcher
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BusinessClientsForm)
);
