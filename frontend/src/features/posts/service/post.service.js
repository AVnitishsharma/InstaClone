import axiosInstance from './axiosinstance';

const postService = {
    getAllPosts: async () => {
        const response = await axiosInstance.get('/');
        return response.data;
    },
    createPost: async (postData) => {
        const response = await axiosInstance.post('/create', postData);
        return response.data;
    },
    getPostById: async (id) => {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    },
    likePost: async (id) => {
        const response = await axiosInstance.post(`/${id}/like`);
        return response.data;
    },
};

export default postService;
