import api from '../utils/api';

const uploadFile = async (formData) => {
  const response = await api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

const getFiles = async (params = {}) => {
  const response = await api.get('/files', { params });
  return response.data;
};

const getFile = async (fileId) => {
  const response = await api.get(`/files/${fileId}`);
  return response.data;
};

const searchFiles = async (params) => {
  const response = await api.get('/files/search', { params });
  return response.data;
};

const deleteFile = async (fileId) => {
  const response = await api.delete(`/files/${fileId}`);
  return response.data;
};

const incrementViewCount = async (fileId) => {
  const response = await api.put(`/files/${fileId}/view`);
  return response.data;
};

const fileService = {
  uploadFile,
  getFiles,
  getFile,
  searchFiles,
  deleteFile,
  incrementViewCount
};

export default fileService;
