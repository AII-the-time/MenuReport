import "./App.css";
import AllRecipeContainer from "./Recipe1";
import { Link } from "react-router-dom";

function App() {
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
}

export default App;
