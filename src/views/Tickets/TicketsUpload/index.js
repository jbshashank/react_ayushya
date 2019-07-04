import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import TicketsUpload from './TicketsUpload.Component';
import styles from './styles';
import {uploadTicketsWatcher} from "../../../store/actions";

const mapDispatchToProps = dispatch => bindActionCreators({uploadTicketsWatcher}, dispatch);

export default withStyles(styles)(connect(null, mapDispatchToProps)(TicketsUpload));
