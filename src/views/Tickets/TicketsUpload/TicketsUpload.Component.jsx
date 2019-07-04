import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import {FormControl} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

import Card from "../../../components/Card/Card.jsx";
import CardHeader from "../../../components/Card/CardHeader.jsx";
import CardBody from "../../../components/Card/CardBody.jsx";
import CardFooter from "../../../components/Card/CardFooter.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";

class TicketsUpload extends Component {

    render() {
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <form>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Upload Ticket File</h4>
                                <p className={classes.cardCategoryWhite}>Select valid excel file to upload</p>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={4} md={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="age-simple">Ticket File</InputLabel>
                                            <input type="file" name="ticketFile"/>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        );
    }
}

export default TicketsUpload;