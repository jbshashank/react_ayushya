import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';


function CustomRadioGroup(props) {
    const { input, ...rest } = props;
    return (
        <RadioGroup
            {...input}
            {...rest}
            onChange={(event, value) => input.onChange(value)}
        />
    )
}

export default CustomRadioGroup

