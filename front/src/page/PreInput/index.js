import { useState, useEffect } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import {ContentsWrapper, Title} from '../../components';
import { LinkButton, PlusButton, Label, Wondu, Milk, Pojangjae } from './components';
import axios from 'axios';

export default function(){
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [nextLoding, setNextLoading] = useState(false);
    const [wondu, setWondu] = useState([]);
    const [milk, setMilk] = useState([]);
    const [pojangjae, setPojangjae] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const setDefault = async () => {
            try{
                const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
                if(!response.data){
                    setWondu([{name:'',weight:'',price:''}]);
                    setMilk([{name:'',weight:'',price:''}]);
                    setPojangjae([{name:'',count:'',price:''}]);
                    setLoading(false);
                    return;
                }
                setWondu(response.data.wondu);
                setMilk(response.data.milk);
                setPojangjae(response.data.pojangjae);
                setLoading(false);
            }catch(e){
                alert('서버에 문제가 있습니다. 다시 시도해주세요.');
                navigate(`/?userId=${searchParams.get('userId')}`);
            }
        }
        setDefault();
    },[]);

    const onClick = async (e) => {
        e.preventDefault();
        setNextLoading(true);
        try{
            const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
            const requestData = {
                userId: searchParams.get('userId'),
                data:{
                    ...response.data,
                    wondu: wondu,
                    milk: milk,
                    pojangjae: pojangjae
                }
            };
            
            console.log(requestData);

            await axios.post('/api/user/save', requestData);
        }catch(e){
            setNextLoading(false);
            alert('저장에 실패했습니다. 다시 시도해주세요.');
            return;
        }
        navigate(`/Input?userId=${searchParams.get('userId')}`);
    }

    if(loading) return <ContentsWrapper>로딩중...</ContentsWrapper>;

    return (
        <ContentsWrapper>
            <Title>
                메뉴 입력에 앞서 자주 사용하는 항목들에 대한 정보를 입력해주세요.
            </Title>
            <form>
                <Label>
                    원두
                    <div className="material-icons">
                        help_outline
                        <div>
                            <span>원두명: </span>
                            <span>알아보기 쉬운 이름으로</span>
                            <span>용량과 가격: </span>
                            <span>해당 용량에 대한 가격</span>
                            <span style={{gridColumn:"2/3", fontSize:"0.8rem"}}>ex) 1kg에 10,000원이면 1000g과 10000을 입력해주세요.</span>
                        </div>
                    </div>
                </Label>
                {
                    wondu.map((_, i) =>
                        <Wondu key={i} name={_.name} weight={_.weight} price={_.price}
                            setWondu={(name,value)=>{
                                const newWondu = [...wondu];
                                newWondu[i][name] = value;
                                setWondu(newWondu);
                            }}
                        />
                    )
                }
                <PlusButton onClick={(e) => {e.preventDefault(); setWondu([...wondu,{name:'',weight:'',price:''}])}}>+ 원두 추가하기</PlusButton>
                <Label>
                    우유
                    <div className="material-icons">
                        help_outline
                        <div>
                            <span>우유 종류: </span>
                            <span>알아보기 쉬운 이름으로</span>
                            <span>용량과 가격: </span>
                            <span>해당 용량에 대한 가격</span>
                            <span style={{gridColumn:"2/3", fontSize:"0.8rem"}}>ex) 1L에 10,000원이면 1000ml와 10000을 입력해주세요.</span>
                        </div>
                    </div>
                </Label>
                {
                    milk.map((_,i) => <Milk key={i} name={_.name} weight={_.weight} price={_.price}
                        setMilk={(name,value)=>{
                            const newMilk = [...milk];
                            newMilk[i][name] = value;
                            setMilk(newMilk);
                        }}
                    />)
                }
                <PlusButton onClick={(e) => {e.preventDefault(); setMilk([...milk,{name:'',weight:'',price:''}])}}>+ 우유 추가하기</PlusButton>
                <div style={{height:"25px"}}></div>
                <Label>
                    포장재
                    <div className="material-icons">
                        help_outline
                        <div>
                            <span>포장재: </span>
                            <span>알아보기 쉬운 이름으로</span>
                            <span>용량과 가격: </span>
                            <span>해당 용량에 대한 가격</span>
                            <span style={{gridColumn:"2/3", fontSize:"0.8rem"}}>ex) 100개에 5,000원이면 100개와 5000을 입력해주세요.</span>
                        </div>
                    </div>
                </Label>
                {
                    pojangjae.map((_,i) => <Pojangjae key={i} name={_.name} count={_.count} price={_.price}
                        setPojangjae={(name,value)=>{
                            const newPojangjae = [...pojangjae];
                            newPojangjae[i][name] = value;
                            setPojangjae(newPojangjae);
                        }
                    }/>)
                }
                <PlusButton onClick={(e) => {e.preventDefault(); setPojangjae([...pojangjae,{name:'',count:'',price:''}])}}>+ 포장재 추가하기</PlusButton>
                <LinkButton onClick={nextLoding ? (e)=>{e.preventDefault()} : onClick} type="submit">
                    {nextLoding ? '메뉴 불러오는 중...' : '다음으로'}
                </LinkButton>
            </form>
        </ContentsWrapper>
    );
}
