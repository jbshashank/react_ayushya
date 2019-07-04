import React, {Component} from "react";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import validate from "../../utils/validate";

import FormBasic from "./FormBasic";
import FormEducation from "./FormEducation";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import {BASE_URL, FILE_URL} from "../../utils/config";

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            pob: '',
            aboutMe: '',
            dob: moment.now(),
            doj: moment.now(),
            location: '',
            photo: [],
            skills: '',
            expertiesLevel: '',
            role: '',
            fingerprint: '',
            salary: '',
            age: '',
            address: '',
            city: '',
            state: '',
            pinCode: '',
            educations: [],
            gender: '',
            id: '',
            errorSalary: '',
            errorAge: '',
            formTitle: 'Add Employee',
            imagePath: '',
            uploadDir: '',
            errorFirstName: '',
            errorLastName: '',
            errorempPhoneNumber:'',
            errorEmail:'',
            errorexpertiesLevel:'',
            errorSkills:'',
            errorRole:'',
            errorLocation:'',
            isDisabledNext: true,
            errorempMiddleName:'',
            errorCity:'',
            errorState:''
        };
        this.steps = [{title: "Basic Details"}, {title: "Educational Details"}];
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.setState({id});
            new Promise((resolve, reject) => {
                this.props.fetchEmployeeByIdWatcher(id, () => {
                    console.log("employee in resolve", this.props.employee);
                    this.setState({
                        formTitle: 'Edit Employee',
                        firstName: this.props.employee.employeePersonalDetails.empFirstName,
                        middleName: this.props.employee.employeePersonalDetails.empMiddleName,
                        lastName: this.props.employee.employeePersonalDetails.empLastName,
                        age: this.props.employee.employeePersonalDetails.age,
                        empEmailAddress: this.props.employee.employeePersonalDetails.empEmailAddress,
                        empPhoneNumber: this.props.employee.employeePersonalDetails.empPhoneNumber,
                        pob: this.props.employee.employeePersonalDetails.pob,
                        aboutMe: this.props.employee.employeePersonalDetails.aboutMe,
                        id: this.props.employee.id,
                        educations: this.props.employee.employeeEducationDetails,
                        doj: this.props.employee.employeePersonalDetails.doj,
                        dob: this.props.employee.employeePersonalDetails.dob,
                        location: this.props.employee.employeePersonalDetails.location,
                        skills: this.props.employee.employeePersonalDetails.skills,
                        expertiesLevel: this.props.employee.employeePersonalDetails.expertiesLevel,
                        role: this.props.employee.employeePersonalDetails.role,
                        salary: this.props.employee.employeePersonalDetails.salary,
                        address: this.props.employee.employeePersonalDetails.address,
                        gender: this.props.employee.employeePersonalDetails.gender,
                        uploadDir: this.props.employee.employeePersonalDetails.uploadDir,
                        city: this.props.employee.employeePersonalDetails.city,
                        state: this.props.employee.employeePersonalDetails.state,
                        pinCode: this.props.employee.employeePersonalDetails.pincode,
                        imagePath: this.props.employee.employeePersonalDetails.uploadDir ? `${FILE_URL}${this.props.employee.employeePersonalDetails.uploadDir}` : null,
                    });
                    resolve();
                }, () => {
                    reject();
                });
            });
        }
        this.props.fetchStateWatcher();
    }

    validateForm = (a) => {
        let educationerror=''
        let {
            errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName,
            firstName, lastName, age, salary, skills,pinCode,empPhoneNumber,errorempPhoneNumber,
            empEmailAddress, expertiesLevel,errorEmail,errorexpertiesLevel,
            errorSkills,educations,activeStep, errorRole, errorLocation, role, location,errorempMiddleName,middleName, city, state, errorCity, errorState
        } = this.state;
        if(a==="dob")
        {
            errorAge = validate("age", age);
        }
        else{
        errorPinCode = validate("pinCode", pinCode);
        errorSalary = validate("salary", salary);   
        errorAge = validate("age", age);
        errorFirstName = validate("firstName", firstName);
        errorLastName = validate("lastName", lastName);
        errorempPhoneNumber=validate("empPhoneNumber",empPhoneNumber);
        errorEmail = validate("empEmailAddress",empEmailAddress)
        errorexpertiesLevel=validate("expertiesLevel",expertiesLevel)
        errorSkills=validate("skills",skills)
        errorRole=validate("role",role)
        errorLocation=validate("location",location)
        errorempMiddleName=validate("middleName",middleName)
        errorCity=validate("city",city)
        errorState=validate("state",state)
        educations.forEach(function(item){
             if(item.education===""&&activeStep!==0)educationerror="educationerror"
          });
        }
        

        this.setState({errorPinCode, errorSalary, errorAge, errorFirstName, errorLastName, errorempPhoneNumber, errorEmail,errorexpertiesLevel,
            errorSkills, errorRole, errorLocation,errorempMiddleName, errorState, errorCity
        });

        return !(errorLastName || errorFirstName ||
            errorAge || errorSalary || errorPinCode || errorEmail || errorempPhoneNumber||errorexpertiesLevel||
            errorSkills||educationerror || errorLocation || errorRole||errorempMiddleName || errorState || errorCity)
    };

    addEducation = () => {
        const education = {yearOfCompletion: new Date(), education: ''};
        this.setState({educations: this.state.educations.concat(education)});
    };

    removeEducation = (index) => {
        const {educations} = this.state;
        educations.splice(index, 1);
        this.setState({educations});
    };

    handleChangeEducation = (e, index) => {
        console.log("Date change ", e);
        const {educations} = this.state;
        const education = {...educations[index]};
        education[e.target.name] = e.target.value;
        educations[index] = education;
        this.setState({educations})
    };

    handleChangeEducationDate = (name, value, index) => {
        const {educations} = this.state;
        const education = {...educations[index]};
        education[name] = value;
        educations[index] = education;
        this.setState({educations})
    };

    handleChange = (event) => {
        const {value, name} = event.target;
        let {errorSalary, errorPinCode, errorAge, errorFirstName, errorLastName,errorempPhoneNumber,
            errorEmail,errorexpertiesLevel,errorSkills, errorRole, errorLocation,errorempMiddleName,
            errorCity, errorState} = this.state;

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
            case "empPhoneNumber":
                errorempPhoneNumber = validate("empPhoneNumber", value);
                this.setState({
                    errorempPhoneNumber
                });
                break;
            case "empEmailAddress":
                errorEmail = validate("empEmailAddress", value);
                this.setState({
                    errorEmail
                });
                break;
            case "expertiesLevel":
                errorexpertiesLevel = validate("expertiesLevel", value);
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
            case "location":
                errorLocation = validate("location", value);
                this.setState({
                    errorLocation
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

    handleDateChange = (name, value) => {
        console.log("value of name:: value",name,value.toISOString())
        if(name==="dob" ||name==="job")
        {
            this.setState({[name]: value.toISOString()});   
        }
        else{
            this.setState({[name]: value});
        }
        if(name === "dob"){
            var selectedTime = moment(new Date(value));
            var currentTime = moment(new Date());
            const diffdata = moment.duration(currentTime.diff(selectedTime));
            console.log(diffdata);
            this.setState({
                age:Math.round(diffdata.asYears())
            },() => {
                this.validateForm("dob");
             });
            
        }       
    };

    handleCityChange = event => {
        this.setState({city: event.target.value});
    };

    handleStateChange = event => {
        this.setState({state: event.target.value});
        this.props.fetchCityWatcher({state_id: event.target.value});
    };

    handleNext = () => {
        if (!this.validateForm()) return;

        const {activeStep} = this.state;
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
        if (!this.validateForm()) return;
        const {
            firstName,
            middleName,
            lastName,
            aboutMe,
            educations,
            pob,
            age,
            dob,
            doj,
            location,
            photo,
            skills,
            expertiesLevel,
            role,
            fingerprint,
            salary,
            address,
            gender,
            id,
            city,
            state,
            pinCode,
            uploadDir,
            empEmailAddress,
            empPhoneNumber,
        } = this.state;
        const payload = {
            employeePersonalDetails: {
                empFirstName: firstName,
                empMiddleName: middleName,
                empLastName: lastName,
                aboutMe: aboutMe,
                age : age,
                doj: doj,
                dob: dob,
                location: location,
                skills: skills,
                expertiesLevel: expertiesLevel,
                role: role,
                salary: salary,
                address: address,
                gender: gender,
                city: city,
                state: state,
                pincode: pinCode,
                uploadDir: uploadDir,
                empPhoneNumber:empPhoneNumber,
                empEmailAddress:empEmailAddress,
            },
            employeeEducationDetails: educations
        };

        if (id) {
            payload.id = id;
             new Promise((resolve, reject) => {
                 this.props.updateEmployeesWatcher(payload,()=>{this.props.history.push("/employees");
                resolve();
            });
        })
    } 
        // else {
        //     this.props.createEmployeesWatcher(payload);
        // }
        // setTimeout(() => {
        //     this.props.history.push("/employees");
        // }, 500);
        else{
            new Promise((resolve, reject) => {
                this.props.createEmployeesWatcher(payload,()=>{this.props.history.push("/employees");
               resolve();
           });
       })

        }
    };

    getComponent = index => {
        const {
            formTitle,
            firstName,
            middleName,
            lastName,
            aboutMe,
            educations,
            dob,
            doj,
            location,
            photo,
            skills,
            expertiesLevel,
            role,
            fingerprint,
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
            imagePath,
            errorFirstName,
            errorLastName,
            empPhoneNumber,
            empEmailAddress,
            errorempPhoneNumber,
            errorEmail,
            errorexpertiesLevel,
            errorSkills,
            errorRole,
            errorLocation,
            errorempMiddleName,
            errorCity,
            errorState
        } = this.state;

        switch (index) {
            case 0:
                return <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormBasic formTitle={formTitle} firstName={firstName} middleName={middleName} errorempMiddleName={errorempMiddleName} lastName={lastName}
                               dob={dob} doj={doj} location={location} aboutMe={aboutMe} imagePath={imagePath}
                               photo={photo} skills={skills} errorSkills={errorSkills} errorRole={errorRole} errorLocation={errorLocation} expertiesLevel={expertiesLevel} role={role}
                               empPhoneNumber={empPhoneNumber} errorEmail={errorEmail} errorexpertiesLevel={errorexpertiesLevel} errorempPhoneNumber={errorempPhoneNumber} empEmailAddress={empEmailAddress}
                               fingerprint={fingerprint} salary={salary} address={address} gender={gender} age={age}
                               errorFirstName={errorFirstName} errorLastName={errorLastName}
                               errorAge={errorAge} errorSalary={errorSalary} errorPinCode={errorPinCode}
                               handleChange={this.handleChange} handleDateChange={this.handleDateChange}
                               handleCityChange={this.handleCityChange} handleStateChange={this.handleStateChange}
                               handleImageChange={this.handleImageChange} city={city} errorCity={errorCity} errorState={errorState} state={state} pinCode={pinCode}
                               match={this.props.match}/>
                </MuiPickersUtilsProvider>;
            case 1:
                return <MuiPickersUtilsProvider utils={MomentUtils}>
                    <FormEducation formTitle={formTitle} educations={educations} addEducation={this.addEducation}
                                   firstName={firstName} middleName={middleName} lastName={lastName}
                                   aboutMe={aboutMe} imagePath={imagePath} role={role}
                                   removeEducation={this.removeEducation}
                                   handleChangeEducation={this.handleChangeEducation}
                                   handleChangeEducationDate={this.handleChangeEducationDate}/>
                </MuiPickersUtilsProvider>;
            default:
                return null;
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
        const {classes} = this.props;
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
