import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { FormHelperText } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel'
// import { makeStyles } from '@material-ui/styles';



function renderSelectField(props) {
    const {
        input,
        label,
        meta: { touched, error },
        children,
        ...custom
    } = props

    const inputProps = { name: input.name, id: input.id }
    return (
        <>
            <Select
                {...input}
                {...custom}
                inputProps={inputProps}
                error={touched && error}
            >
                {children}
            </Select>
            <FormHelperText id="component-error-text" className="errorText">{touched&&error}</FormHelperText>
        </>
    )
}


export default renderSelectField
