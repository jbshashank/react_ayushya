import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "material-ui-pickers";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, Select, MenuItem, Fab, Avatar, Button } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardMedia from '@material-ui/core/CardMedia';
import sidebarimg from "assets/img/sidebar-2_0.jpg";

class FormBasic extends Component {
    componentDidMount() {
        // this.props.fetchStateWatcher();
    }
    handleStateChange(e) {
        const unProcesedKey = e._targetInst.key
        const StateId = unProcesedKey.split('STATE_')[unProcesedKey.split('STATE_').length - 1]
        this.props.fetchCityWatcher({ stateCode: StateId })
    }
    render() {
        const { classes } = this.props;
        const {
            firstName,
            middleName,
            lastName,
            aboutMe,
            dateOfBirth,
            dateOfJoining,
            // location,
            // imagePath,
            skills,
            expertiseLevel,
            role,
            // fingerprint,
            salary,
            addr,
            city,
            state,
            pinCode,
            age,
            email,
            phoneNumber,
            handleChange,
            handleDateChange,
            handleCityChange,
            handleStateChange,
            // handleImageChange,
            gender,
            errorSalary,
            errorPhoneNumber,
            errorPinCode,
            errorAge,
            states,
            cities,
            errorFirstName,
            errorLastName,
            errorEmail,
            errorexpertiesLevel,
            errorSkills,
            errorRole,
            // errorLocation,
            errorempMiddleName,
            errorCity,
            errorState
        } = this.props;

        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader>
                                <Icon className="cardHeaderIcon">person</Icon>
                                <h4 className="cardHeaderTitle">{this.props.formTitle}</h4>
                            </CardHeader>
                            <CardBody>

                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="infoTitle">
                                            <Icon className="infoIcon">person</Icon>
                                            <span>Basic Information</span>
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="firstName"
                                            label="First Name*"
                                            className={classes.textField}
                                            name="firstName"
                                            value={firstName}
                                            error={!!errorFirstName}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorFirstName}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="middleName"
                                            label="Middle Name"
                                            className={classes.textField}
                                            name="middleName"
                                            value={middleName}
                                            error={!!errorempMiddleName}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorempMiddleName}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="lastName"
                                            label="Last Name*"
                                            className={classes.textField}
                                            name="lastName"
                                            error={!!errorLastName}
                                            value={lastName}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorLastName}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <DatePicker
                                            label="Date of Birth*"
                                            format="DD-MM-YYYY"
                                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                            className={classes.textField}
                                            value={dateOfBirth}
                                            onChange={(date) => {
                                                handleDateChange('dateOfBirth', date);
                                            }}
                                            disableFuture={true} />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <label>Gender</label>
                                        <RadioGroup
                                            aria-label="Gender*"
                                            name="gender"
                                            style={{ flexDirection: 'row' }}
                                            value={gender}
                                            onChange={handleChange}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={2}>
                                        <TextField
                                            id="age"
                                            label="Age*"
                                            className={classes.textField}
                                            name="age"
                                            value={age}
                                            error={!!errorAge}
                                            onChange={handleChange}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{errorAge}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5}>
                                        <TextField
                                            id="email"
                                            label="Email Address*"
                                            className={classes.textField}
                                            name="email"
                                            value={email || ''}
                                            onChange={handleChange}
                                            error={!!errorEmail}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{errorEmail}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={5}>

                                        <TextField
                                            id="phoneNumber"
                                            label="Mobile Number*"
                                            className={classes.textField}
                                            name="phoneNumber"
                                            value={phoneNumber || ''}
                                            error={!!errorPhoneNumber}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText style={{ color: 'red' }}>{errorPhoneNumber}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel style={{ marginTop: "20px" }}>
                                            About me
                                        </InputLabel>
                                        <CustomInput
                                            labelText=""
                                            id="about-me"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 3,
                                                name: 'aboutMe',
                                                onChange: handleChange,
                                                value: aboutMe
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className="infoTitle"><Icon className="infoIcon">work</Icon>Job Profile
                                        </div>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="role"
                                            label="Role*"
                                            className={classes.textField}
                                            name="role"
                                            value={role}
                                            error={!!errorRole}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorRole}</FormHelperText>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <DatePicker
                                            label="Date of Joining*"
                                            format="DD-MM-YYYY"
                                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                            className={classes.textField}
                                            value={dateOfJoining}
                                            onChange={(date) => {
                                                handleDateChange('dateOfJoining', date);
                                            }}
                                            disableFuture={false}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="expertiseLevel"
                                            label="Expertise Level*"
                                            className={classes.textField}
                                            name="expertiseLevel"
                                            error={!!errorexpertiesLevel}
                                            value={expertiseLevel}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorexpertiesLevel}</FormHelperText>
                                    </GridItem>


                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="skills"
                                            label="Skills*"
                                            className={classes.textField}
                                            name="skills"
                                            value={skills}
                                            error={!!errorSkills}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorSkills}</FormHelperText>
                                    </GridItem>
                                    {/* <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="fingerprint"
                                            label="FingerPrint"
                                            className={classes.textField}
                                            name="fingerprint"
                                            value={fingerprint}
                                            onChange={handleChange} />
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={2}>
                                        <TextField
                                            id="salary"
                                            label="Salary*"
                                            className={classes.textField}
                                            name="salary"
                                            value={salary}
                                            error={!!errorSalary}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorSalary}</FormHelperText>
                                    </GridItem>
                                </GridContainer>
                                {/*<GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FilePond
                                            ref={ref => (this.pond = ref)}
                                            files={photo}
                                            allowMultiple={false}
                                            onupdatefiles={fileItems => {
                                                // Set currently active file objects to this.state
                                                handleDateChange('photo', fileItems)
                                            }}/>
                                    </GridItem>
                                </GridContainer>*/}

                                <GridContainer>
                                    {/* <GridItem xs={12} sm={12} md={12}>
                                        <div className="infoTitle">
                                            <Icon className="infoIcon">location_on</Icon>
                                            Postal Information
                                        </div>
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">State*</InputLabel>
                                            <Select
                                                value={state}
                                                className={classes.textField}
                                                error={!!errorState}
                                                onChange={handleStateChange}>
                                                {states.map(item => {
                                                    return <MenuItem value={item.name}
                                                        key={`STATE_${item.stateCode}`}>{item.name}</MenuItem>
                                                })}
                                            </Select>
                                            {/* <FormHelperText style={{ color: 'red' }}>{errorState}</FormHelperText> */}
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">City*</InputLabel>
                                            <Select
                                                className={classes.textField}
                                                value={city}
                                                error={!!errorCity}>
                                                {/* onChange={handleCityChange}> */}
                                                {cities.map(item => {
                                                    return <MenuItem value={item.name}
                                                        key={item.id}>{item.name}</MenuItem>
                                                })}
                                            </Select>
                                            {/* <FormHelperText style={{ color: 'red' }}>{errorCity}</FormHelperText> */}
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="pinCode"
                                            label="Pincode*"
                                            className={classes.textField}
                                            name="pinCode"
                                            value={pinCode}
                                            error={!!errorPinCode}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorPinCode}</FormHelperText>
                                    </GridItem>
                                    {/* <GridItem xs={12} sm={12} md={4}>
                                        <TextField
                                            id="location"
                                            label="Location*"
                                            className={classes.textField}
                                            name="location"
                                            value={location}
                                            error={!!errorLocation}
                                            onChange={handleChange} />
                                        <FormHelperText style={{ color: 'red' }}>{errorLocation}</FormHelperText>
                                    </GridItem> */}
                                    <GridItem xs={12} sm={12} md={12}>
                                        <InputLabel style={{ marginTop: "20px" }}>
                                            Address
                                        </InputLabel>
                                        <CustomInput
                                            labelText=""
                                            id="addr"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 3,
                                                name: 'addr',
                                                onChange: handleChange,
                                                value: addr
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <GridContainer>

                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>

                    {/* <GridItem xs={12} sm={12} md={4}>
                        <Card profile>
                            <CardMedia
                                className="customMedia"
                                image={sidebarimg}
                                title="Contemplative Reptile" />
                            <Avatar alt="Remy Sharp"
                                src={imagePath ? imagePath : "https://www.pngarts.com/files/3/Avatar-Transparent-Image.png"}
                                className={classes.profilePic} />
                            <CardBody>
                                <h4 className="customTitle">{firstName} {lastName}</h4>
                                <h6 className="customSubtitle">@{role}</h6>
                                <p className="customAboutme">
                                    {
                                        aboutMe.length <= 50 ?
                                            aboutMe :
                                            aboutMe.substring(0, 50) + "..."
                                    }
                                </p>
                            </CardBody>
                            <GridItem xs={12} sm={12} md={12}>
                                <div className="upload-btn-wrapper">
                                    <Button variant="contained" color="primary">
                                        Browse Image  <input type="file" name="myfile" onChange={handleImageChange} />
                                    </Button><br />
                                </div>
                            </GridItem>
                        </Card>
                    </GridItem> */}
                </GridContainer>
            </div>
        )

    }
}

export default FormBasic;
