import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import validate from "../../utils/validate";
import axios from "../../utils/axios";
import FormBasic from "./FormBasic";
import FormEducation from "./FormEducation";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { BASE_URL_EMPLOYEE, FILE_URL } from "../../utils/config";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            aboutMe: '',
            dateOfBirth: moment.now(),
            dateOfJoining: moment.now(),
            email: '',
            phoneNumber: '',
            // photo: [],
            skills: '',
            expertiseLevel: '',
            role: '',
            // fingerprint: '',
            salary: '',
            age: '',
            gender: '',
            addr: '',
            city: '',
            state: '',
            pinCode: '',
            userId: '',
            // educations: [],
            errorSalary: '',
            errorAge: '',
            formTitle: 'Add Employee',
            // imagePath: '',
            // uploadDir: '',
            errorFirstName: '',
            errorLastName: '',
            errorPhoneNumber: '',
            errorEmail: '',
            errorexpertiesLevel: '',
            errorSkills: '',
            errorRole: '',
            // errorLocation: '',
            isDisabledNext: true,
            errorempMiddleName: '',
            errorCity: '',
            errorState: ''
        };
        this.steps = [{ title: "Basic Details" }, { title: "Educational Details" }];
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        // // const particularword = url.indexOf('employeesedit');
        // const userId = window.location.pathname.split('/').pop().split("employeesedit").shift();
        if (userId) {
            this.setState({ userId });
            new Promise((resolve, reject) => {
                this.props.fetchEmployeeByIdWatcher(userId, () => {
                    console.log("inside fetchEmployeeByIdWatcher" + this.props.employee);
                    this.setState({
                        formTitle: 'Edit Employee',
                        firstName: this.props.employee.firstName,
                        middleName: this.props.employee.middleName,
                        lastName: this.props.employee.lastName,
                        aboutMe: this.props.employee.aboutMe,
                        age: this.props.employee.age,
                        email: this.props.employee.email,
                        phoneNumber: this.props.employee.phoneNumber,
                        userId: this.props.employee.userId,
                        // educations: this.props.employee.employeeEducationDetails,
                        dateOfJoining: this.props.employee.dateOfJoining,
                        dateOfBirth: this.props.employee.dateOfBirth,
                        // location: this.props.employee.employeePersonalDetails.location,
                        skills: this.props.employee.skills,
                        expertiseLevel: this.props.employee.expertiseLevel,
                        role: this.props.employee.role,
                        salary: this.props.employee.salary,
                        addr: this.props.employee.addr,
                        gender: this.props.employee.gender,
                        // uploadDir: this.props.employee.employeePersonalDetails.uploadDir,
                        state: this.props.employee.state,
                        city: this.props.employee.city,
                        pinCode: this.props.employee.pinCode,
                        // imagePath: this.props.employee.employeePersonalDetails.uploadDir ? `${FILE_URL}${this.props.employee.employeePersonalDetails.uploadDir}` : null,
                    });
                    resolve();
                }, () => {
                    reject();
                });
            });
        }
        this.props.fetchStateWatcher();
        // this.props.fetchAllCityWatcher();
    }

    validateForm = (a) => {
        // let educationerror = ''
        let {
            errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName,
            firstName, lastName, age, salary, skills, pinCode, phoneNumber, errorPhoneNumber,
            email, expertiseLevel, errorEmail, errorexpertiesLevel,
            errorSkills,
            // educations,
            activeStep, errorRole, role, errorempMiddleName, middleName, city, state, errorCity, errorState
        } = this.state;
        if (a === "dateOfBirth") {
            errorAge = validate("age", age);
        }
        else {
            errorPinCode = validate("pinCode", pinCode);
            errorSalary = validate("salary", salary
            );
            errorAge = validate("age", age);
            errorFirstName = validate("firstName", firstName);
            errorLastName = validate("lastName", lastName);
            errorPhoneNumber = validate("phoneNumber", phoneNumber);
            errorEmail = validate("email", email)
            errorexpertiesLevel = validate("expertiseLevel", expertiseLevel)
            errorSkills = validate("skills", skills)
            errorRole = validate("role", role)
            // errorLocation = validate("location", location)
            errorempMiddleName = validate("middleName", middleName)
            errorCity = validate("city", city)
            errorState = validate("state", state)
            // educations.forEach(function (item) {
            //     if (item.education === "" && activeStep !== 0) educationerror = "educationerror"
            // });
        }


        this.setState({
            errorPinCode, errorSalary, errorAge, errorFirstName, errorLastName, errorPhoneNumber, errorEmail, errorexpertiesLevel,
            errorSkills, errorRole, errorempMiddleName, errorState, errorCity
        });

        return !(errorLastName || errorFirstName ||
            errorAge || errorSalary || errorPinCode || errorEmail || errorPhoneNumber || errorexpertiesLevel ||
            errorSkills
            // || educationerror
            || errorRole || errorempMiddleName || errorState || errorCity)
    };

    // addEducation = () => {
    //     const education = { yearOfCompletion: new Date(), education: '' };
    //     this.setState({ educations: this.state.educations.concat(education) });
    // };

    // removeEducation = (index) => {
    //     const { educations } = this.state;
    //     educations.splice(index, 1);
    //     this.setState({ educations });
    // };

    // handleChangeEducation = (e, index) => {
    //     console.log("Date change ", e);
    //     const { educations } = this.state;
    //     const education = { ...educations[index] };
    //     education[e.target.name] = e.target.value;
    //     educations[index] = education;
    //     this.setState({ educations })
    // };

    // handleChangeEducationDate = (name, value, index) => {
    //     const { educations } = this.state;
    //     const education = { ...educations[index] };
    //     education[name] = value;
    //     educations[index] = education;
    //     this.setState({ educations })
    // };

    handleChange = (event) => {
        const { value, name } = event.target;
        let { errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName, errorPhoneNumber,
            errorEmail, errorexpertiesLevel, errorSkills, errorRole, errorempMiddleName,
            errorCity, errorState } = this.state;

        switch (name) {

            case 'pinCode':
                errorPinCode = validate("pinCode", value);
                this.setState({
                    errorPinCode,
                });
                break;
            case "salary":
                errorSalary = validate("salary", value);
                this.setState({
                    errorSalary
                });
                break;
            case "age":
                errorAge = validate("age", value);
                this.setState({
                    errorAge
                });
                break;
            case "firstName":
                errorFirstName = validate("firstName", value);
                this.setState({
                    errorFirstName
                });
                break;
            case "middleName":
                errorempMiddleName = validate("middleName", value);
                this.setState({
                    errorempMiddleName
                });
                break;
            case "lastName":
                errorLastName = validate("lastName", value);
                this.setState({
                    errorLastName
                });
                break;
            case "phoneNumber":
                errorPhoneNumber = validate("phoneNumber", value);
                this.setState({
                    errorPhoneNumber
                });
                break;
            case "email":
                errorEmail = validate("email", value);
                this.setState({
                    errorEmail
                });
                break;
            case "expertiseLevel":
                errorexpertiesLevel = validate("expertiseLevel", value);
                this.setState({
                    errorexpertiesLevel
                });
                break;
            case "skills":
                errorSkills = validate("skills", value);
                this.setState({
                    errorSkills
                });
                break;
            case "role":
                errorRole = validate("role", value);
                this.setState({
                    errorRole
                });
                break;
            // case "location":
            //     errorLocation = validate("location", value);
            //     this.setState({
            //         errorLocation
            //     });
            //     break;
            case "city":
                errorCity = validate("city", value);
                this.setState({
                    errorCity
                });
                break;
            case "state":
                errorState = validate("state", value);
                this.setState({
                    errorState
                });
                break;
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleDateChange = (name, value) => {
        console.log("value of name:: value", name, value.toISOString())
        if (name === "dateOfBirth" || name === "job") {
            this.setState({ [name]: value.toISOString() });
        }
        else {
            this.setState({ [name]: value });
        }
        if (name === "dateOfBirth") {
            var selectedTime = moment(new Date(value));
            var currentTime = moment(new Date());
            const diffdata = moment.duration(currentTime.diff(selectedTime));
            console.log(diffdata);
            this.setState({
                age: Math.round(diffdata.asYears())
            }, () => {
                this.validateForm("dateOfBirth");
            });

        }
    };

    handleStateChange = event => {
        // const unProcesedKey = event._targetInst.key;
        // console.log("unProcesedKey:::::::::" + unProcesedKey);
        // const StateId = unProcesedKey.split("STATE_")[
        //     unProcesedKey.split("STATE_").length - 1
        // ];

        // this.setState({ state: event._targetInst.key });
        // const StateId = this.state.state.split("STATE_")[this.state.state.split("STATE_").length - 1];
        this.setState({ state: event.target.value });
        this.props.fetchCityWatcher({ stateCode: event.target.value });

        // const unProcesedKey = e._targetInst.key;
        // console.log("unProcesedKey:::" + unProcesedKey);
        // const StateId = unProcesedKey.split("STATE_")[
        //     unProcesedKey.split("STATE_").length - 1
        // ];
        // this.props.fetchCityWatcher({ stateCode: StateId });
    };

    handleCityChange = event => {
        this.setState({ city: event.target.value });
    };

    // handleStateChange(e) {
    //     // this.setState({ state: event.target.value });
    //     const unProcesedKey = e._targetInst.key;
    //     console.log("unProcesedKey:::::::::" + unProcesedKey);
    //     const StateId = unProcesedKey.split("STATE_")[
    //         unProcesedKey.split("STATE_").length - 1
    //     ];
    //     this.props.fetchCityWatcher({ stateCode: StateId });
    // }


    handleNext = () => {
        if (!this.validateForm()) return;

        const { activeStep } = this.state;
        if (activeStep === this.steps.length - 1) return;
        this.setState({
            activeStep: activeStep + 1
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    };

    handleImageChange = (e) => {
        console.log("image change");
        if (e.target && e.target.files && e.target.files.length > 0) {
            let formData = new FormData();
            formData.append("file", e.target.files[0]);
            new Promise((resolve, reject) => {
                this.props.imageUploadWatcher(formData, (data) => {
                    console.log("after reoslve", data);
                    this.setState({
                        uploadDir: data.path,
                        imagePath: `${FILE_URL}${data.path}`
                    });
                    resolve();
                });
            });
        }

    };

    handleSubmit = () => {
        // console.log(firstName.value);
        if (!this.validateForm()) return;
        const {
            firstName,
            middleName,
            lastName,
            aboutMe,
            // educations,
            age,
            dateOfBirth,
            dateOfJoining,
            skills,
            expertiseLevel,
            role,
            salary,
            addr,
            gender,
            userId,
            city,
            state,
            pinCode,
            email,
            phoneNumber,
        } = this.state;
        const payload = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            aboutMe: aboutMe,
            age: age,
            dateOfBirth: dateOfBirth,
            dateOfJoining: dateOfJoining,
            skills: skills,
            expertiseLevel: expertiseLevel,
            role: role,
            salary: salary,
            addr: addr,
            gender: gender,
            city: city,
            state: state,
            pinCode: pinCode,
            // uploadDir: uploadDir,
            phoneNumber: phoneNumber,
            email: email,
            // employeeEducationDetails: educations
        };

        if (userId) {
            payload.userId = userId;
            new Promise((resolve, reject) => {
                this.props.updateEmployeesWatcher(payload, () => {
                    this.props.history.push('/employees');
                    resolve();
                });
            })
        }
        else {
            new Promise((resolve, reject) => {
                this.props.createEmployeesWatcher(payload, () => {
                    this.props.history.push('/employees');
                    resolve();
                });
            });
        }
    };

    getComponent = index => {
        const {
            formTitle,
            firstName,
            middleName,
            lastName,
            aboutMe,
            // educations,
            dateOfBirth,
            dateOfJoining,
            // location,
            // photo,
            skills,
            expertiseLevel,
            role,
            // fingerprint,
            salary,
            age,
            addr,
            city,
            state,
            pinCode,
            gender,
            errorSalary,
            errorAge,
            errorPinCode,
            // imagePath,
            errorFirstName,
            errorLastName,
            phoneNumber,
            email,
            errorPhoneNumber,
            errorEmail,
            errorexpertiesLevel,
            errorSkills,
            errorRole,
            // errorLocation,
            errorempMiddleName,
            errorCity,
            errorState
        } = this.state;

        switch (index) {
            case 0:
                return <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormBasic formTitle={formTitle} firstName={firstName} middleName={middleName} errorempMiddleName={errorempMiddleName} lastName={lastName}
                        dateOfBirth={dateOfBirth} dateOfJoining={dateOfJoining} aboutMe={aboutMe} skills={skills} errorSkills={errorSkills} errorRole={errorRole} expertiseLevel={expertiseLevel} role={role}
                        phoneNumber={phoneNumber} errorEmail={errorEmail} errorexpertiesLevel={errorexpertiesLevel} errorPhoneNumber={errorPhoneNumber} email={email}
                        salary={salary} addr={addr} gender={gender} age={age}
                        errorFirstName={errorFirstName} errorLastName={errorLastName}
                        errorAge={errorAge} errorSalary={errorSalary} errorPinCode={errorPinCode}
                        handleChange={this.handleChange} handleDateChange={this.handleDateChange}
                        handleStateChange={this.handleStateChange}
                        city={city} handleCityChange={this.handleCityChange} errorCity={errorCity} errorState={errorState} state={state} pinCode={pinCode}
                        match={this.props.match} />
                </MuiPickersUtilsProvider>;
            // case 1:
            //     return <MuiPickersUtilsProvider utils={MomentUtils}>
            //         <FormEducation formTitle={formTitle} educations={educations} addEducation={this.addEducation}
            //             firstName={firstName} middleName={middleName} lastName={lastName}
            //             aboutMe={aboutMe} role={role}
            //             removeEducation={this.removeEducation}
            //             handleChangeEducation={this.handleChangeEducation}
            //             handleChangeEducationDate={this.handleChangeEducationDate} />
            //     </MuiPickersUtilsProvider>;
            // default:
            //     return null;
        }
    };

    _renderSteps = (step, index) => {
        return (
            <Step key={`STEP_${index}`}>
                <StepLabel>{step.title}</StepLabel>
            </Step>
        );
    };

    render() {
        const { classes } = this.props;
        const {
            activeStep
        } = this.state;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Paper className={classes.root}>
                        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                            {this.steps.map((step, index) => this._renderSteps(step, index))}
                        </Stepper>
                    </Paper>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} className="parentEmpInfo">
                    <div>
                        {this.getComponent(activeStep)}
                        <div className={classes.buttonContainer}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.button}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === this.steps.length - 1 ? this.handleSubmit : this.handleNext}
                                className={classes.button}>
                                {activeStep === this.steps.length - 1 ? "Finish" : "Next"}
                            </Button>
                        </div>
                    </div>
                </GridItem>
            </GridContainer>
        );
    }
}

export default EmployeeForm;
