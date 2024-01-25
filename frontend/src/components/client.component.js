import React, { Component } from 'react';
import ClientService from '../services/client.service';
import { withRouter } from '../common/with-router';

class Client extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onChangeXCoordinate = this.onChangeXCoordinate.bind(this);
    this.onChangeYCoordinate = this.onChangeYCoordinate.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);

    this.state = {
      currentClient: {
        id: null,
        name: '',
        email: '',
        telephone: '',
        x_coordinate: 0,
        y_coordinate: 0,
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

  onChangeXCoordinate(e) {
    const x_coordinate = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        x_coordinate: x_coordinate,
      },
    }));
  }

  onChangeYCoordinate(e) {
    const y_coordinate = e.target.value;

    this.setState(prevState => ({
      currentClient: {
        ...prevState.currentClient,
        y_coordinate: y_coordinate,
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
            x_coordinate: data.x_coordinate,
            y_coordinate: data.y_coordinate,
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
              <div className="form-group">
                <label htmlFor="y_coordinate">Latitude (Y)</label>
                <input
                  type="number"
                  className="form-control"
                  id="y_coordinate"
                  value={currentClient.y_coordinate}
                  onChange={this.onChangeYCoordinate}
                  min={-90}
                  max={90}
                />
              </div>
              <div className="form-group">
                <label htmlFor="x_coordinate">Longitude (X)</label>
                <input
                  type="number"
                  className="form-control"
                  id="x_coordinate"
                  value={currentClient.x_coordinate}
                  onChange={this.onChangeXCoordinate}
                  min={-180}
                  max={180}
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