import React, { useState } from "react";
import InputComponent from "./InputComponent";
import FindMaterial from "./FindMaterial";
import styled from "styled-components";

const RecipeComponent = ({ inputRecipes, preInput }) => {
  const [inputItems, setInputItems] = useState([
    {
      id: 0,
      elementName: "",
      elementAmount: "",
      elementPrice: "",
      elementUnit: "",
    },
  ]);

  const [inputAddId, setInputAddId] = useState(1);

  const addElement = (items) => {
    const newItem = {
      id: inputAddId,
      elementName: "",
      elementAmount: "",
      elementUnit: items.volume === 0 ? "개" : items.unit,
    };
    setInputItems([...inputItems, newItem]);
    setInputAddId(inputAddId + 1);
  };

  const ElementDelete = (id) => {
    setInputItems(inputItems.filter((item) => item.id !== id));
  };

  const onChange = (e, id) => {
    const { name, value } = e.target;
    setInputItems(
      [...inputItems].map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  return (
    <MenuRecipe>
      <MenuInfo>
        <MenuName>
          메뉴 이름
          <Input type="text" maxlength="20" />
        </MenuName>
        <MenuPrice>
          판매 가격
          <Input type="text" maxlength="20" /> 원
        </MenuPrice>
      </MenuInfo>
      <PreInput>
        원두
        <ChooseOption>
          <Option>
            <OptionList>
              {/* {preInput.map((item, index) => (
                <tr>
                  <Input type="checkbox" />
                  {item}
                </tr>
              ))} */}
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
                우유
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
      {console.log("origininputItems")}
      {console.log(inputItems)}
      <InputComponent
        inputItems={inputItems}
        InputDelete={ElementDelete}
        onChange={onChange}
      />
      <Btn onClick={addElement}>추가</Btn>
    </MenuRecipe>
  );
};

export default RecipeComponent;

const MenuRecipe = styled.div``;
const MenuInfo = styled.div`
  display: flex;
`;
const MenuName = styled.span`
  align-items: center;
  padding: 5px;
  display: flex;
`;
const MenuPrice = styled.span`
  align-items: center;
  padding: 10px;
  display: flex;
`;
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
const Btn = styled.button``;
