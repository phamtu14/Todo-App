import axios from './custom-axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
};

const createUser = (firstName, lastName) => {
    return axios.post('/api/users', { firstName, lastName });
};

const updateUser = (firstName, lastName, id) => {
    return axios.put(`/api/users/${id}`, { firstName, lastName });
};

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
};

const loginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
};

export { fetchAllUser, createUser, updateUser, deleteUser, loginApi };
