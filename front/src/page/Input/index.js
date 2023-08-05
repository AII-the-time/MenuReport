import { useState, useEffect } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ContentsWrapper } from '../../components';
import { LinkButton, PlusButton,TwoInputWithLabel,SelectAndInput, LabelWithTooltip } from './components';

const PreInput = styled.div`
  display: flex;
  margin: 10px;
`;
const Input = styled.input`
  margin: 5px;
`;
const ChooseOption = styled.div`
  display: flex;
  margin: 20px 10px 10px 10px;
`;
const Option = styled.span``;
const OptionList = styled.table``;
const Amount = styled.span`
  padding: 5px;
`;
const RecipeInput = styled.div``;
const Btn = styled.button``;

export default function App() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [nextLoding, setNextLoding] = useState(false);
  const [menu, setMenu] = useState([]);
  const [wonduKind, setWonduKind] = useState([]);
  const [milkKind, setMilkKind] = useState([]);
  const [pojangjaeKind, setPojangjaeKind] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const setDefault = async () => {
      try {
        const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
        if(!response.data){
          window.location.href = '/?userId='+searchParams.get('userId');
          return;
        }
        setWonduKind(response.data.wondu);
        setMilkKind(response.data.milk);
        setPojangjaeKind(response.data.pojangjae);
        if (!response.data.menu) {
          setMenu([{
            menuName: '',
            menuPrice: '',
            wondu: {name:'사용안함',weight:''},
            milk: {name:'사용안함',weight:''},
            pojangjae: [],
            recipe: [],
          }]);
          setLoading(false);
          return;
        }
        setMenu(response.data.menu);
        setLoading(false);
      } catch (e) {
        window.location.reload();
      }
    };
    setDefault();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();
    setNextLoding(true);
    try{
      const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
      const requestData = {
        userId: searchParams.get('userId'),
        data:{
          ...response.data,
          menu: menu
        }
      };
      console.log(requestData);
      await axios.post('/api/user/save', requestData);
    }catch(e){
      setNextLoding(false);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    navigate(`/Input?userId=${searchParams.get('userId')}`);
  };

  if (loading) return <ContentsWrapper>로딩중...</ContentsWrapper>;

  return (
<<<<<<< HEAD
    <div className="App">
      <Recipe />
      <button type="button" className="btnactive">
        <Link to="/Result">레포트 만들기!</Link>
      </button>
    </div>
=======
    <ContentsWrapper>
      <TwoInputWithLabel>
        <div>
          <label>메뉴 이름</label>
          <input name="menuName" />
        </div>
        <div>
          <label>메뉴 가격</label>
          <div>
            <input name="menuPrice" type="number" />
            <span>원</span>
          </div>
        </div>
      </TwoInputWithLabel>
      <SelectAndInput>
        <label>원두</label>
        <div>
          {[...wonduKind,{name:'사용안함'}].map((item, index) => (
            <div key={index}>
              {item.name}
            </div>
          ))}
        </div>
        <div>
          <label>1회 사용량</label>
          <input name="wonduWeight" type="number" />
          <span>g</span>
        </div>
      </SelectAndInput>
      <SelectAndInput>
        <label>우유</label>
        <div>
          {[...milkKind,{name:'사용안함'}].map((item, index) => (
            <div key={index}>
              {item.name}
            </div>
          ))}
        </div>
        <div>
          <label>1회 사용량</label>
          <input name="milkWeight" type="number" />
          <span>ml</span>
        </div>
      </SelectAndInput>
      <SelectAndInput>
        <label>포장재</label>
        <div>
          {pojangjaeKind.map((item, index) => (
            <div key={index}>
              {item.name}
            </div>
          ))}
        </div>
      </SelectAndInput>
      <RecipeInput>
        <Input />
        <Amount>
          <Input />g
        </Amount>
      </RecipeInput>
      <PlusButton>+ 메뉴 추가</PlusButton>
      <LinkButton onClick={nextLoding ? (e)=>{e.preventDefault()} : onClick} type="submit">
        {nextLoding ? '메뉴 리포트 생성 중...' : '다음으로'}
      </LinkButton>
    </ContentsWrapper>
>>>>>>> 7dce9277f7be33586209ee2ad50fe4d278a28e06
  );
}
