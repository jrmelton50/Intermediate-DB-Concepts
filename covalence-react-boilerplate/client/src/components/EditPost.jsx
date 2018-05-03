import React, {Component} from "react";

export default class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            chirpMessage: ""
        }
    }

    componentDidMount() {
        fetch(`/api/chirps/${this.state.id}`)
        .then( (res) => {
            return res.json();
        })
        .then( (obj) => {
            this.setState({
                chirpMessage: obj.text,
                id: this.state.id
            });
        })
        .catch( (err) => {
            console.log(err);
        });  
    }

    updateChirpAndReturnHome() {
        let obj = {
            text: this.state.chirpMessage,
            id: this.state.id
        }
        fetch(`/api/chirps/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: new Headers({'Content-Type': 'application/json'})
        })
        .then( (res) => {
            this.props.history.replace(`/${this.state.id}`);
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    handleInputChange(value) {
        this.setState({
            chirpMessage: value,
            id: this.state.id
        });
    }

    render() {
        return(
            <React.Fragment>
                <input id="input" className="form-control" value={this.state.chirpMessage} onChange={(event) => this.handleInputChange(event.target.value)}/>
                <button type="button" className="btn btn-primary" onClick={ (event) => { this.updateChirpAndReturnHome()} }>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={ (event) => { this.props.history.replace(`/${this.state.id}`)} }>Close</button>
            </React.Fragment>
        );
    }

}