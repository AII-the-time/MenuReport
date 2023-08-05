//import "./App.css";
//import AllRecipeContainer from "./RecipeInput";
import { Link } from "react-router-dom";
import Recipe from "./RecipeController";
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

export default function App() {
  return (
    <div className="App">
      <Recipe />
    </div>
  );
}
