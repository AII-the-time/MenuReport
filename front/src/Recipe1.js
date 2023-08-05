import React, { Component } from "react";
import RecipeComponet from "./RecipeComponent";

class AllRecipeContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      inputMenus: [
        {
          id: 0,
          menuName: "",
          menuPrice: "",
        },
      ],
      inputAddId: 1,
    };
  }

  addMenu() {
    const { inputMenus, inputAddId } = this.state;
    const newMenu = {
      id: inputAddId,
      menuName: "",
      menuPrice: "",
    };
    this.setState({
      inputMenus: [...inputMenus, newMenu],
      inputAddId: inputAddId + 1,
    });
  }
  // 렌더링 메서드
  render() {
    const { inputMenus, inputAddId } = this.state;

    return (
      <div>
        {inputMenus.map((item, index) => (
          <RecipeComponet inputItems={item} />
        ))}
        <button className="btnplus" onClick={() => this.addMenu()}>
          메뉴 추가하기
        </button>
      </div>
    );
  }
}

export default AllRecipeContainer;
