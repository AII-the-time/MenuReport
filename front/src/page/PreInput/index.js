import { useState, useRef } from 'react';
import {redirect, useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ContentsWrapper,ButtonCSS,InputCSS, Title} from '../../component';

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

const Wondu = () => (
    <InputWrapper>
        <Input type="text" maxlength="10" placeholder="원두 이름"/>
        <InputWithUnit>
            <Input type="text" placeholder="용량(g)" />
            <span>g</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" />
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

const Milk = () => (
    <InputWrapper>
        <InputWithUnit>
            <Input type="text" placeholder="용량(ml)" />
            <span>ml</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" />
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

const Pojangjae = () => (
    <InputWrapper>
        <Input type="text" maxlength="10" placeholder="포장재 이름"/>
        <InputWithUnit>
            <Input type="text" placeholder="개수(개)" />
            <span>개</span>
        </InputWithUnit>
        <InputWithUnit>
            <Input type="text" placeholder="가격(원)" />
            <span>원</span>
        </InputWithUnit>
    </InputWrapper>
);

export default function(){
    const [searchParams] = useSearchParams();
    const [nextLoding, setNextLoading] = useState(false);
    const [wondu, setWondu] = useState(1);
    const [pojangjae, setPojangjae] = useState(1);
    const navigate = useNavigate();
    const formRef = useRef();
    const onClick = (e) => {
        e.preventDefault();
        setNextLoading(true);

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
                    [...Array(wondu)].map((_,i) => <Wondu key={i}/>)
                }
                <PlusButton onClick={(e) => {e.preventDefault(); setWondu(wondu + 1)}}>+ 원두 추가하기</PlusButton>
                <Label>
                    우유
                    <div className="material-icons">
                        help_outline
                        <div>
                            <span>용량과 가격: </span>
                            <span>해당 용량에 대한 가격</span>
                            <span style={{gridColumn:"2/3", fontSize:"0.8rem"}}>ex) 1L에 10,000원이면 1000ml와 10000을 입력해주세요.</span>
                        </div>
                    </div>
                </Label>
                <Milk/>
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
                    [...Array(pojangjae)].map((_,i) => <Pojangjae key={i}/>)
                }
                <PlusButton onClick={(e) => {e.preventDefault(); setPojangjae(pojangjae + 1)}}>+ 포장재 추가하기</PlusButton>
                <LinkButton onClick={nextLoding ? null : onClick} type="submit">
                    {nextLoding ? '메뉴 불러오는 중...' : '다음으로'}
                </LinkButton>
            </form>
        </ContentsWrapper>
    );
}
