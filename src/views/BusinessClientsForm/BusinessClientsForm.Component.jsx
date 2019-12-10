import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { FormControl, MenuItem } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomTextField from "../../components/CustomTextField";
import renderSelectField from "../../components/reduxFormComponents/renderSelectField";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import DetailsFieldArray from "./detailsFieldArray";
import {
  required,
  alpha,
  pinCode
} from "../../utils/reduxFormValiadtion";

class BusinessClientsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const clientId = this.props.match.params.id;

    // fetch client by id if id is not null
    if (clientId) {
      this.setState({ clientId });
      this.props.fetchBusinessClientByIdWatcher(clientId);
    }
    // this.props.fetchStateWatcher();
    // this.props.fetchAllCityWatcher();
  }
  handleStateChange(e) {
    const unProcesedKey = e._targetInst.key;
    console.log("unProcesedKey:::" + unProcesedKey);
    const StateId = unProcesedKey.split("STATE_")[
      unProcesedKey.split("STATE_").length - 1
    ];
    this.props.fetchCityWatcher({ stateCode: StateId });
  }

  // submit form with values
  submitForm = values => {
    const clientId = this.props.match.params.id;
    //update client if id is not null
    if (clientId) {
      new Promise((resolve, reject) => {
        this.props.updateBusinessClientWatcher({ ...values }, () => {
          console.log('values in upadte client' + values);
          this.props.history.push('/businessclientlist');
          resolve();
        });
      });
      // create business client
    } else {
      new Promise((resolve, reject) => {
        this.props.createBusinessClientWatcher(values, () => {
          this.props.history.push("/businessclientlist");
          resolve();
        });
      });
    }
  };
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      cities,
      states
    } = this.props;
    const readOnly = !!this.props.match.params.id;
    const token = JSON.parse(localStorage.getItem('roles') == "Manager") || JSON.parse(localStorage.getItem('roles') == "Admin");

    return (
      <div>
        {token
          ? <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <form onSubmit={handleSubmit(this.submitForm)}>
                  <Card>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitleWhite}>Business Clients</h4>
                    </CardHeader>
                    <CardBody>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <GridContainer>
                          <GridItem xs={12} sm={4} md={4}>
                            <Field
                              component={CustomTextField}
                              id="clientName"
                              label="Client Name*"
                              disabled={readOnly}
                              className={classes.textField}
                              name="clientName"
                              validate={[required, alpha]}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <Field
                              component={CustomTextField}
                              id="clientAddress"
                              label="Client Address*"
                              className={classes.textField}
                              name="clientAddress"
                              validate={[required]}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="age-simple">Country*</InputLabel>
                              <Field
                                component={renderSelectField}
                                disabled={readOnly}
                                name="country"
                                id="country"
                                className={classes.textField}
                                validate={[required]}
                              >
                                <MenuItem value={"India"} key={`India`}>
                                  India
                          </MenuItem>
                                <MenuItem value={"USA"} key={`USA`}>
                                  USA
                          </MenuItem>
                              </Field>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <FormControl className={classes.formControl}>
                              <Field
                                component={CustomTextField}
                                id="state"
                                label="State*"
                                disabled={readOnly}
                                className={classes.textField}
                                name="state"
                                validate={[required, alpha]}
                              />
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <Field
                              component={CustomTextField}
                              id="city"
                              label="City*"
                              disabled={readOnly}
                              className={classes.textField}
                              name="city"
                              validate={[required, alpha]}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={4} md={4}>
                            <FormControl className={classes.formControl}>
                              <Field
                                component={CustomTextField}
                                name="pinCode"
                                id="pinCode"
                                label="Pin Code*"
                                className={classes.textField}
                                validate={[required, pinCode]}
                              />
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <DetailsFieldArray BusinessClientsId={this.props.match.params.id} />
                      </MuiPickersUtilsProvider>
                    </CardBody>
                    <CardFooter>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={pristine || submitting}
                      >
                        Submit
                </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
          </div> : 'Dear User, unfortunately you do not have access to the Client creation/updation Page. Please contact your administartor.'}
      </div>
    );
  }
}

export default reduxForm({
  form: "BusinessClientsForm",
  enableReinitialize: true
})(BusinessClientsForm);