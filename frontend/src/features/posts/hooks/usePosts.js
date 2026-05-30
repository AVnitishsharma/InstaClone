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

    return {
        posts,
        loading,
        error,
        fetchPosts,
        handleCreatePost,
    };
};
