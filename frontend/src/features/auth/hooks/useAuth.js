import {register, login} from '../service/axiosInstance';
import {setUser, setLoading, setError} from '../state/auth.slice';
import {useDispatch} from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  async function handleRegister({ username, email, password }) {
    dispatch(setLoading(true));
    try {
      const user = await register({ username, email, password });
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    dispatch(setLoading(true));
    try {
      const user = await login({ email, password });
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {handleRegister, handleLogin};
}