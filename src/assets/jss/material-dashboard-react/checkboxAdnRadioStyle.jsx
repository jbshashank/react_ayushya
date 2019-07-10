import {
  // primaryColor,
  blackColor,
  hexToRgb
} from "assets/jss/material-dashboard-react.jsx";

const checkboxAdnRadioStyle = {
  root: {
    padding: "13px"
  },
  checked: {
    color: "#3153a5 !important"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid #3153a5",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid #3153a5",
    borderRadius: "3px"
  },
  radio: {
    // color: primaryColor[0] + "!important"
    color: "#3153a5 !important"
  },
  radioChecked: {
    width: "20px",
    height: "20px",
    border: "1px solid #3153a5",
    borderRadius: "50%"
  },
  radioUnchecked: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid #3153a5",
    borderRadius: "50%"
  }
};

export default checkboxAdnRadioStyle;
