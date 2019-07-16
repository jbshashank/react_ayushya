import React, { Component } from "react";
import { Field, FieldArray } from "redux-form";
import Button from "@material-ui/core/Button";

import CustomTextField from "../../components/CustomTextField";
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import {
  required,
  alphaNumeric,
  landLineNumber,
  phoneNumber,
  email,
  alpha
} from "../../utils/reduxFormValiadtion";

const renderMultipleFields = ({ fields, meta: { error, submitFailed } }) => {
  if(fields.length===0)
  {
     fields.push({})
  }
  return(
  <>
    <GridContainer>
      <GridItem xs={12} sm={4} md={4}>
        <Button
          onClick={() => fields.push({})}
          variant="contained"
          color="primary"
        >
          Add Details
        </Button>
        {submitFailed && error && <span>{error}</span>}
      </GridItem>
    </GridContainer>
    {fields.map((member, index) => (
      <>
        <div className="box-footer" style={{ textAlign: "right" }}>
          <Button
            onClick={() => fields.remove(index)}
            variant="contained"
            color="primary"
            disabled={fields.length===1}
          >
            Remove
          </Button>
        </div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <Field
              name={`${member}.contactName`}
              component={CustomTextField}
              label="Name*"
              validate={[required, alpha]}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Field
              name={`${member}.contactEmailAddress`}
              type="text"
              component={CustomTextField}
              label="Email Address*"
              validate={[email, required]}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Field
              name={`${member}.contactLandline`}
              component={CustomTextField}
              id="Landline"
              label="Landline*"
              validate={[landLineNumber]}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Field
              name={`${member}.contactMobile`}
              component={CustomTextField}
              id="mobile"
              label="Mobile Number*"
              validate={[required, phoneNumber]}
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <Field
              name={`${member}.contactDesignation`}
              component={CustomTextField}
              id="designation"
              label="Designation*"
              validate={[required, alpha]}
            />
          </GridItem>
        </GridContainer>
      </>
    ))}
  </>
)};

class detailsFieldArray extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FieldArray name="businessClientContactDetails" component={renderMultipleFields} />
      </div>
    );
  }
}

export default detailsFieldArray;
