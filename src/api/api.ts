import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://training.nerdbord.io/api/v1',
});

API.interceptors.request.use((config) => {
	config.headers['Content-Type'] = 'application/json';
	config.headers['Authorization'] = `${import.meta.env.VITE_API_KEY_OPENAI}`;
	return config;
});
