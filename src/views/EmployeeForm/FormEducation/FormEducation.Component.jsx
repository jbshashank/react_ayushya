import React, {Component} from "react";
import {DatePicker} from 'material-ui-pickers';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Icon from '@material-ui/core/Icon';
import CardMedia from '@material-ui/core/CardMedia';
import sidebarimg from "assets/img/sidebar-2_0.jpg";
import { Avatar } from '@material-ui/core';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    eduContainer: {
        padding: 30,
    },
};
class FormEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            educations: [],
        };
    }

    addEducation = () => {
        const education = {yearOfCompletion: '', education: ''};
        this.setState({educations: this.state.educations.concat(education)});
    };

    removeEducation = (index) => {
        const {educations} = this.state;
        educations.splice(index, 1);
        this.setState({educations});
    };

    handleChangeEducation = (e, index) => {
        const {educations} = this.state;
        const education = {...educations[index]};
        education[e.target.name] = e.target.value;
        educations[index] = education;
        this.setState({educations})
    };

    render() {
        const {classes, educations} = this.props;
        if(educations.length===0)
        {this.props.addEducation()}

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader>
                            <Icon className="cardHeaderIcon">person</Icon>
                            <h4 className="cardHeaderTitle">{this.props.formTitle}</h4>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={9} sm={5} md={5}>
                                        <div className="infoTitle">
                                            <span>Add additional details for {this.props.firstName} {this.props.lastName}</span>
                                        </div>
                                </GridItem>
                                <GridItem xs={3} sm={5} md={5}>
                                    <Button onClick={this.props.addEducation} variant="contained" color="primary">Add</Button>
                                </GridItem>
                            </GridContainer>
                            {educations.map((education, index) => {
                                return (
                                    <GridContainer container spacing={16} key={`EDU_${index}`}>
                                        <GridItem xs={12} sm={5} md={5}>
                                            <TextField
                                                id="emp-name"
                                                label="Degree"
                                                className={classes.textField}
                                                name="education"
                                                error={!education.education&&"error"}
                                                value={education.education}
                                                onChange={(e) => this.props.handleChangeEducation(e, index)}
                                            />
                                            {!education.education&&<FormHelperText style={{color: 'red'}}>required education</FormHelperText>}
                                        </GridItem>
                                        <GridItem xs={12} sm={5} md={5}>

                                            <DatePicker
                                                id="emp-passing-year"
                                                label="Passing Year"
                                                name="yearOfCompletion"
                                                views={["year"]}
                                                disableFuture={true}
                                                value={education.yearOfCompletion}
                                                className={classes.textField}
                                                onChange={(date) => {
                                                    this.props.handleChangeEducationDate('yearOfCompletion', date,index);
                                                }}
                                            />

                                        </GridItem>
                                        <GridItem xs={12} sm={2}>
                                            <Button onClick={() => this.props.removeEducation(index)}>
                                                <IconButton
                                                    aria-label="Close"
                                                    className={classes.tableActionButton}
                                                >
                                                    <Close
                                                        className={
                                                            classes.tableActionButtonIcon + " " + classes.close
                                                        }
                                                    />
                                                </IconButton>
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                )
                            })}
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardMedia
                            className="customMedia"
                            image={sidebarimg}
                            title="Contemplative Reptile" />
                        <Avatar alt="Remy Sharp" 
                        src={this.props.imagePath ? this.props.imagePath : "https://www.pngarts.com/files/3/Avatar-Transparent-Image.png"}
                                className={classes.profilePic} />
                        <CardBody>
                            <h4 className="customTitle">{this.props.firstName} {this.props.lastName}</h4>
                            <h6 className="customSubtitle">@{this.props.role}</h6>
                            <p className="customAboutme">
                                
                                {
                                    this.props.aboutMe.length<=50 ? 
                                    this.props.aboutMe : 
                                    this.props.aboutMe.substring(0,50)+"..."
                                }
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(styles)(FormEducation);
