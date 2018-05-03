import React, {Component} from "react";
import List from "./List";
import Form from "./Form";

export default class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Form ref="form"/> 
                <List/>
            </React.Fragment>
        );
    }
}

