import React, { useState } from "react";
import RecipeComponet from "./RecipeComponent";
import styled from "styled-components";

const RecipeContainer = () => {
  const [inputMenus, setInputMenus] = useState([
    {
      id: 0,
      menuName: "",
      menuPrice: "",
    },
  ]);

  const [inputAddId, setInputAddId] = useState(1);

  const addMenu = () => {
    const newMenu = {
      id: inputAddId,
      menuName: "",
      menuPrice: "",
    };
    setInputMenus([...inputMenus, newMenu]);
    setInputAddId(inputAddId + 1);
  };

  return (
    <div>
      {inputMenus.map((item, index) => (
        <RecipeComponet inputRecipes={item} />
      ))}
      <Btn onClick={() => addMenu()}>메뉴 추가하기</Btn>
    </div>
  );
};

export default RecipeContainer;

const Btn = styled.button``;
