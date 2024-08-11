import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/v1/event`;

export const listEvents = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data.events;
};

export const createEvent = async (name: string, dates: string[]) => {
  const response = await axios.post(API_URL, { name, dates });
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addVotes = async (id: string, name: string, votes: string[]) => {
  const response = await axios.post(`${API_URL}/${id}/vote`, { name, votes });
  return response.data;
};

export const getEventResults = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}/results`);
  return response.data;
};
