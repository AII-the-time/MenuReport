import styled from 'styled-components';
import { ButtonCSS,InputCSS } from '../../components';

export const LinkButton = styled.button`
    ${ButtonCSS}
    margin: 30px 0 0 auto;
`;

export const PlusButton = styled.button`
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

export const Label = styled.label`
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

export const Wondu = ({name,weight,price,setWondu}) => (
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

export const Milk = ({name,weight,price,setMilk}) => (
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

export const Pojangjae = ({name,count,price,setPojangjae}) => (
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
