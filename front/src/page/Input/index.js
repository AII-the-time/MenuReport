import { useState, useRef, useEffect } from 'react';
import {useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ContentsWrapper } from '../../components';
import { LinkButton, PlusButton,TwoInputWithLabel, LabelWithTooltip } from './components';

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
  const [nextLoding, setNextLoding] = useState(false);

  const onClick = () => {
    setNextLoding(true);
  };
  return (
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
      <PreInput>
        원두
        <ChooseOption>
          <Option>
            <OptionList>
              <tr>
                <Input type="checkbox" />
                에티오피아
              </tr>
              <tr>
                <Input type="checkbox" />
                콜롬비아
              </tr>
              <tr>
                <Input type="checkbox" />
                사용안함
              </tr>
            </OptionList>
          </Option>
          <Amount>
            <Input />g
          </Amount>
        </ChooseOption>
      </PreInput>
      <PreInput>
        우유
        <ChooseOption>
          <Option>
            <OptionList>
              <tr>
                <Input type="checkbox" />
                에티오피아
              </tr>
              <tr>
                <Input type="checkbox" />
                콜롬비아
              </tr>
              <tr>
                <Input type="checkbox" />
                사용안함
              </tr>
            </OptionList>
          </Option>
          <Amount>
            <Input />g
          </Amount>
        </ChooseOption>
      </PreInput>
      <PreInput>
        포장재
        <ChooseOption>
          <Option>
            <OptionList>
              <td>
                <Input type="checkbox" />
                음료용
              </td>
              <td>
                <Input type="checkbox" />
                디저트 박스
              </td>
              <td>
                <Input type="checkbox" />
                사용안함
              </td>
            </OptionList>
          </Option>
        </ChooseOption>
      </PreInput>
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
  );
}
