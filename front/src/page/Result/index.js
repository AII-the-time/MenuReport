import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContentsWrapper } from '../../components';
import axios from 'axios';

export default function(){
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    useEffect(() => {
        const setDefault = async () => {
            try{
                const response = await axios.get(`/api/report?userId=${searchParams.get('userId')}`);
                setResult(response);
                setLoading(false);                
            }catch(e){
                console.log(e);
            }
        }
        setDefault();
    },[]);

    if(loading){
        return <div>loading...</div>
    }
    
    return (
        <ContentsWrapper>
            <div>
                {JSON.stringify(result)}
            </div>
        </ContentsWrapper>
    );
}
