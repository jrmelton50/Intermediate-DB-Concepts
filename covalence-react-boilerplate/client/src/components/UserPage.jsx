import React, {Component} from "react";

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentions: [],
            username: "",
            chirpsMadeByUser: []
        }
    }

    getChirps() {
        fetch(`/api/users/chirps/${this.props.match.params.id}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                mentions: this.state.mentions,
                username: obj[0].Username,
                chirpsMadeByUser: obj
            });
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        fetch(`/api/mentions/${this.props.match.params.id}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                mentions: obj,
                username: this.state.username,
                chirpsMadeByUser: this.state.chirpsMadeByUser
            });
        })
        .then( (res) => {
            this.getChirps();
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        let listItems = this.state.mentions.map((item) => {
            return (
                <div className="row" key={item.ChirpID}>
                    <div className="col-md-2"></div>
                    <h2> {item.ChirpMessage} </h2>
                </div>
            );
        });
        let chirps = this.state.chirpsMadeByUser.map((item) => {
            return (
                <div className="row" key={item.ChirpID}>
                    <div className="col-md-2"></div>
                    <h2> {item.ChirpMessage} </h2>
                </div>
            );
        });
        return (
            <React.Fragment>
                <div className="container row">
                    <div className="col-md-2"></div>
                    <h1> Chirps {this.state.username} made. </h1>
                    <div className="container pl-0 mt-5"> {chirps} </div>
                </div>
                <hr/>
                <div className="container row">
                    <div className="col-md-2"></div>
                    <h1> Chirps {this.state.username} is tagged in. </h1>
                    <div className="container pl-0 mt-5"> {listItems} </div>
                </div>
            </React.Fragment>
        );    
    }
}