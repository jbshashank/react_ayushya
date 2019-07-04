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
// import validate from "../../utils/validate";
import {
  required,
  email,
  alphaNumeric,
  alpha,
  phoneNumber,
  number,
  pinCode
} from "../../utils/reduxFormValiadtion";

class BusinessClientsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchBusinessClientByIdWatcher(this.props.match.params.id);      
    }
    this.props.fetchStateWatcher();
    this.props.fetchAllCityWatcher();
    console.log("value of this props..", this.props.match.params.id)
    // fetchBusinessClientByIdWatcher

  }
  handleStateChange(e) {
    const unProcesedKey = e._targetInst.key;
    const StateId = unProcesedKey.split("STATE_")[
      unProcesedKey.split("STATE_").length - 1
    ];
    this.props.fetchCityWatcher({ state_id: StateId });
  }

  submitForm = values => {
    console.log("submit form", values);
    const id = this.props.match.params.id;
    if (id) {
      new Promise((resolve, reject) => {
        this.props.updateBusinessClientWatcher({ ...values, id }, () => {
          this.props.history.push("/businessclientlist");
          resolve();
        });
      });
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
    const readOnly = false;
    console.log("value of this.props...in businessClientForm", this.props);

    return (
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
                    {/* <GridItem xs={12} sm={4} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">
                          Client Code
                        </InputLabel>
                        <Field
                          component={renderSelectField}
                          name="clientCode"
                          id="clientCode"
                          disabled={readOnly}
                          className={classes.textField}
                          validate={[required]}
                        >
                          <MenuItem
                            value={"Client Code A001"}
                            key={`CALL_TYPE_DEMO_SERVICE}`}
                          >
                            Client Code A001
                          </MenuItem>
                          <MenuItem
                            value={"Client Code A002"}
                            key={`CALL_TYPE_INSTALLATION_SERVICE`}
                          >
                            Client Code A002
                          </MenuItem>
                        </Field>
                      </FormControl>
                    </GridItem> */}
                    <GridItem xs={12} sm={4} md={4}>
                      <Field
                        component={CustomTextField}
                        id="clientName"
                        label="Client Name"
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
                        label="Client Address"
                        disabled={readOnly}
                        className={classes.textField}
                        name="clientAddress"
                        validate={[required]}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Country</InputLabel>
                        <Field
                          component={renderSelectField}
                          name="clientCountry"
                          id="clientCountry"
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
                        <InputLabel htmlFor="age-simple">State</InputLabel>
                        <Field
                          component={renderSelectField}
                          name="clientState"
                          id="clientState"
                          className={classes.textField}
                          onChange={e => this.handleStateChange(e)}
                          validate={[required]}
                        >
                          {states.map(item => {
                            return (
                              <option
                                className={classes.customOption}
                                value={item.name}
                                key={`STATE_${item.id}`}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </Field>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">City</InputLabel>
                        <Field
                          component={renderSelectField}
                          name="clientCity"
                          id="clientCity"
                          className={classes.textField}
                          validate={[required]}
                        >
                          {cities.map(item => {
                            return (
                              <MenuItem value={item.name} key={item.id}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Field>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <FormControl className={classes.formControl}>
                        <Field
                          component={CustomTextField}
                          name="clientPinCode"
                          id="clientPinCode"
                          label="Pin Code"
                          className={classes.textField}
                          validate={[required, pinCode]}
                          // onChange={(e) => this.handleStateChange(e)}
                        />
                      </FormControl>
                    </GridItem>


                  </GridContainer>
                  <DetailsFieldArray BusinessClientsId={this.props.match.params.id}/>
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
    );
  }
}

export default reduxForm({
  form: "BusinessClientsForm", // a unique identifier for this form
  enableReinitialize:true 
})(BusinessClientsForm);