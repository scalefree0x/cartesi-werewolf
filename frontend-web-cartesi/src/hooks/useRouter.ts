import React, { useMemo } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router';

export const useRouter = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return useMemo(() => ({
        location,
        navigate,
        params,
    }), []);

}
