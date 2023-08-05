//import "./App.css";
//import AllRecipeContainer from "./RecipeInput";
import { Link } from "react-router-dom";
import styled from "styled-components";
/*function App() {
  return (
    <div className="App">
      <AllRecipeContainer />
      <div class="btn_area">
        <button type="button" className="btnactive">
          <Link to="/Result">레포트 만들기!</Link>
        </button>
      </div>
    </div>
  );
}*/

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

export default function App() {
  return (
    <div className="App">
      <MenuRecipe>
        <MenuInfo>
          <MenuName>
            메뉴 이름
            <Input />
          </MenuName>
          <MenuPrice>
            가격
            <Input />
          </MenuPrice>
        </MenuInfo>
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
      </MenuRecipe>
    </div>
  );
}
