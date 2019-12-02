import React from 'react'
import { DatePicker } from "material-ui-pickers";

const datePicker = ({ input, label, meta: { touched, error }, ...custom }) => (
    <DatePicker
        hintText={label}
        label={label}
        error={touched && error}
        {...input}
        dateFormat="YYYY-MM-DD"
        {...custom} />
);

export default datePicker;