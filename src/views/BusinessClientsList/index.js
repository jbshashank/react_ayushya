import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {fetchBusinessClientWatcher} from "../../store/actions";

import BusinessClientsList from './BusinessClientsList.Component';
import styles from './styles';

const mapStateToProps = state => {
    // console.lo

    return {
        state,
        BusinessClientList:state.businessclient.businessClientList

    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({fetchBusinessClientWatcher}, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BusinessClientsList));