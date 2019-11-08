import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import * as firebase from "firebase";

import loginPageStyle from "assets/jss/material-dashboard-react/views/loginPageStyle.jsx";

const { REACT_APP_SERVER_URL } = process.env;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      errors: {},
      email: '',
      password: ''
    };
  }
  login = async e => {

    e.preventDefault();
    const { history } = this.props;

    const fields = ["email", "password"];
    const formElements = e.target.elements;
    // const { email, password } = this.state;

    const formValues = fields
      .map(field => ({
        [field]: formElements.namedItem(field).value
      }))
      .reduce((current, next) => ({ ...current, ...next }));
    axios({
      method: 'post',
      url: `http://134.209.147.111:8095/login`,
      data: {
        email: formValues.email,
        password: formValues.password
      }
      // withCredentials: true // True otherwise I receive another error
    })
      .then(response => {
        localStorage.setItem("userdetail", response);
        if (response.data.userId) {
          this.props.history.push('/dashboard');
        }
      })
      .catch(error => {
        console.log("login error:::" + error);
      });

    // let loginRequest;
    // try {
    //   loginRequest = await axios.post(
    //     `http://134.209.147.111:8095/login`,
    //     {
    //       data: {
    //         email: formValues.email,
    //         password: formValues.password
    //       }
    //     }
    //   );
    // } catch ({ response }) {
    //   localStorage.setItem("userdetail", response);
    //   if (response.data.userId) {
    //     this.props.history.push('/dashboard');
    //   }
    //   loginRequest = response;
    // }
    // const { data: loginRequestData } = loginRequest;
    // // if (loginRequestData) {
    // //   return history.push("/dashboard");
    // // }

    // this.setState({
    //   errors: loginRequestData.messages && loginRequestData.messages.errors
    // });

  };
  handleToggle = value => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              {/* Log in to see how you can speed up your web development with out
              of the box CRUD for #User Management and more.{" "} */}
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.login}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Sign in</h4>
                </CardHeader>
                <CardBody>
                  <p
                    className={`${classes.textCenter} ${classes.checkboxLabel}`}
                  >
                    <h4><strong>Sign in </strong><br />to continue to Ayushya Portal</h4>
                  </p>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    error={errors.email || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      required: true,
                      name: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    error={errors.password || errors.invalidEmailOrPassword}
                    formControlProps={{
                      fullWidth: true,
                      className: classes.formControlClassName
                    }}
                    inputProps={{
                      type: "password",
                      required: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        classes.checkboxLabelControl +
                        " " +
                        classes.checkboxLabelControlClassName,
                      label: classes.checkboxLabel
                    }}
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => this.handleToggle(1)}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    }
                    label={<span>Remember me</span>}
                  />
                  <br />
                  <div className="errorMessage">{this.state.errors.message}</div>
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    Sign In
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.object
};

export default withStyles(loginPageStyle)(LoginPage);
