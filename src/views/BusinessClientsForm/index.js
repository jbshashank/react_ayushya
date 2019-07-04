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
  console.log("value of state in MSTP businesss",state.businessclient.businessClient)
  const id = props.match.params.id;
  console.log("inside MSTP",id)
  return {
    formData:state.form,
    cities: state.employees.cities,
    states: state.employees.states,   
    // initialValues: id&&id===state.businessclient.businessClient.id?state.businessclient.businessClient:null
    initialValues: id && state.businessclient.businessClient
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
