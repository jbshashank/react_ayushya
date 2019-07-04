import React from 'react'
import TextField from '@material-ui/core/TextField';
import { FormHelperText } from "@material-ui/core";

const textField = ({input, label, meta: {touched, error}, ...custom}) => (
   <>
    <TextField
        hintText={label}
        label={label}
        error={touched && error}
        {...input}
        {...custom}/>
        <FormHelperText id="component-error-text" className="errorText">{touched&&error}</FormHelperText>
  </>
);

export default textField;