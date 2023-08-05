import React from "react";
import styled from "styled-components";

const InputComponent = ({ inputItems, InputDelete, onChange }) => {
  console.log("inputItems");
  console.log(inputItems);
  return (
    <div>
      {inputItems.map((item, index) => {
        console.log("item.elementName");
        console.log(item.elementName);
        return (
          <div>
            {index >= 0 ? (
              <AddInputComponent>
                <SearchElement>
                  <span class="box">
                    <input
                      type="text"
                      maxlength="10"
                      placeholder="재료를 검색해주세요"
                      defaultValue={item.elementName}
                      onChange={(e) => onChange(e, item.id)}
                    />
                  </span>
                </SearchElement>

                <AmountElement>
                  <span class="box">
                    <input
                      type="text"
                      maxlength="10"
                      placeholder="재료 사용량"
                      defaultValue={item.elementAmount}
                      onChange={(e) => onChange(e, item.id)}
                    />
                  </span>
                </AmountElement>
                <div>{item.elementUnit}</div>
                <MinusElement>
                  <button
                    onClick={() => InputDelete(item.id)}
                    className="btnoption"
                  >
                    {" "}
                    -{" "}
                  </button>
                </MinusElement>
              </AddInputComponent>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InputComponent;

const AddInputComponent = styled.div``; //이전 bir_wrap
const SearchElement = styled.div``; //이전 bir_yy
const AmountElement = styled.div``; //이전 bir_dd
const MinusElement = styled.div``; //이전 bir_mm
