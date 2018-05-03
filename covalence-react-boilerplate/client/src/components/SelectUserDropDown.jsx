import React, { Component } from "react";

export default class SelectUserDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch(`/api/users/`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                items: obj
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleUserSelection(value) {
        this.props.handleUser(value);
    }

    render() {
        let dropDownItems = this.state.items.map((item) => {
            return(
                <option className="dropdown-item" href="#" key={item.id} value={item.id}>{item.name}</option>
            );
        });
        return (
            <div className="dropdown mt-3">
                <select className="btn btn-secondary dropdown-toggle" onChange={(e) => {this.handleUserSelection(e.target.value)}}>
                    <option> Select User </option>
                    {dropDownItems}
                </select>
                {/* <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select User
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {dropDownItems}
                </div> */}
            </div>
        );
    }
}