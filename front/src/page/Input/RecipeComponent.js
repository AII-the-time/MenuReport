import React, { Component } from "react";
import InputComponent from "./InputComponent";
import FindMaterial from "./FindMaterial";

class RecipeComponet extends Component {
  constructor(props) {
    super();
    this.state = {
      inputItems: [
        {
          id: 0,
          elementName: "",
          elementAmount: "",
          elementPrice: "",
          elementUnit: "",
        },
      ],
      inputAddId: 1,
    };
  }

  addFunction = (items) => {
    console.log(items);
    const { inputItems, inputAddId } = this.state;
    const newItem = {
      id: inputItems.length,
      elementName: items.name,
      elementAmount: "",
      elementUnit: items.volume === 0 ? "개" : items.unit,
    };
    this.setState({
      inputItems: [...inputItems, newItem],
      inputAddId: inputAddId + 1,
    });
  };
  // input 추가하기
  AddInput = () => {
    const { inputItems, inputAddId } = this.state;

    const input = {
      id: inputAddId,
      elementName: "",
      elementAmount: "",
      elementUnit: "",
    };

    this.setState({
      inputItems: inputItems.concat({
        ...input,
      }),
      inputAddId: inputAddId + 1,
    });
  };

  // input 삭제하기
  InputDelete = (id) => {
    const { inputItems } = this.state;

    this.setState(
      {
        inputItems: [],
      },
      () => {
        this.setState({
          inputItems: inputItems.filter((item) => item.id !== id),
        });
      }
    );
  };

  // input 입력 이벤트 핸들러
  onChange = (e, id) => {
    const { inputItems } = this.state;

    const data = {
      [e.target.name]: e.target.value,
    };

    this.setState({
      inputItems: inputItems.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    });
  };

  // 확인 버튼
  confirm = () => {
    const { inputItems } = this.state;

    console.log(inputItems);
  };

  // 렌더링 메서드
  render() {
    const { inputItems, inputAddId } = this.state;

    return (
      <div className="menu">
        <div>
          <div>
            <h3>
              <label for="id">메뉴 이름</label>
            </h3>
            <span class="box int_id">
              <input
                type="text"
                id="id"
                class="int"
                maxlength="20"
                name="menuName"
              ></input>
            </span>
            <span class="error_next_box"></span>
          </div>

          <div>
            <h3>
              <label for="id">메뉴 판매가</label>
            </h3>
            <span class="box int_id">
              <input type="text" id="id" class="int" maxlength="20"></input>
              <span class="step_url">원</span>
            </span>

            <span class="error_next_box"></span>
          </div>
          <h3>레시피 재료</h3>
          <InputComponent
            inputItems={inputItems}
            addInput={this.AddInput}
            InputDelete={this.InputDelete}
            onChange={this.onChange}
            confirm={this.confirm}
          />
          <FindMaterial addFunction={this.addFunction} />
        </div>
      </div>
    );
  }
}

export default RecipeComponet;
