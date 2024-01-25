import React, { Component } from 'react';
import ClientService from '../services/client.service';
import { withRouter } from '../common/with-router';

class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        id: null,
        name: '',
        email: '',
        telephone: '',
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getClient(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentClient: {
          ...prevState.currentClient,
          name: name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        email: email,
      },
    }));
  }

  onChangeTelephone(e) {
    const telephone = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        telephone: telephone,
      },
    }));
  }

  getClient(id) {
    ClientService.get(id)
      .then(response => {
        const { data } = response.data;
        this.setState({
          currentClient: {
            id: data.id,
            name: data.name,
            email: data.email,
            telephone: data.telephone,
          },
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateClient() {
    ClientService.update(
      this.state.currentClient.id,
      this.state.currentClient,
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: 'The client was updated successfully!',
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClient() {
    ClientService.delete(this.state.currentClient.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/clients');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentClient } = this.state;

    return (
      <div>
        {currentClient ? (
          <div className="edit-form">
            <h4>Client</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentClient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentClient.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Telephone</label>
                <input
                  type="text"
                  className="form-control"
                  id="telephone"
                  value={currentClient.telephone}
                  onChange={this.onChangeTelephone}
                />
              </div>
            </form>

            <button
              className="badge text-bg-danger mr-2"
              onClick={this.deleteClient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge text-bg-success"
              onClick={this.updateClient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Client...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Client);