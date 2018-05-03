import React, {Component} from "react";
import {Link} from "react-router-dom";
// import "es6-promise";  WOULD NOT WORK WITH THIS LINE INCLUDED...

export default class IndividualPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: "",
            id: this.props.match.params.id,
            userid: null,
            location: ""
        }
    }

    componentDidMount() {
        fetch(`/api/chirps/${this.state.id}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            // console.log("object = ", obj);
            this.setState({
                post: obj.text,
                id: obj.id,
                userid: obj.userid,
                location: obj.location
            });
        })
        .catch( (err) => {
            console.log(err);
        });  
    }

    deleteMentionAndChirp() {
        fetch(`/api/mentions/${this.state.id}`, {
            method: "DELETE"
        })
        .then( (res) => {
            this.deleteChirp();
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    deleteChirp() {
        fetch(`/api/chirps/${this.state.id}`, {
            method: "DELETE"
        })
        .then( (res) => {
            this.props.history.replace("/");
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1 className="ml-5 mt-5"> {this.state.userid} </h1>
                <h1 className="ml-5 mt-5"> {this.state.location} </h1>
                <h1 className="ml-5 mt-5"> {this.state.post} </h1>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <Link className="btn btn-primary ml-5 mt-3" to={`/edit/${this.state.id}`}> Edit Chirp </Link>
                <button className="btn btn-primary ml-5 mt-3" onClick={ (event) => {this.deleteMentionAndChirp()} }> Delete Chirp </button>
            </React.Fragment>
        );
    }
}