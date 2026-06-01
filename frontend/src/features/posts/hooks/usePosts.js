import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setLoading, setError, addPost } from '../state/post.slice';
import postService from '../service/post.service';

export const usePosts = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.post);

    const fetchPosts = async () => {
        dispatch(setLoading(true));
        try {
            const data = await postService.getAllPosts();
            dispatch(setPosts(data));
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch posts'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCreatePost = async (postData) => {
        dispatch(setLoading(true));
        try {
            const newPost = await postService.createPost(postData);
            dispatch(addPost(newPost));
            return newPost;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to create post'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchPostById = async (id) => {
        dispatch(setLoading(true));
        try {
            const post = await postService.getPostById(id);
            return post;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to fetch post'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    }

    const likePost = async (id) => {
        dispatch(setLoading(true));
        try {
            const post = await postService.likePost(id);
            return post;
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Failed to like post'));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        posts,
        loading,
        error,
        fetchPosts,
        handleCreatePost,
        fetchPostById,
        likePost,
    };
};
