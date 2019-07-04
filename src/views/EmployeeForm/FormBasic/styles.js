const styles = theme => ({
    root: {
        width: "100%"
    },
    textField: {
        width: "100%",
        margin: "10px 0"
    },
    formControl: {
        margin: theme.spacing.unit,
        width: "100%",
    },
    profilePic: {
        marginTop: -60,
        width: 120,
        height: 120,
        alignSelf: "center"
    },
    followBtn: {
        margin: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 4,
        paddingRight: theme.spacing.unit * 4,
        color:"white",
        backgroundColor:"#952DAF"
    },
    profileContainer:{
        marginTop: 70
    }
});

export default styles;
