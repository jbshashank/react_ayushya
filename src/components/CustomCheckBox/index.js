import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import { FormHelperText } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel'

const renderCheckbox = ({input, label, meta: {touched, error}, ...custom}) => (
   <>
      
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
          color="primary"
        />
      }
      label={label}
    />
        <FormHelperText id="component-error-text" className="errorText">{touched&&error}</FormHelperText>
  </>
);

export default renderCheckbox;