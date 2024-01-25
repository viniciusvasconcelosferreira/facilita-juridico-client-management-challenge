import http from '../http-common';

const CLIENTS_API = '/clients';

class ClientService {
  getAll() {
    return http.get(CLIENTS_API);
  }

  get(id) {
    return http.get(`${CLIENTS_API}/${id}`);
  }

  create(data) {
    return http.post(CLIENTS_API, data);
  }

  update(id, data) {
    return http.put(`${CLIENTS_API}/${id}`, data);
  }

  delete(id) {
    return http.delete(`${CLIENTS_API}/${id}`);
  }

  deleteAll() {
    return http.delete(CLIENTS_API);
  }

  search(string) {
    return http.get(`${CLIENTS_API}/search?q=${string}`);
  }
}

// eslint-disable-next-line
export default new ClientService();