import React, { Component } from "react";
import { Field, FieldArray } from "redux-form";
import Button from "@material-ui/core/Button";

import CustomTextField from "../../../components/CustomTextField";
import GridItem from "../../../components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import { FormControl, MenuItem } from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import renderSelectField from '../../../components/reduxFormComponents/renderSelectField';

import {
  required,
  alphaNumeric,
  landLineNumber,
  phoneNumber,
  email,
  alpha,
  pinCode
} from "../../../utils/reduxFormValiadtion";



class customerDetails extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchStateWatcher();
    this.props.fetchAllCityWatcher();
  }
  handleStateChange(e) {
    const unProcesedKey = e._targetInst.key
    const StateId = unProcesedKey.split('STATE_')[unProcesedKey.split('STATE_').length - 1]
    this.props.fetchCityWatcher({ stateCode: StateId })
  }
  render() {
    const { states, cities, classes } = this.props;
    const isRescheduleTickets = this.props.match.path === "/rescheduletickets-edit/:ticketId"
    const renderMultipleFields = ({ fields, meta: { error, submitFailed } }) => {
      if (fields.length === 0) {
        fields.push({})
      }
      return (
        <>
          {fields.map((member, index) => (
            <>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="customerName"
                    label="Cusomer Name*"
                    className={classes.textField}
                    // name="customerName"
                    name={`${member}.customerName`}
                    disabled={isRescheduleTickets}
                    onChange={this.handleChange}
                    validate={[required, alpha]}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="address1"
                    label="Address 1*"
                    className={classes.textField}
                    // name="address1"
                    name={`${member}.address1`}
                    disabled={isRescheduleTickets}
                    multiline={true}
                    rows={2}
                    rowsMax={2}
                    validate={[required]}
                    value="address1" />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="address2"
                    label="Address 2*"
                    className={classes.textField}
                    // name="address2"
                    name={`${member}.address2`}
                    disabled={isRescheduleTickets}
                    multiline={true}
                    rows={2}
                    rowsMax={2}
                    validate={[required]} />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="street"
                    label="Street*"
                    className={classes.textField}
                    // name="street"
                    name={`${member}.street`}
                    disabled={isRescheduleTickets}
                    onChange={this.handleChange}
                    validate={[alpha]}
                  />
                </GridItem>

                <GridItem xs={12} sm={4} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">
                      State*
                                                </InputLabel>
                    <Field
                      component={renderSelectField}
                      // name="state"
                      name={`${member}.state`}
                      id="state"
                      disabled={isRescheduleTickets}
                      className={classes.textField}
                      onChange={(e) => this.handleStateChange(e)}
                      validate={[required]}>
                      {states.map(item => {
                        return <option className={classes.customOption} value={item.name}
                          key={`STATE_${item.stateCode}`}>
                          {item.name}</option>
                      })}
                    </Field>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">
                      City*
                                                </InputLabel>
                    <Field
                      component={renderSelectField}
                      // name="city"
                      name={`${member}.city`}
                      id="city"
                      disabled={isRescheduleTickets}
                      className={classes.textField}
                      validate={[required]}>
                      {cities.map(item => {
                        return <MenuItem value={item.name}
                          key={item.id}>{item.name}</MenuItem>
                      })}
                    </Field>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="pinCode"
                    label="Pin Code*"
                    disabled={isRescheduleTickets}
                    // disabled={}
                    className={classes.textField}
                    // name="pinCode"
                    name={`${member}.pinCode`}
                    validate={[required, pinCode]} />
                </GridItem>
                {/* </GridContainer>
                                    <GridContainer> */}
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="email"
                    label="Email Address*"
                    className={classes.textField}
                    // name="email"
                    name={`${member}.email`}
                    disabled={isRescheduleTickets}
                    validate={[required, email]} />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="contactNumber"
                    label="Contact Number*"
                    className={classes.textField}
                    // name="contactNumber"
                    name={`${member}.contactNumber`}
                    disabled={isRescheduleTickets}
                    // value={ticket.customerDataModel.contactNumber}
                    validate={[required, phoneNumber]} />
                </GridItem>
                <GridItem xs={12} sm={4} md={4}>
                  <Field
                    component={CustomTextField}
                    id="alternateContact"
                    label="Alternate Contact Number"
                    className={classes.textField}
                    // name="alternateContact"
                    name={`${member}.alternateContact`}
                    disabled={isRescheduleTickets}
                    validate={[phoneNumber]} />
                </GridItem>
              </GridContainer>
            </>
          ))}
          <FieldArray name="clientContactDetails" component={renderMultipleFields} />
        </>
      );
    };
  }
}

export default customerDetails;