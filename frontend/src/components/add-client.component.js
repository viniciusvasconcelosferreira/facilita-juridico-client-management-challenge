import React, { Component } from 'react';
import ClientService from '../services/client.service';

export default class AddClient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.newClient = this.newClient.bind(this);

    this.state = {
      name: '',
      email: '',
      telephone: '',
      submitted: false,
      errors: [],
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value,
    });
  }

  saveClient() {
    const data = {
      name: this.state.name,
      email: this.state.email,
      telephone: this.state.telephone,
    };

    ClientService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          telephone: response.data.telephone,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setState({ errors: e.response.data.errors });
        console.log(e);
      });
  }

  newClient() {
    this.setState({
      id: null,
      name: '',
      email: '',
      telephone: '',
      submitted: false,
      errors: [],
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newClient}>
              Add Client
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
              {this.state.errors.name && <div className="error-message">{this.state.errors.name[0]}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
              {this.state.errors.email && <div className="error-message">{this.state.errors.email[0]}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                required
                value={this.state.telephone}
                onChange={this.onChangeTelephone}
                name="telephone"
              />
              {this.state.errors.telephone && <div className="error-message">{this.state.errors.telephone[0]}</div>}
            </div>

            <button onClick={this.saveClient} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}