import "./App.css";
import AllRecipeContainer from "./Recipe1";

function App() {
  return (
    <div className="App">
      <AllRecipeContainer />
      <div class="btn_area">
        <button type="button" className="btnactive">
          <span>레포트 만들기!</span>
        </button>
      </div>
    </div>
  );
}

export default App;
