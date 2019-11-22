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
import axios from "../../../utils/axios";
import CustomerDetails from './customerDetails';

class TicketsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: [],
        };
    }
    componentDidMount() {
        this.props.fetchStateWatcher();
        this.props.fetchCityWatcher();
        axios.get('http://134.209.147.111:8095/users/user/getAllUserLocation')
            .then(res => {
                const users = res.data;
                this.setState({ userId: users });
            });
        // this.props.fetchTicketsWatcher();
        const ticketId = this.props.match.params.id;
        if (ticketId) {
            this.setState({ ticketId });
            this.props.fetchTicketsByIdWatcher({ ticketId });

            // this.setState({ makeId: this.props.ticket.callType });
            // this.setState({ customerName: 'hi' });
            // console.log('customer name:::::' + this.state.customerName);
            // new Promise((resolve, reject) => {
            //     this.props.fetchTicketsByIdWatcher(ticketId, () => {
            //         this.setState({
            //             callType: this.props.ticket.callType,
            //             brand: this.props.ticket.brand,
            //             category: this.props.ticket.category,
            //             subCategory: this.props.ticket.subCategory,
            //             model: this.props.ticket.model,
            //             serialNumber: this.props.ticket.serialNumber,
            //             warranty: this.props.ticket.warranty,
            //             visitTime: this.props.ticket.visitTime,
            //             visitDate: this.props.ticket.visitDate,
            //             dealerName: this.props.ticket.dealerName,
            //             description: this.props.ticket.description,
            //             // productModel: {
            //             //     brand: values.brand,
            //             //     category: values.category,
            //             //     subCategory: values.subCategory,
            //             //     model: values.model,
            //             // },
            //             customerDataModel: {
            //                 customerName: this.props.ticket.customerName,
            //                 address1: this.props.ticket.address1,
            //                 address2: this.props.ticket.address2,
            //                 street: this.props.ticket.street,
            //                 state: this.props.ticket.state,
            //                 city: this.props.ticket.city,
            //                 pinCode: this.props.ticket.pinCode,
            //                 email: this.props.ticket.email,
            //                 contactNumber: this.props.ticket.contactNumber,
            //                 alternateContact: this.props.ticket.alternateContact
            //             }
            //             // imagePath: this.props.employee.employeePersonalDetails.uploadDir ? `${FILE_URL}${this.props.employee.employeePersonalDetails.uploadDir}` : null,
            //         });
            //         this.props.history.push('/tickets');
            //         console.log('inside ticket update');
            //         resolve();
            //     }, () => {
            //         reject();
            //     });
            // });
            // this.props.fetchAllModelWatcher();


        }
        this.props.fetchBrandWatcher();
        this.props.fetchAllProductWatcher();
        this.props.fetchAllProductSubCategoryWatcher();
        this.props.fetchAllModelWatcher();
        // this.props.fetchAllCityWatcher();
        // this.props.fetchAllCityWatcher();
        this.props.fetchEmployeesWatcher({});
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.productDate !== this.props.productDate) {
            this.setState({ products: nextProps.productDate })
        }
    }
    handleTechChange(e) {
        console.log("tech name change:" + e.target.value);
    }
    brandOnChangeHandler(e) {
        const unProcesedKey = e._targetInst.key;
        const BrandKey = unProcesedKey.split('BRAND_')[unProcesedKey.split('BRAND_').length - 1]
        this.setState({ makeId: BrandKey });
    }
    handleStateChange(e) {
        const unProcesedKey = e._targetInst.key
        const StateId = unProcesedKey.split('STATE_')[unProcesedKey.split('STATE_').length - 1]
        this.props.fetchCityWatcher({ stateCode: StateId })
    }

    productOnChangeHandler(e) {
        const unProcesedKey = e._targetInst.key
        const ProductKey = unProcesedKey.split('PRODUCT_')[unProcesedKey.split('PRODUCT_').length - 1]
        this.setState({ categoryId: ProductKey })
        this.props.fetchProductSubcategoryByBrandIdAndProductIdWatcher({ makeId: this.state.makeId, categoryId: ProductKey })

    }
    productSubcategoryOnChangeHandler(e) {
        const unProcesedKey = e._targetInst.key
        const ProductSubCategoryKey = unProcesedKey.split('PRODUCT_SUBCATEGORY_')[unProcesedKey.split('PRODUCT_').length - 1]
        this.props.fetchModeByProductIdWatcher({ makeId: this.state.makeId, categoryId: this.state.categoryId, subCategoryId: ProductSubCategoryKey })

    }
    submitForm = (values) => {
        const data = {
            callType: values.callType,
            brand: values.brand,
            category: values.category,
            subCategory: values.subCategory,
            model: values.model,
            serialNumber: values.serialNumber,
            warranty: values.warranty,
            visitTime: values.visitTime,
            visitDate: values.visitDate,
            dealerName: values.dealerName,
            description: values.description,
            status: values.status,
            loggedon: values.loggedon,
            lastupdatedon: values.lastupdatedon,
            ticketId: values.ticketId,
            customerId: values.customerId,
            productId: values.productId,
            customerId: values.customerId,
            userId: values.userId,
            // productModel: {
            //     brand: values.brand,
            //     category: values.category,
            //     subCategory: values.subCategory,
            //     model: values.model,
            // },
            customerDataModel: {
                customerId: values.customerId,
                customerName: values.customerName,
                address1: values.address1,
                address2: values.address2,
                street: values.street,
                state: values.state,
                city: values.city,
                pinCode: values.pinCode,
                email: values.email,
                contactNumber: values.contactNumber,
                alternateContact: values.alternateContact
            }

        };
        const ticketId = this.props.match.params.id;
        if (ticketId) {
            // data.ticketId = ticketId;
            new Promise((resolve, reject) => {
                this.props.updateTicketsWatcher({ ...data }, () => {
                    this.props.history.push('/tickets');
                    resolve();
                })
            });
        } else {
            new Promise((resolve, reject) => {
                this.props.createTicketsWatcher(data, () => {
                    this.props.history.push('/tickets');
                    resolve();
                })
            });
        }
    };

    // handleDateChange = (e) => {

    //     this.setState({ [e.target.name]: moment(e.target.value).format('DD/MM/YYYY') });
    //     console.log("value of name:: value", moment(e.target.value).format('DD/MM/YYYY'));
    // }
    render() {
        const {
            classes, ticketTypes, products, ticket, brands, models, callTypes, assignees, statuses, states,
            handleSubmit, pristine, reset, submitting, userId, cities, productSubcategory, ticketId, tickets
        } = this.props;
        const isRescheduleTickets = this.props.match.path === "/ticketsedit/:ticketId"
        const readOnly = !!this.props.match.params.id;
        const token = JSON.parse(localStorage.getItem('roles') == "Manager") || JSON.parse(localStorage.getItem('roles') == "Admin");

        return (
            <div>
                {token
                    ? <div>
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
                                                                Call Type*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                name="callType"
                                                                id="callType"
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
                                                                Brand*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                name="brand"
                                                                className={classes.textField}
                                                                id="brandId"
                                                                onChange={(e) => {
                                                                    this.brandOnChangeHandler(e)
                                                                }}
                                                                disabled={readOnly}
                                                                validate={[required]}>
                                                                {brands.map(item => {
                                                                    return <option className={classes.customOption} value={item.name}
                                                                        key={`BRAND_${item.makeId}`}
                                                                    >
                                                                        {item.name}
                                                                    </option>
                                                                })}
                                                            </Field>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="age-simple">
                                                                Product Category*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                name="category"
                                                                id="category"
                                                                className={classes.textField}
                                                                disabled={readOnly ? readOnly : products.length === 0 || isRescheduleTickets}
                                                                onChange={(e) => this.productOnChangeHandler(e)}
                                                                validate={[required]}>
                                                                {products.map(item => {
                                                                    return <option className={classes.customOption} value={item.name}
                                                                        key={`PRODUCT_${item.categoryId}`}>
                                                                        {item.name}
                                                                    </option>
                                                                })}
                                                            </Field>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="age-simple">
                                                                Product Sub Category*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                name="subCategory"
                                                                id="subCategory"
                                                                className={classes.textField}
                                                                disabled={readOnly ? readOnly : productSubcategory.length === 0 || isRescheduleTickets}
                                                                onChange={(e) => this.productSubcategoryOnChangeHandler(e)}
                                                                validate={[required]}
                                                            >
                                                                {productSubcategory.map(item => {
                                                                    return <option className={classes.customOption} value={item.name}
                                                                        key={`PRODUCT_SUBCATEGORY_${item.subCategoryId}`}>
                                                                        {item.name}
                                                                    </option>
                                                                })}
                                                            </Field>
                                                        </FormControl>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="age-simple">
                                                                Model Name*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                label="Model Name"
                                                                className={classes.textField}
                                                                disabled={(readOnly ? readOnly : models.length === 0) || isRescheduleTickets}
                                                                name="model"
                                                                validate={[required]}
                                                            >
                                                                {models.map(item => {
                                                                    return <option className={classes.customOption} value={item.name}
                                                                        key={`PRODUCT_${item.modelId}`}>
                                                                        {item.name}
                                                                    </option>
                                                                })}

                                                            </Field>
                                                        </FormControl>
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="serialNumber"
                                                            label="Serial Number*"
                                                            disabled={readOnly || isRescheduleTickets}
                                                            className={classes.textField}
                                                            name="serialNumber"
                                                            validate={[required]} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={renderTimePicker}
                                                            clearable
                                                            ampm={false}
                                                            name="visitTime"
                                                            disabled={isRescheduleTickets}
                                                            className={classes.textField}
                                                            label="Time of visit*"
                                                            validate={[required]}
                                                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : null)}
                                                        // onChange={this.handleTime}
                                                        // value={this.state.visitTime}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={renderDataPicker}
                                                            clearable
                                                            label="Visit Date*"
                                                            className={classes.textField}
                                                            name="visitDate"
                                                            disabled={isRescheduleTickets}
                                                            validate={[required]}
                                                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : null)}
                                                        // onChange={(date) => {
                                                        //     handleDateChange('visitDate', date);
                                                        // }}
                                                        // onChange={this.handleDateChange}
                                                        // value={this.state.visitDate}
                                                        />
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={8} md={8}>
                                                        <Field
                                                            lable="Waranty*"
                                                            component={renderRadioGroup}
                                                            name="warranty"
                                                            disabled={isRescheduleTickets}
                                                            className={classes.group}
                                                            validate={[required]}>
                                                            <FormControlLabel value="Warranty" control={<Radio disabled={isRescheduleTickets} color="primary" />} label="Warranty" />
                                                            <FormControlLabel value="Out of Warranty" control={<Radio disabled={isRescheduleTickets} color="primary" />}
                                                                label="Out of Warranty" />
                                                            <FormControlLabel value="Extended Warranty" control={<Radio disabled={isRescheduleTickets} color="primary" />}
                                                                label="Extended Warranty" />
                                                        </Field>
                                                    </GridItem>
                                                </GridContainer>

                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="customerName"
                                                            label="Cusomer Name*"
                                                            className={classes.textField}
                                                            name="customerName"
                                                            disabled={isRescheduleTickets}
                                                            onChange={this.handleChange}
                                                            validate={[required, alpha]}
                                                        />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="address1"
                                                            label="Address 1*"
                                                            className={classes.textField}
                                                            name="address1"
                                                            disabled={isRescheduleTickets}
                                                            multiline={true}
                                                            rows={2}
                                                            rowsMax={2}
                                                            validate={[required]} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="address2"
                                                            label="Address 2*"
                                                            className={classes.textField}
                                                            name="address2"
                                                            disabled={isRescheduleTickets}
                                                            multiline={true}
                                                            rows={2}
                                                            rowsMax={2}
                                                            validate={[required]} />
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>

                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="street"
                                                            label="Street*"
                                                            className={classes.textField}
                                                            name="street"
                                                            disabled={isRescheduleTickets}
                                                            onChange={this.handleChange}
                                                            validate={[required, alphaNumeric]}
                                                        />
                                                    </GridItem>

                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="state"
                                                            label="State*"
                                                            disabled={isRescheduleTickets}
                                                            className={classes.textField}
                                                            name="state"
                                                            validate={[alpha, required]}
                                                            onChange={this.handleChange}
                                                        />
                                                        {/* <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    State*
                                                </InputLabel>
                                                <Field
                                                    component={renderSelectField}
                                                    name="state"
                                                    id="state"
                                                    disabled={isRescheduleTickets}
                                                    className={classes.textField}
                                                    onChange={(e) => this.handleStateChange(e)}
                                                    validate={[required]}>
                                                    {states.map(item => {
                                                        return <option className={classes.customOption} value={item.name}
                                                            key={`STATE_${item.stateCode}`}>
                                                            {item.name}</option>
                                                    })}
                                                </Field>
                                            </FormControl> */}
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="city"
                                                            label="City*"
                                                            disabled={isRescheduleTickets}
                                                            className={classes.textField}
                                                            name="city"
                                                            validate={[alpha, required]}
                                                            onChange={this.handleChange}
                                                        />
                                                        {/* <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">
                                                    City*
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
                                            </FormControl> */}
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="pinCode"
                                                            label="Pin Code*"
                                                            disabled={isRescheduleTickets}
                                                            // disabled={}
                                                            className={classes.textField}
                                                            name="pinCode"
                                                            validate={[required, pinCode]} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="email"
                                                            label="Email Address*"
                                                            className={classes.textField}
                                                            name="email"
                                                            disabled={isRescheduleTickets}
                                                            validate={[required, email]} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="contactNumber"
                                                            label="Contact Number*"
                                                            className={classes.textField}
                                                            name="contactNumber"
                                                            disabled={isRescheduleTickets}
                                                            // value={ticket.customerDataModel.contactNumber}
                                                            validate={[required, phoneNumber]} />
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={4}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="alternateContact"
                                                            label="Alternate Contact Number"
                                                            className={classes.textField}
                                                            name="alternateContact"
                                                            disabled={isRescheduleTickets}
                                                            validate={[phoneNumber]} />
                                                    </GridItem>
                                                    <GridItem xs={12} sm={4} md={12}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="dealerName"
                                                            label="Dealer Name"
                                                            disabled={readOnly}
                                                            className={classes.textField}
                                                            name="dealerName"
                                                            onChange={this.handleChange}
                                                            validate={[alpha]} />
                                                        {(this.props.userId !== [] && readOnly) && <FormControl className={classes.formControl}>
                                                            <InputLabel htmlFor="age-simple">
                                                                Tech Name*
                                                </InputLabel>
                                                            <Field
                                                                component={renderSelectField}
                                                                name="userId"
                                                                id="userId"
                                                                disabled={isRescheduleTickets}
                                                                className={classes.textField}
                                                                onChange={this.handleTechChange}
                                                                validate={[required]}>
                                                                {this.state.userId.map(item => {
                                                                    return <MenuItem value={item.userId}
                                                                        key={item.locationId}>{item.userId}
                                                                    </MenuItem>
                                                                })}
                                                            </Field>
                                                        </FormControl>}
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={4} md={12}>
                                                        <Field
                                                            component={CustomTextField}
                                                            id="description"
                                                            label="Problem Description*"
                                                            disabled={isRescheduleTickets}
                                                            className={classes.textField}
                                                            name="description"
                                                            multiline={true}
                                                            rows={2}
                                                            rowsMax={2}
                                                            validate={[required]} />
                                                    </GridItem>
                                                    {/* <CustomerDetails TicketId={this.props.match.params.id} /> */}
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
                        </GridContainer >
                    </div> : 'Dear User, unfortunately you do not have access to the Ticket creation/Updation Page. Please contact your administartor.'}
            </div>
        )
    }
}

export default reduxForm({
    form: 'ticket', // a unique identifier for this form
})(TicketsForm);