import {withStyles} from "@material-ui/core/styles/index";
import {connect} from "react-redux";

import FormBasic from "./FormBasic.Component";
import styles from "./styles";

const mapStateToProps = (state) => {
    const {states, cities} = state.employees;
    return {
        states, cities
    };
};

export default withStyles(styles)(connect(mapStateToProps)(FormBasic));
