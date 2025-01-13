import {useContext} from 'react';
import AuthContext from '../Components/GlobalContext.jsx';
const useAuth=()=>{
    return useContext(AuthContext);

}
export default  useAuth;