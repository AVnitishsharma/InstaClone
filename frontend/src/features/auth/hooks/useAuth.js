import { register, login } from '../service/axiosInstance';
import { setUser, setLoading, setError } from '../state/auth.slice';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const token = user?.token;

  async function handleRegister({ username, email, password }) {
    dispatch(setLoading(true));
    try {
      const response = await register({ username, email, password });
      dispatch(setUser(response.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ identifier, password }) {
    dispatch(setLoading(true));
    try {
      const result = await login({ identifier, password });
      dispatch(setUser(result.user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return { handleRegister, handleLogin, loading, error, token, user };
}