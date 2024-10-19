import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth-context';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';
import axios from 'axios';
const PrivateEdit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { product_id } = useParams();
    const [isOwner,setIsOwner]=useState(false);
    useEffect(() => {
        const fetchIsOwner = async () => {
            // Fetch data from the server to determine ownership
            axios.get(`http://localhost:8000/products/${product_id}/checkOwnership`)
                .then(response => {
                    if (response.data.Error) {
                        setIsOwner(false);
                        setIsLoading(false);
                    }
                    else {
                        if (response.data.isOwner === 1) {
                            setIsOwner(true);
                            setIsLoading(false);
                        }
                        else {
                            setIsOwner(false);
                            setIsLoading(false);
                        }
                    }
                })
                .catch(error => {
                    setIsOwner(false);
                    console.error('Error checking ownership:', error);
                });
        }
        fetchIsOwner();
    }, [])
    if (isLoading)
        return (
            <LoadingPage />)

    return (
        isOwner ? <Outlet /> : <Navigate to='/' />
    )
}
export default PrivateEdit;