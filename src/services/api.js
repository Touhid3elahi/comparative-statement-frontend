import axios from "axios";
import { getToken, destroyToken } from "./TokenHandler";

class APIRequest {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://127.0.0.1:8000', // Set your default base URL here
      headers: {
        "Authorization": `Bearer ${getToken()}`, // Set authorization header
        "Content-Type": "application/json",
      },
    });
  }

  async get(slug = "") {
    try {
      const url = `${slug}`;
      console.log("GET request to:", url);
      const response = await this.api.get(slug);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        destroyToken();
      }

      return error.response;
    }
  }

  // Implement other CRUD methods in a similar fashion

  async post(slug, params) {
    try {
      const response = await this.api.post(slug, params);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        destroyToken();
      }

      return error.response;
    }
  }

  async put(slug, params) {
    try {
      const response = await this.api.put(slug, params);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        destroyToken();
      }

      return error.response;
    }
  }

  async formUpdate(slug, params) {
    try {
      const response = await this.api.post(slug, params);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        destroyToken();
      }

      return error.response;
    }
  }

  async delete(slug) {
    try {
      const response = await this.api.delete(slug);

      return response;
    } catch (error) {
      if (error.response.status === 401) {
        destroyToken();
      }

      return error.response;
    }
  }
}

export default new APIRequest();
