import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddClient from './components/add-client.component';
import Client from './components/client.component';
import ClientsList from './components/clients-list.component';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{
          padding: 10,
        }}>
          <Link to={'/clients'} className="navbar-brand">
            Facilita Juridico
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/clients'} className="nav-link">
                Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/add'} className="nav-link">
                Add new client
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ClientsList />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/add" element={<AddClient />} />
            <Route path="/clients/:id" element={<Client />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
