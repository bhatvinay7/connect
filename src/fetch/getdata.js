import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../DB/useAxiosPrivate';

const useGetResource = (id) => {
    const [data, setData] = useState({});
   // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPrivate = useAxiosPrivate(); // Get axiosPrivate inside the hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(id ? `/api/coderesource/${id}` : "/api/coderesource");
                setData(response.data);
            } catch (err) {
                setError(err);
            }    
            // } finally {
            //     setLoading(false);
            // }
        };
        fetchData();
    }, [id, axiosPrivate]);

    return { data,error };
};

// const useGetEvents = (id) => {
//     const [data, setData] = useState({});
//    // const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const axiosPrivate = useAxiosPrivate(); // Get axiosPrivate inside the hook

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosPrivate.get(id ? `/api/event/${id}` : "/api/event");
//                 console.log(response.data);
//                 setData(response.data);
//             } catch (err) {
//                 setError(err);
//             }    
//             // } finally {
//             //     setLoading(false);
//             // }
//         };
//         fetchData();
//     }, [id, axiosPrivate]);

//     return { data,error };
// };

export { useGetResource };
