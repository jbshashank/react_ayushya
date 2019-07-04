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
import renderCheckboxGroup from "../../components/CustomCheckBox";
import renderSelectField from "../../components/reduxFormComponents/renderSelectField";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
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

class RoleManagenebtForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }
  submitForm = values => {
    console.log("submit form", values);
  };

  render() {

    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
    } = this.props;
    console.log("value of this.props", this.props)

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={handleSubmit(this.submitForm)}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Role Management</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={CustomTextField}
                        id="roleName"
                        label="Role Name"
                        // disabled={readOnly}
                        className={classes.textField}
                        name="roleName"
                        validate={[required]}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={CustomTextField}
                        id="roleDescription"
                        label="Role Description"
                        multiline
                        rows="4"
                        // disabled={readOnly}
                        className={classes.textField}
                        name="roleDescription"
                        validate={[required]}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <h3> Ticket</h3>
                    <FormControl className={classes.formControl}>
                      <Field
                        component={renderCheckboxGroup}
                        id="ticket_read"
                        label="Read"
                        name="ticket_read"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="ticket_create"
                        label="Create"
                        name="ticket_create"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="ticket_update"
                        label="Update"
                        name="ticket_update"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="ticket_delete"
                        label="Delete"
                        name="ticket_delete"
                        className={classes.textField}
                        validate={[required]}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <h3>Business Client</h3>
                    <FormControl className={classes.formControl}>

                      <Field
                        component={renderCheckboxGroup}
                        id="busunessClient_read"
                        label="Read"
                        name="busunessClient_read"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="busunessClient_create"
                        label="Create"
                        name="busunessClient_create"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="busunessClient_update"
                        label="Update"
                        name="busunessClient_update"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="busunessClient_delete"
                        label="Delete"
                        name="busunessClient_delete"
                        className={classes.textField}
                        validate={[required]}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <h3>Team Member</h3>
                    <FormControl className={classes.formControl}>

                      <Field
                        component={renderCheckboxGroup}
                        id="teamMember_read"
                        label="Read"
                        name="teamMember_read"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="teamMember_create"
                        label="Create"
                        name="teamMember_create"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="teamMember_update"
                        label="Update"
                        name="teamMember_update"
                        className={classes.textField}
                        validate={[required]}
                      />
                      <Field
                        component={renderCheckboxGroup}
                        id="teamMember_delete"
                        label="Delete"
                        name="teamMember_delete"
                        className={classes.textField}
                        validate={[required]}
                      />
                    </FormControl>
                  </GridItem>
                </GridContainer>
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
  form: "RoleManagenebtForm", // a unique identifier for this form
  enableReinitialize:true
})(RoleManagenebtForm);