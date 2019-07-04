import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators, FieldArray } from "redux";
import moment from "moment";
import RoleManagenebtForm from "./RoleManagenebtForm.Component";
import styles from "./style";
import {
  // fetchStateWatcher,
  // fetchAllCityWatcher,
  // fetchCityWatcher,
  // updateBusinessClientWatcher,
  // fetchBusinessClientByIdWatcher
} from "../../store/actions";
import {
  createBusinessClientWatcher
} from "../../store/actions/businessclient";

const mapStateToProps = (state, props) => {
  return {
    // formData:state.form,
    // cities: state.employees.cities,
    // states: state.employees.states,
    // // initialValues: 
    // //     id &&state.businessclient.businessClient
         
   
    // initialValues: id&&id===state.businessclient.businessClient.id?state.businessclient.businessClient:null
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RoleManagenebtForm)
);
