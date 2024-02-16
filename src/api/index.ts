import axios, { AxiosInstance } from 'axios';

const API_ENDPOINT = 'https://pokeapi.co/api/v2/';

class AxiosSingleton {
  protected static instance: AxiosInstance;

  private constructor() { };

  public static getInstance(): AxiosInstance {
    if (!AxiosSingleton.instance) {
      AxiosSingleton.instance = axios.create({
        baseURL: API_ENDPOINT,
        timeout: 1500, // in milliseconds
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return AxiosSingleton.instance;
  }
}

export default AxiosSingleton.getInstance();
