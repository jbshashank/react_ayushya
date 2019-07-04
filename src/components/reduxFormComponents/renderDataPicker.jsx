import React from 'react';
import {DatePicker, TimePicker} from 'material-ui-pickers';
import {FormHelperText} from '@material-ui/core';

const RenderDatePicker = ({label, className, meta: { touched, error }, input, ...custom}) => (
    <>
        <DatePicker
            label={label}
            margin="none"
            className={className}
            {...input}
            {...custom}
            error={touched && error}
        />
        <FormHelperText id="component-error-text" className="errorText">{ error}</FormHelperText>
    </>
);

export default RenderDatePicker;