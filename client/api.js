export axios from 'axios';

const API = {
    test: {
        exampleGet: (settings) => axios.get('/api/admin/r-action', {params: {...settings}}).then(res => res.data),
        examplePost: (valName) => axios.post('/api/example/cud-action', {valName}).then(res => res.data),
    },
};