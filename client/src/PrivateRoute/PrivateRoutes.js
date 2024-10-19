import { useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth-context';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';

const PrivateRoutes = () => {
    const { currentUser, isLoading } = useContext(AuthContext);
    if (isLoading)
        return (
            <LoadingPage />)

    return (
        currentUser ? <Outlet /> : <Navigate to='/register' />
    )
}
export default PrivateRoutes;