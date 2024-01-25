import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../services/client.service';
import { addDateMask } from '../services/utils';

export default class ClientsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchClient = this.onChangeSearchClient.bind(this);
    this.retrieveClients = this.retrieveClients.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveClient = this.setActiveClient.bind(this);
    this.removeAllClients = this.removeAllClients.bind(this);
    this.searchClient = this.searchClient.bind(this);

    this.state = {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      searchClient: '',
    };
  }

  componentDidMount() {
    this.retrieveClients();
  }

  onChangeSearchClient(e) {
    const searchClient = e.target.value;
    this.setState({
      searchClient: searchClient,
    });
  }

  retrieveClients() {
    ClientService.getAll()
      .then(response => {
        this.setState({
          clients: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveClients();
    this.setState({
      currentClient: null,
      currentIndex: -1,
    });
  }

  setActiveClient(client, index) {
    this.setState({
      currentClient: client,
      currentIndex: index,
    });
  }

  removeAllClients() {
    ClientService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchClient() {
    this.setState({
      currentClient: null,
      currentIndex: -1,
    });

    ClientService.search(this.state.searchClient)
      .then(response => {
        this.setState({
          clients: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchClient, clients, currentClient, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchClient}
              onChange={this.onChangeSearchClient}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchClient}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Clients List</h4>

          <ul className="list-group">
            {clients &&
              clients.map((client, index) => (
                <li
                  className={
                    'list-group-item ' +
                    (index === currentIndex ? 'active' : '')
                  }
                  onClick={() => this.setActiveClient(client, index)}
                  key={index}
                >
                  {client.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllClients}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentClient ? (
            <div>
              <h4>Client</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{' '}
                {currentClient.name}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{' '}
                {currentClient.email}
              </div>
              <div>
                <label>
                  <strong>Telephone:</strong>
                </label>{' '}
                {currentClient.telephone}
              </div>
              <div>
                <label>
                  <strong>X coordinate:</strong>
                </label>{' '}
                {currentClient.x_coordinate}
              </div>
              <div>
                <label>
                  <strong>Y coordinate:</strong>
                </label>{' '}
                {currentClient.y_coordinate}
              </div>
              <div>
                <label>
                  <strong>Created at:</strong>
                </label>{' '}
                {addDateMask(currentClient.created_at)}
              </div>

              <Link
                to={'/clients/' + currentClient.id}
                className="badge text-bg-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Client...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}