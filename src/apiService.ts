import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/event`;

// Creating an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach the token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage or use context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 
 * @returns The data (events) fetched out the API.
 */
export const getEvents = async () => {
  const response = await api.get('/list');
  return response.data.events;
};

/**
 * 
 * @param name - The name parameter.
 * @param dates - The dates parameter
 * @returns response.data - The data fetched out the API.
 */

export const createEvent = async (name: string, dates: string[]) => {
  const response = await api.post('/', { name, dates });
  return response.data;
};

/**
 * 
 * @param id - The unique id.
 * @returns Object - The object with the required format.
 */
export const getEventById = async (id: string) => {
  const response = await api.get(`/${id}`);
  const event = response.data;
  // Map the response to match the expected format
  return {
    id: event.id,
    name: event.name,
    dates: event.dates,
    votes: event.votes.map((vote: any) => ({
      date: vote.date,
      people: vote.people,
    })),
  };
};

/**
 * 
 * @param id - The unique id.
 * @param name - The name parameter.
 * @param votes - The votes string array.
 * @returns Object - The object with the required format.
 */

export const addVotes = async (id: string, name: string, votes: string[]) => {
  const response = await api.post(`/${id}/vote`, { name, votes });
  const event = response.data;
  // Map the response to match the expected format
  return {
    id: event.id,
    name: event.name,
    dates: event.dates,
    votes: event.votes.map((vote: any) => ({
      date: vote.date,
      people: vote.people,
    })),
  };
};

/**
 * 
 * @param id - The unique to fetch the result.
 * @returns response.data - The data fetched out the API.
 */

export const getEventResults = async (id: string) => {
  const response = await api.get(`/${id}/results`);
  return response.data;
};
