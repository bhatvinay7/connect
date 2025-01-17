import axios from './axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
          //  console.log(JSON.stringify(prev));
           
            return { userId:response.data.userId, accessToken: response.data.accessToken,roles:response.data.roles}
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
