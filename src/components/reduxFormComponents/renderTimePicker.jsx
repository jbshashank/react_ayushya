import React from 'react';
import {TimePicker} from 'material-ui-pickers';
import {FormHelperText} from '@material-ui/core';


function RenderTimePicker(props) {
    const {
        label,
        className,
        meta: { touched, error },
        input,
        ...custom
    } = props;
    return (
        <>
            <TimePicker
                label={label}
                margin="none"
                className={className}
                {...input}
                {...custom}
                error={touched && error}
            />
            <FormHelperText id="component-error-text" className="errorText">{error}</FormHelperText>
        </>
    );
}

export default RenderTimePicker;