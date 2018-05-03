import React, { Component } from "react";
import {Link} from "react-router-dom";

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            username: ""
        }
    }
    componentDidMount() {
        fetch(`/api/chirps/`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                items: obj[0]
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    // getUserName(id) {
    //     fetch(`/api/users/${id}`)
    //     .then( (res) => {
    //         return res.json();
    //     })
    //     .then( (obj) => {
    //         console.log("object being returned is ", obj);
    //         this.setState({
    //             items: this.state.items,
    //             username: obj.name
    //         });
    //     })
    //     .catch( (err) => {
    //         console.log(err);
    //     });
    // }

    render() {
        let listItems = this.state.items.map((item) => {
            return (
                <div className="row" key={item.id} >
                    <div className="col-md-2 pl-0"></div>
                    <div className="card col-md-8">
                        <div className="card-body">
                            <Link className="blockquote mb-0" to={`/users/${item.userid}`}> {item.username} </Link>
                            <p className="blockquote mb-0"> {item.location} </p>
                            <p className="blockquote mb-0"> {item.text} </p>
                            <Link className="btn btn-primary" to={`/${item.id}`}> See Details </Link>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container pl-0 mt-5"> {listItems} </div>
        );
    }
}