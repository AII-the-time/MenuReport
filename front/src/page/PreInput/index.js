import { useState, useRef, useEffect } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ContentsWrapper,ButtonCSS,InputCSS, Title} from '../../component';
import axios from 'axios';

const LinkButton = styled.button`
    ${ButtonCSS}
    margin: 30px 0 0 auto;
`;

const PlusButton = styled.button`
    ${ButtonCSS}
}`;

const InputWrapper = styled.div`
    display: flex;
    gap: 10px;
    >*{
        width: 1%;
        flex: 1 1 0;
    }
    margin: 6px 0 16px 0;
`;

const Input = styled.input`
    ${InputCSS}
    margin: 0;
`;

const InputWithUnit = styled.div`
    position: relative;
    display: flex;
    > input {
        ${InputCSS}
        width: 100%;
        margin: 0;
    }
    > span {
        display: block;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Label = styled.label`
    margin: 10px 0 6px 0;
    font-size: 1.15rem;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    position: relative;
    > .material-icons {
        font-size: 1.15rem;
        > div {
            font-family: 'Noto Sans KR', sans-serif;
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            white-space: wrap;
            word-break: keep-all;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            z-index: 1;
            line-height: normal;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
            font-size: 1rem;
        }
    }
    > .material-icons:hover {
        > div {
            display: grid;
        }
    }
`;

const Wondu = ({name,weight,price,setWondu}) => (
    <InputWrapper>
        <Input type="text" maxLength="10" placeholder="원두 이름" name="wonduName" defaultValue={name} onChange={(e)=>{setWondu('name',e.target.value)}}/>
        <InputWithUnit>
            <Input type="text" placeholder="용량(g)" name="wonduWeight" defaultValue={weight} onChange={(e)=>{setWondu('weight',e.target.value)}}/>
            <span>g</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" name="wonduPrice" defaultValue={price} onChange={(e)=>{setWondu('price',e.target.value)}}/>
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

const Milk = ({name,weight,price,setMilk}) => (
    <InputWrapper>
        <Input type="text" maxLength="10" placeholder="우유 종류(우유, 두유, 저지방 등)" name="milkName" defaultValue={name} onChange={(e)=>{setMilk('name',e.target.value)}}/>
        <InputWithUnit>
            <Input type="text" placeholder="용량(ml)" name="milkWeight" defaultValue={weight} onChange={(e)=>{setMilk('weight',e.target.value)}}/>
            <span>ml</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" name="milkPrice" defaultValue={price} onChange={(e)=>{setMilk('price',e.target.value)}}/>
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

const Pojangjae = ({name,count,price,setPojangjae}) => (
    <InputWrapper>
        <Input type="text" maxLength="10" placeholder="포장재 이름" name="pojangjaeName" defaultValue={name} onChange={(e)=>{setPojangjae('name',e.target.value)}}/>
        <InputWithUnit>
            <Input type="text" placeholder="개수(개)" name="pojangjaeCount" defaultValue={count} onChange={(e)=>{setPojangjae('count',e.target.value)}}/>
            <span>개</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" name="pojangjaePrice" defaultValue={price} onChange={(e)=>{setPojangjae('price',e.target.value)}}/>
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

export default function(){
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [nextLoding, setNextLoading] = useState(false);
    const [wondu, setWondu] = useState([]);
    const [milk, setMilk] = useState([]);
    const [pojangjae, setPojangjae] = useState([]);
    const navigate = useNavigate();
    const formRef = useRef();

    useEffect(() => {
        const setDefault = async () => {
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
        }
        setDefault();
    },[]);

    const onClick = async (e) => {
        e.preventDefault();
        setNextLoading(true);
        const formData = new FormData(formRef.current);
        const data = {};
        for(let [key, value] of formData.entries()){
            data[key]? data[key].push(value) : data[key] = [value];
        }
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
        navigate(`/Input?userId=${searchParams.get('userId')}`);
    }

    return (
        <ContentsWrapper>
            <Title>
                메뉴 입력에 앞서 자주 사용하는 항목들에 대한 정보를 입력해주세요.
            </Title>
            <form ref={formRef}>
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
