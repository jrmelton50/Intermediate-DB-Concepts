import React, { Component } from "react";
import SelectUserDropDown from "./SelectUserDropDown";

let hardCodedUserId = 1;

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            location: "",
            userid: null
        }
    }

    componentDidMount() {
        fetch(`/api/chirps/`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            // do nothing
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    getUserIDThenCreateMention(name, chirpID) {
        fetch(`/api/users/name/${name}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            let mention = {
                userid: obj.id,
                chirpid: chirpID
            }
           this.createMention(mention);
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    createMention(newMention) {
        fetch(`/api/mentions/`, {
            method: "POST",
            body: JSON.stringify(newMention),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then( (res) => {
        //    location.reload();
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    createChirp() {
        let mentionedUserName = undefined;
        let newChirp = {
            userid: this.state.userid,
            text: this.state.message,
            location: this.state.location
        }
        if (newChirp.text.includes("@")) {
            mentionedUserName = newChirp.text.split("@")[1]; 
        }   
        fetch(`/api/chirps/`, {
            method: "POST",
            body: JSON.stringify(newChirp),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then( (res) => {
            return res.json()
        })
        .then( (obj) => {
            if (mentionedUserName != undefined) {
                this.getUserIDThenCreateMention(mentionedUserName, obj.id);
            }
            location.reload();
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleInputChange(value) {
        this.setState({
            message: value,
            location: this.state.location,
            userid: this.state.userid
        });
    }

    handleLocationChange(value) {
        this.setState({
            message: this.state.message,
            location: value,
            userid: this.state.userid
        });
    }

    handleUserValue(value) {
        this.setState({
            message: this.state.message,
            location: this.state.location,
            userid: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <SelectUserDropDown handleUser={ (value) => {this.handleUserValue(value)}}/>
                    </div>
                    <div className="form-group row">
                    <div className="col-md-2"></div>
                        <input id="location" className="form-control col-md-8 mt-5" placeholder="What is your location?" onChange={(event) => this.handleLocationChange(event.target.value)}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-2"></div>
                        <input id='input' className="form-control col-md-8 mt-5" placeholder="Chirp Away!" onChange={(event) => this.handleInputChange(event.target.value)} />
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-2"></div>
                    <button className="btn btn-primary col-md-1" onClick={(event) => this.createChirp()}> Post </button>
                </div>
            </React.Fragment>
        );
    }
}