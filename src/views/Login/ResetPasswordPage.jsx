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

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    this.state = {
      email: '',
      errors: {},
    }
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  };

  handleKeyPress(target) {
    if (target.charCode === 31) {
      this.handleValidSubmit();
    }
  };

  handleValidSubmit() {
    const { resetPasswordFunction } = this.props;
    const fromData = this.state;
    resetPasswordFunction(fromData.email);
  };


  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className={classes.container} >
        <h3>helooooo</h3>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8}>
            <h4 className={classes.textCenter} style={{ marginTop: 0 }}>
              If you&lsquo;d like to reset your password, please enter your email here
            and a link to reset your password will be sent the address you enter.
              </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.handleValidSubmit}>
              <Card className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>Sign in</h4>
                </CardHeader>
                <CardBody>
                  {/* <CustomInput
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
                  /> */}
                  <input type="email" name="email" id="email" onChnge={this.handleEmailChange}
                    onKeyPress={this.handleKeyPress} placeholder="enter your email id here" required
                    value={this.state.email} />


                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="primary" simple size="lg" block>
                    Reset Password
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>>
        </GridContainer>
      </div>)
  }
}

ResetPasswordPage.propTypes = {
  classes: PropTypes.object.isRequired,
  // history: PropTypes.object,
  // errors: PropTypes.object
};

export default withStyles(ResetPasswordPage);