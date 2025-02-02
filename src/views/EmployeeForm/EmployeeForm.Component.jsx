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
            salary: '',
            age: '',
            gender: '',
            address: '',
            city: '',
            state: '',
            pinCode: '',
            userId: '',
            userEducationDetailsDataModels: [],
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
            isDisabledNext: true,
            errorMiddleName: '',
            errorCity: '',
            errorState: '',
            selectedFile: null
        };
        this.steps = [{ title: "Basic Details" }, { title: "Educational Details" }];
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        // fetch employee by id if user id is not null
        if (userId) {
            this.setState({ userId });
            new Promise((resolve, reject) => {
                this.props.fetchEmployeeByIdWatcher(userId, () => {
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
                        userEducationDetailsDataModels: this.props.employee.userEducationDetailsDataModels,
                        dateOfBirth: this.props.employee.dateOfBirth,
                        dateOfJoining: this.props.employee.dateOfJoining,
                        skills: this.props.employee.skills,
                        expertiseLevel: this.props.employee.expertiseLevel,
                        role: this.props.employee.role,
                        salary: this.props.employee.salary,
                        address: this.props.employee.address,
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

        // this.props.fetchStateWatcher();
        // this.props.fetchCityWatcher();
    }

    // validation foe form elements
    validateForm = (a) => {
        let educationerror = ''
        let {
            errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName,
            firstName, lastName, age, salary, skills, pinCode, phoneNumber, errorPhoneNumber,
            email, expertiseLevel, errorEmail, errorexpertiesLevel,
            errorSkills,
            userEducationDetailsDataModels,
            activeStep, errorRole, role, errorMiddleName, middleName, city, state, errorCity, errorState
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
            errorMiddleName = validate("middleName", middleName)
            errorCity = validate("city", city)
            errorState = validate("state", state)
            userEducationDetailsDataModels.forEach(function (item) {
                if (item.qualification === "" && activeStep !== 0) educationerror = "educationerror"
            });
        }


        this.setState({
            errorPinCode, errorSalary, errorAge, errorFirstName, errorLastName, errorPhoneNumber, errorEmail, errorexpertiesLevel,
            errorSkills, errorRole, errorMiddleName, errorState, errorCity
        });

        return !(errorLastName || errorFirstName ||
            errorAge || errorSalary || errorPinCode || errorEmail || errorPhoneNumber || errorexpertiesLevel ||
            errorSkills
            || educationerror
            || errorRole || errorMiddleName || errorState || errorCity)
    };

    // function to add education
    addEducation = () => {
        const education = { passOut: new Date(), qualification: '' };
        this.setState({ userEducationDetailsDataModels: this.state.userEducationDetailsDataModels.concat(education) });
    };

    // function to remove education
    removeEducation = (index) => {
        const { userEducationDetailsDataModels } = this.state;
        userEducationDetailsDataModels.splice(index, 1);
        this.setState({ userEducationDetailsDataModels });
    };

    // handle change of education
    handleChangeEducation = (e, index) => {
        const { userEducationDetailsDataModels } = this.state;
        const education = { ...userEducationDetailsDataModels[index] };
        education[e.target.name] = e.target.value;
        userEducationDetailsDataModels[index] = education;
        this.setState({ userEducationDetailsDataModels })
    };

    // handle change of education completion date
    handleChangeEducationDate = (name, value, index) => {
        const { userEducationDetailsDataModels } = this.state;
        const education = { ...userEducationDetailsDataModels[index] };
        education[name] = value;
        userEducationDetailsDataModels[index] = education;
        this.setState({ userEducationDetailsDataModels });
    };

    // handle change of role
    handleRoleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // common handle change event
    handleChange = (event) => {
        const { value, name } = event.target;
        let { errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName, errorPhoneNumber,
            errorEmail, errorexpertiesLevel, errorSkills, errorRole, errorMiddleName,
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
                errorMiddleName = validate("middleName", value);
                this.setState({
                    errorMiddleName
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

    // handle date change
    handleDateChange = (name, value) => {
        console.log("value of name:: value", name, value.toISOString().substring(0, 10));
        this.setState({ [name]: value.toISOString().substring(0, 10) });
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

    //handle state change
    handleStateChange = event => {
        this.setState({ state: event.target.value });
        this.props.fetchCityWatcher({ stateCode: event.target.value });
    };

    // handle city change
    handleCityChange = event => {
        this.setState({ city: event.target.value });
    };

    handleStateChange(e) {
        const unProcesedKey = e._targetInst.key;
        console.log("unProcesedKey:::::::::" + unProcesedKey);
        const StateId = unProcesedKey.split("STATE_")[
            unProcesedKey.split("STATE_").length - 1
        ];
        this.props.fetchCityWatcher({ stateCode: StateId });
    }

    // handle next event
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

    // handleImageChange = (e) => {
    //     console.log("image change");
    //     if (e.target && e.target.files && e.target.files.length > 0) {
    //         let formData = new FormData();
    //         formData.append("file", e.target.files[0]);
    //         new Promise((resolve, reject) => {
    //             this.props.imageUploadWatcher(formData, (data) => {
    //                 console.log("after reoslve", data);
    //                 this.setState({
    //                     uploadDir: data.path,
    //                     imagePath: `${FILE_URL}${data.path}`
    //                 });
    //                 resolve();
    //             });
    //         });
    //     }

    // };

    // fileUploadHandler = event => {
    //     this.setState({ selectedFile: event.target.files[0] });
    // }

    // submit form data
    handleSubmit = (values) => {
        if (!this.validateForm()) return;
        const {
            firstName,
            middleName,
            lastName,
            aboutMe,
            userEducationDetailsDataModels,
            age,
            dateOfBirth,
            dateOfJoining,
            skills,
            expertiseLevel,
            role,
            salary,
            address,
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
            dateOfJoining: moment(dateOfJoining).format('YYYY-MM-DD'),
            skills: skills,
            expertiseLevel: expertiseLevel,
            role: role,
            salary: salary,
            address: address,
            gender: gender,
            city: city,
            state: state,
            pinCode: pinCode,
            // uploadDir: uploadDir,
            phoneNumber: phoneNumber,
            email: email,
            userEducationDetailsDataModels: userEducationDetailsDataModels
        };

        // update employee based on userId
        if (userId) {
            payload.userId = userId;
            new Promise((resolve, reject) => {
                this.props.updateEmployeesWatcher(payload, () => {
                    this.props.history.push('/employees');
                    resolve();
                });
            })
        }
        // create employee
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
            userEducationDetailsDataModels,
            dateOfBirth,
            dateOfJoining,
            // photo,
            skills,
            expertiseLevel,
            role,
            // fingerprint,
            salary,
            age,
            address,
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
            errorMiddleName,
            errorCity,
            errorState
        } = this.state;

        switch (index) {
            case 0:
                return <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormBasic formTitle={formTitle} firstName={firstName} middleName={middleName} lastName={lastName}
                        dateOfBirth={dateOfBirth} dateOfJoining={dateOfJoining} aboutMe={aboutMe} skills={skills} errorSkills={errorSkills} errorRole={errorRole} expertiseLevel={expertiseLevel} role={role}
                        phoneNumber={phoneNumber} errorEmail={errorEmail} errorexpertiesLevel={errorexpertiesLevel} errorPhoneNumber={errorPhoneNumber} email={email}
                        salary={salary} address={address} gender={gender} age={age}
                        errorFirstName={errorFirstName} errorMiddleName={errorMiddleName} errorLastName={errorLastName}
                        errorAge={errorAge} errorSalary={errorSalary} errorPinCode={errorPinCode}
                        handleChange={this.handleChange} handleDateChange={this.handleDateChange}
                        handleStateChange={this.handleStateChange}
                        city={city} handleCityChange={this.handleCityChange} errorCity={errorCity} errorState={errorState} state={state} pinCode={pinCode}
                        match={this.props.match} />
                </MuiPickersUtilsProvider>;
            case 1:
                return <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormEducation formTitle={formTitle} userEducationDetailsDataModels={userEducationDetailsDataModels}
                        addEducation={this.addEducation}
                        firstName={firstName} middleName={middleName} lastName={lastName}
                        aboutMe={aboutMe} role={role}
                        removeEducation={this.removeEducation}
                        handleChangeEducation={this.handleChangeEducation}
                        handleChangeEducationDate={this.handleChangeEducationDate} />
                </MuiPickersUtilsProvider>;
            default:
                return null;
        }
    };

    // render multiple steps
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
        const token = JSON.parse(localStorage.getItem('roles') == "Manager") || JSON.parse(localStorage.getItem('roles') == "Admin");

        return (
            <div>
                {token
                    ? <div>
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
                    </div> : 'Dear User, unfortunately you do not have access to the Employee Creation/Updation Page. Please contact your administartor.'}
            </div>
        );
    }
}

export default EmployeeForm;
