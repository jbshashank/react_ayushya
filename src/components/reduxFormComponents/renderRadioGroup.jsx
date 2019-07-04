import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormHelperText } from '@material-ui/core';

function renderRadioGroup(props) {
    const { input, meta: { touched, error }, ...rest } = props;
    return (
        <>
        <RadioGroup
            {...input}
            {...rest}
            onChange={(event, value) => input.onChange(value)}
            error={touched && error}
            row
        />
                    <FormHelperText id="component-error-text" className="errorText">{touched&&error}</FormHelperText>      
        </>
    )
}

export default renderRadioGroup

