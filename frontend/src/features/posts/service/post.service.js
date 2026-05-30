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
};

export default postService;
