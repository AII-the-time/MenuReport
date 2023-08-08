import { useState, useEffect } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ContentsWrapper } from '../../components';
import { LinkButton, PlusButton,TwoInputWithLabel,SelectAndInput, LabelWithTooltip,OpenWrapper,MenuWrapper,BorderDiv } from './components';
import MaterialInput from './MaterialInput';

export default function App() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [nextLoding, setNextLoding] = useState(false);
  const [menu, setMenu] = useState([]);
  const [wonduKind, setWonduKind] = useState([]);
  const [milkKind, setMilkKind] = useState([]);
  const [pojangjaeKind, setPojangjaeKind] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const setDefault = async () => {
      try {
        const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
        if(!response.data){
          navigate('/?userId='+searchParams.get('userId'));
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
        alert('서버에 문제가 있습니다. 다시 시도해주세요.');
        navigate('/Input?userId='+searchParams.get('userId'));
      }
    };
    setDefault();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();
    setNextLoding(true);
    try{
      const response = await axios.get(`/api/user/load/${searchParams.get('userId')}`);
      if(menu.some(_ => _.recipe.some(item => Object.values(item).some(_ => _ ==="")))){
        const confirm = window.confirm('추가재료 중 1회 사용량이 입력되지 않은 항목은 삭제됩니다. 계속하시겠습니까?');
        if(!confirm){
          setNextLoding(false);
          return;
        }
      }
      if(menu.some(item => item.menuName === ""
        || item.menuPrice === ""
        || (item.milk.name !== '사용안함' && item.milk.weight === '')
        || (item.wondu.name !== '사용안함' && item.wondu.weight === ''))){
          const confirm = window.confirm('메뉴 이름, 메뉴 가격이 입력되지 않았거나 원두/우유를 선택하였으나 1회 사용량이 입력되지 않은 항목은 삭제됩니다. 계속하시겠습니까?');
          if(!confirm){
            setNextLoding(false);
            return;
          }
      }
      const filterdMenu = menu.map(_ => ({
        ..._,
        recipe: _.recipe.filter(item => Object.values(item).every(_ => _ !== ""))
      })).filter(_ => _.menuName !== ""
        && _.menuPrice !== ""
        && (_.milk.name === '사용안함' || _.milk.weight !== '')
        && (_.wondu.name === '사용안함' || _.wondu.weight !== ''));
      const requestData = {
        userId: searchParams.get('userId'),
        data:{
          ...response.data,
          menu: filterdMenu
        }
      };
      await axios.post('/api/user/save', requestData);
    }catch(e){
      setNextLoding(false);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    navigate(`/Result?userId=${searchParams.get('userId')}`);
  };

  const updateMenu = (index,name,value ) => {
    const newMenu = [...menu];
    newMenu[index][name] = value;
    setMenu(newMenu);
  };


  if (loading) return <ContentsWrapper>로딩중...</ContentsWrapper>;

  return (
    <ContentsWrapper>
      {menu.map((item, index) => (
        <BorderDiv key={index}> 
          <OpenWrapper onClick={(e)=>{
            e.preventDefault();
            setCurIndex(index);
          }} open={curIndex !== index}>
            <div>
              <span>{item.menuName}</span>
              <span>{Number(item.menuPrice).toLocaleString("ko-KR")}원</span>
            </div>
            <div></div>
          </OpenWrapper>
          <MenuWrapper open={curIndex === index}>
            <TwoInputWithLabel>
              <div>
                <label>메뉴 이름</label>
                <input name="menuName" type="text" onChange={(e)=>{updateMenu(index,"menuName",e.target.value)}} defaultValue={item.menuName} />
              </div>
              <div>
                <label>메뉴 가격</label>
                <div>
                  <input name="menuPrice" type="number" onChange={(e)=>{updateMenu(index,"menuPrice",e.target.value)}} defaultValue={item.menuPrice} />
                  <span>원</span>
                </div>
              </div>
            </TwoInputWithLabel>
            <SelectAndInput>
              <label>원두</label>
              <div>
                {[...wonduKind,{name:'사용안함'}].map((it, i) => (
                  <div key={i} onClick={(e)=>{
                    e.preventDefault();
                    updateMenu(index,"wondu",{name:it.name,weight:''});
                  }} style={{backgroundColor:it.name === item.wondu.name ? 'var(--main-color)' : 'white', color:it.name === item.wondu.name ? 'white' : 'black'}}>
                    {it.name}
                  </div>
                ))}
              </div>
              <div>
                <label>1회 사용량</label>
                <input name="wonduWeight" type="number" onChange={(e)=>{updateMenu(index,"wondu",{...item.wondu,weight:e.target.value})}} defaultValue={item.wondu.weight} />
                <span>g</span>
              </div>
            </SelectAndInput>
            <SelectAndInput>
              <label>우유</label>
              <div>
                {[...milkKind,{name:'사용안함'}].map((it, i) => (
                  <div key={i} onClick={(e)=>{
                    e.preventDefault();
                    updateMenu(index,"milk",{name:it.name,weight:''});
                  }} style={{backgroundColor:it.name === item.milk.name ? 'var(--main-color)' : 'white', color:it.name === item.milk.name ? 'white' : 'black'}}>
                    {it.name}
                  </div>
                ))}
              </div>
              <div>
                <label>1회 사용량</label>
                <input name="milkWeight" type="number" onChange={(e)=>{updateMenu(index,"milk",{...item.milk,weight:e.target.value})}} defaultValue={item.milk.weight} />
                <span>ml</span>
              </div>
            </SelectAndInput>
            <SelectAndInput>
              <label>포장재</label>
              <div>
                {pojangjaeKind.map(e=>e.name).map((it, i) => (
                  <div key={i} onClick={(e)=>{
                    e.preventDefault();
                    const newMenu = [...menu];
                    if(newMenu[index].pojangjae.includes(it)){
                      newMenu[index].pojangjae = newMenu[index].pojangjae.filter((item)=>item !== it);
                    }else{
                      newMenu[index].pojangjae.push(it);
                    }
                    setMenu(newMenu);
                  }} style={{backgroundColor:item.pojangjae.includes(it) ? 'var(--main-color)' : 'white', color:item.pojangjae.includes(it) ? 'white' : 'black'}}>
                    {it}
                  </div>
                ))}
              </div>
            </SelectAndInput>
            <LabelWithTooltip>
              추가 재료
              <div className="material-icons">
                help_outline
                <div>
                  <p>재료 이름이나 브랜드명으로 검색하시면 CNT 마트에서 구매 가능한 재료를 찾아드립니다.</p>
                  <p>단어 단위로 띄어쓰기 하시면 더 많은 검색 결과를 보실 수 있습니다.</p>
                </div>
              </div>
            </LabelWithTooltip>
            {[...item.recipe.filter(item => item.name !== ''), {"name":"", "volume":"", "unit": ""}].map((it, i) => (
              <MaterialInput key={i} item={it} setMenu={(item)=>{
                const newMenu = [...menu];
                newMenu[index].recipe[i] = item;
                setMenu(newMenu);
              }}/>
            ))}
          </MenuWrapper>
        </BorderDiv>)
      )}
      <PlusButton onClick={(e) => {
        e.preventDefault();
        setMenu([...menu, {
          menuName: '',
          menuPrice: '',
          wondu: {name:'사용안함',weight:''},
          milk: {name:'사용안함',weight:''},
          pojangjae: [],
          recipe: [],
        }]);
        setCurIndex(menu.length);
      }}>+ 메뉴 추가</PlusButton>
      <LinkButton onClick={nextLoding ? (e)=>{e.preventDefault()} : onClick} type="submit">
        {nextLoding ? '메뉴 리포트 생성 중...' : '다음으로'}
      </LinkButton>
    </ContentsWrapper>
  );
}
