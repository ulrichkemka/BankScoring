import axios from 'axios'
import { Client } from '../models/client'

const API_URL = import.meta.env.VITE_BACKEND_API_URL

class ClientService {
  async getClient(clientId: int): Promise<Client> {
    const response = await axios.get(API_URL + `clients/${clientId}`)
    return response.data
  }

  async getClients(): Promise<Array<Client>> {
    const response = await axios.get(API_URL + 'clients')
    return response.data
  }

  async registerClient(client: Client) {
    const response = await axios.post(API_URL + 'clients', client)
    return response.data
  }

  async updateClient(clientId: int, client: Client): Promise<Client> {
    const response = await axios.patch(API_URL + `clients/${clientId}`, client)
    return response.data
  }

  async deleteClient(clientId: int) {
    const response = await axios.delete(API_URL + `clients/${clientId}`)
    return response.data
  }
}

export default new ClientService()
