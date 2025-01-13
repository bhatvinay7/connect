import myaxios from './axios.js'
import useAuth from './useAuth.js'

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await myaxios.get('/api/refresh', {
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
