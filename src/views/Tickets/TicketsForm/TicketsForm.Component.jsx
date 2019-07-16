import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { FormControl, MenuItem } from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment';

import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import CustomTextField from '../../../components/CustomTextField';
import renderDataPicker from "../../../components/reduxFormComponents/renderDataPicker";
import renderRadioGroup from '../../../components/reduxFormComponents/renderRadioGroup';
import renderTimePicker from "../../../components/reduxFormComponents/renderTimePicker";
import renderSelectField from '../../../components/reduxFormComponents/renderSelectField';
import GridItem from "../../../components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import { required, email, alphaNumeric, alpha, phoneNumber, number, pinCode } from '../../../utils/reduxFormValiadtion';

class TicketsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brandId: ''
        }
    }

    componentDidMount() {
        console.log("this.props in edit form", this.props);
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchTicketsByIdWatcher({ id });
            this.props.fetchAllProductWatcher();
            this.props.fetchAllModelWatcher();
            this.props.fetchAllProductSubCategoryWatcher();
            this.props.fetchAllCityWatcher();
        }
        this.props.fetchBrandWatcher();
        this.props.fetchStateWatcher();
        this.props.fetchEmployeesWatcher({ searchParam: "" });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productDate !== this.props.productDate) {
            this.setState({ products: nextProps.productDate })
        }
    }

    brandOnChangeHandler(e) {
        console.log("on brancd chanhge", e.target.value);
        // this.setState({ brandId: e.target.value });
        // this.props.fetchProductByBrandIdWatcher({ brandId: e.target.value });
         const unProcesedKey = e._targetInst.key

        const BrandKey = unProcesedKey.split('BRAND_')[unProcesedKey.split('BRAND_').length - 1]
        this.props.fetchProductByBrandIdWatcher({ BrandKey });
        this.setState({brand_id:BrandKey})
    }
    handleStateChange(e){
        const unProcesedKey = e._targetInst.key
        const StateId = unProcesedKey.split('STATE_')[unProcesedKey.split('STATE_').length - 1]
        this.props.fetchCityWatcher({state_id:StateId})
    }

    productOnChangeHandler(e) {
        const unProcesedKey = e._targetInst.key
        const ProductKey = unProcesedKey.split('PRODUCT_')[unProcesedKey.split('PRODUCT_').length - 1]
        this.setState({product_id:ProductKey})
        this.props.fetchProductSubcategoryByBrandIdAndProductIdWatcher({ brandId: this.state.brand_id, productId:ProductKey  })
    }
    productSubcategoryOnChangeHandler(e){
        const unProcesedKey = e._targetInst.key
        const ProductSubCategoryKey = unProcesedKey.split('PRODUCT_SUBCATEGORY_')[unProcesedKey.split('PRODUCT_').length - 1]
        console.log("value of satate in :productSubcategoryOnChangeHandler:",this.state)
        this.props.fetchModeByProductIdWatcher({ brandId: this.state.brand_id, productId:this.state.product_id,productCategoryId:ProductSubCategoryKey })

    }
    submitForm = (values) => {
        const data = {
            call_type: values.call_type,
            product_category:values.product_category,
            product_sub_category: values.product_sub_category,
            brand: values.brand,
            tech_name: values.tech_name,
            technicianUniqueId: values.technicianUniqueId,
            name: values.name,
            email_id: values.email_id,
            mobile_number_1: values.mobile_number_1,
            mobile_number_2: values.mobile_number_2,
            model_name: values.model_name,
            serial_number: values.serial_number,
            address_1: values.address_1,
            address_2: values.address_2,
            street: values.street,
            city: values.city,
            state: values.state,
            remarks: values.remarks,
            iw: values.iw,
            visit_time:values.visit_time,
            pin_code: values.pin_code,
            dealer_name: values.dealer_name,
            revisedDate:values.revisedDate,
            revisedTime:values.revisedTime,
        };
        const id = this.props.match.params.id;
        if (id) {
            new Promise((resolve, reject) => {
                this.props.updateTicketsWatcher({ ...data, id }, () => {
                    this.props.history.push('/tickets');
                    resolve();
                })
            });
        } else {
            new Promise((resolve, reject) => {
                this.props.createTicketsWatcher({ ...data, id }, () => {
                    this.props.history.push('/tickets');
                    resolve();
                })
            });
        }
    };

    render() {
        const {
            classes, ticketTypes, products, brands, models, callTypes, assignees, statuses, states,
            handleSubmit, pristine, reset, submitting, tech_name,cities,productSubcategory
        } = this.props;
        const isRescheduleTickets=this.props.match.path==="/rescheduletickets-edit/:id"
        const readOnly = !!this.props.match.params.id;
        
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <form onSubmit={handleSubmit(this.submitForm)}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Complaint Form</h4>
                                <p className={classes.cardCategoryWhite}>Complete the compliant form</p>
                            </CardHeader>
                            <CardBody>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Call Type
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="call_type"
                                                    id="call_type"
                                                    disabled={readOnly}
                                                    className={classes.textField}
                                                    validate={[required]}>
                                                    <MenuItem value={"Demonstration & Installation"}
                                                        key={`CALL_TYPE_DEMONSTRATION_&_INSTALLATION}`}>Demonstration & Installation</MenuItem>
                                                    <MenuItem value={"Home Service"}
                                                        key={`CALL_TYPE_HOME_SERVICE`}>Home Service</MenuItem>
                                                    <MenuItem value={"Escalation"}
                                                        key={`CALL_TYPE_ESCALATION`}>Escalation</MenuItem>
                                                    <MenuItem value={"Pre-Sale Query"}
                                                        key={`CALL_TYPE_PRE_SALES_QUERY`}>Pre-Sale Query</MenuItem>
                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                    {/* </GridContainer>
                                    <GridContainer> */}
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Brand
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="brand"
                                                    className={classes.textField}
                                                    onChange={(e) => {
                                                        this.brandOnChangeHandler(e)
                                                    }}
                                                    disabled={readOnly}
                                                    validate={[required]}>
                                                    {brands.map(item => {
                                                        return <option className={classes.customOption} value={item.brand}
                                                            key={`BRAND_${item.brand_id}`}
                                                        >
                                                            {item.brand}
                                                        </option>
                                                    })}
                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Product Category
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="product_category"                                                    
                                                    id="product_category"
                                                    className={classes.textField}
                                                    disabled={readOnly ? readOnly : products.length === 0||isRescheduleTickets}
                                                    onChange={(e) => this.productOnChangeHandler(e)}
                                                    validate={[required]}>
                                                    {products.map(item => {
                                                        return <option className={classes.customOption} value={item.product}
                                                            key={`PRODUCT_${item.product_id}`}>
                                                            {item.product}
                                                        </option>
                                                    })}
                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Product Sub Category
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="product_sub_category"
                                                    id="product_sub_category"
                                                    className={classes.textField}
                                                    disabled={readOnly ? readOnly : productSubcategory.length === 0||isRescheduleTickets}
                                                    onChange={(e) => this.productSubcategoryOnChangeHandler(e)}
                                                    validate={[required]}>
                                                    {productSubcategory.map(item => {
                                                        return <option className={classes.customOption} value={item.productSubCategory}
                                                            key={`PRODUCT_SUBCATEGORY_${item.productSubCat_id}`}>
                                                            {item.productSubCategory}
                                                        </option>
                                                    })}
                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Model Name
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    label="Model Name"
                                                    className={classes.textField}
                                                    disabled={(readOnly ? readOnly : models.length === 0)||isRescheduleTickets}
                                                    name="model_name"
                                                    validate={[required]}>
                                                    {models.map(item => {
                                                        return <option className={classes.customOption} value={item.model}
                                                            key={`PRODUCT_${item.id}`}>
                                                            {item.model}
                                                        </option>
                                                    })}

                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                    {/* </GridContainer>
                                    <GridContainer> */}
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="serial_number"
                                                label="Serial Number"
                                                disabled={readOnly||isRescheduleTickets}
                                                className={classes.textField}
                                                name="serial_number"
                                                validate={[required]} />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={8} md={8}>
                                            <Field
                                                component={renderRadioGroup}
                                                name="iw"
                                                disabled={isRescheduleTickets}
                                                className={classes.group}
                                                validate={[required]}>
                                                <FormControlLabel value="Warranty" control={<Radio disabled={isRescheduleTickets} color="primary"/>} label="Warranty" />
                                                <FormControlLabel value="Out of Warranty" control={<Radio disabled={isRescheduleTickets} color="primary"/>}
                                                    label="Out of Warranty" />
                                                <FormControlLabel value="Extended Warranty" control={<Radio disabled={isRescheduleTickets} color="primary"/>}
                                                    label="Extended Warranty" />
                                            </Field>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={renderTimePicker}
                                                clearable
                                                ampm={false}
                                                name="visit_time"
                                                disabled={isRescheduleTickets}
                                                className={classes.textField}
                                                label="Time of visit"
                                                // validate={[required]} 
                                                />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={renderDataPicker}
                                                clearable
                                                label="Visit Date"
                                                className={classes.textField}
                                                name="visit_time"
                                                disabled={isRescheduleTickets}
                                                onChange={this.handleChange}
                                                // validate={[required]}
                                                />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="name"
                                                label="Cusomer Name"
                                                className={classes.textField}
                                                name="name"
                                                disabled={isRescheduleTickets}
                                                onChange={this.handleChange}
                                                validate={[required, alpha]} />
                                        </GridItem>
                                    {/* </GridContainer>
                                    <GridContainer> */}
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="address_1"
                                                label="Address 1"
                                                className={classes.textField}
                                                name="address_1"
                                                disabled={isRescheduleTickets}
                                                multiline={true}
                                                rows={2}
                                                rowsMax={2}
                                                validate={[required]} />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="address_2"
                                                label="Address 2"
                                                className={classes.textField}
                                                name="address_2"
                                                disabled={isRescheduleTickets}
                                                multiline={true}
                                                rows={2}
                                                rowsMax={2}
                                                validate={[required]} />
                                        </GridItem>
                                          <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="street"
                                                label="Street"
                                                className={classes.textField}
                                                name="street"
                                                disabled={isRescheduleTickets}
                                                onChange={this.handleChange}
                                                validate={[alpha]}
                                                />
                                        </GridItem>
                                        
                                        <GridItem xs={12} sm={4} md={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    State
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="state"
                                                    id="state"
                                                    disabled={isRescheduleTickets}
                                                    className={classes.textField}
                                                    onChange={(e)=>this.handleStateChange(e)}
                                                    validate={[required]}>
                                                    {states.map(item => {
                                                        return <option className={classes.customOption} value={item.name}
                                                        key={`STATE_${item.id}`}>
                                                            {item.name}</option>
                                                    })}
                                                </Field>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                        <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="age-simple">
                                                    City
                                                </InputLabel>
                                        <Field
                                                    component={renderSelectField}
                                                    name="city"
                                                    id="city"
                                                    disabled={isRescheduleTickets}
                                                    className={classes.textField}
                                                    validate={[required]}>
                                                    {cities.map(item => {
                                                        return <MenuItem value={item.name}
                                                            key={item.id}>{item.name}</MenuItem>
                                                    })}
                                                </Field>
                                                </FormControl>
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="pin_code"
                                                label="Pin Code"
                                                disabled={isRescheduleTickets}
                                                // disabled={}
                                                className={classes.textField}
                                                name="pin_code"
                                                validate={[required, pinCode]} />
                                        </GridItem>
                                    {/* </GridContainer>
                                    <GridContainer> */}
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="email_id"
                                                label="Email"
                                                className={classes.textField}
                                                name="email_id"
                                                disabled={isRescheduleTickets}
                                                validate={[required, email]} />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="mobile_number_1"
                                                label="Contact Number"
                                                className={classes.textField}
                                                name="mobile_number_1"
                                                disabled={isRescheduleTickets}
                                                validate={[required, phoneNumber]} />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={CustomTextField}
                                                id="mobile_number_2"
                                                label="Alternate Contact Number"
                                                className={classes.textField}
                                                name="mobile_number_2"
                                                disabled={isRescheduleTickets}
                                                validate={[phoneNumber]} />
                                        </GridItem>
                                    {/* </GridContainer>
                                    <GridContainer> */}
                                        <GridItem xs={12} sm={4} md={12}>
                                            <Field
                                                component={CustomTextField}
                                                id="dealer_name"
                                                label="Dealer Name"
                                                disabled={readOnly}
                                                className={classes.textField}
                                                name="dealer_name"
                                                onChange={this.handleChange}
                                                validate={[alpha]} />
                                            {(this.props.tech_name !== [] && readOnly) && <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    Tech Name
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="tech_name"
                                                    id="tech_name"
                                                    disabled={isRescheduleTickets}
                                                    className={classes.textField}
                                                    validate={[required]}>
                                                    {tech_name.map(item => {
                                                        return <MenuItem value={item.employeePersonalDetails.empFirstName}
                                                            key={item.id}>{item.employeePersonalDetails.empFirstName}
                                                            </MenuItem>
                                                    })}
                                                </Field>
                                            </FormControl>}
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={12}>
                                            <Field
                                                component={CustomTextField}
                                                id="remarks"
                                                label="Problem Description"
                                                disabled={isRescheduleTickets}
                                                className={classes.textField}
                                                name="remarks"
                                                multiline={true}
                                                rows={2}
                                                rowsMax={2}
                                                validate={[required]} />
                                        </GridItem>
                                       {isRescheduleTickets &&
                                       <>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={renderTimePicker}
                                                clearable
                                                ampm={false}
                                                name="revisedTime"
                                                className={classes.textField}
                                                label="Revised Time"
                                                />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <Field
                                                component={renderDataPicker}
                                                label="Revised Date"
                                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : null)}
                                                className={classes.textField}
                                                name="revisedDate"
                                                disableFuture={true}
                                                />
                                        </GridItem>
                                        </>}

                                    </GridContainer>
                                </MuiPickersUtilsProvider>
                            </CardBody>

                            <CardFooter>
                                <Button type="submit" variant="contained" color="primary"
                                    disabled={pristine || submitting}>
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>                   
                </GridItem>
            </GridContainer>            
        )
    }
}

export default reduxForm({
    form: 'ticket', // a unique identifier for this form
    
})(TicketsForm);