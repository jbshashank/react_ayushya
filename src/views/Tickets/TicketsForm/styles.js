const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3
    },
    textField: {
        width: "100%",
        margin: "10px 0"
    },
    formControl: {
        padding: theme.spacing.unit,
        width: "100%",
    },
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    customOption: {
        padding: 15,
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#EBEBEB"
        },
        "&:focus":{
            backgroundColor: "#DBDBDB"
        }
    }
});


export default styles;