import React from "react";

const InputComponent = ({
  inputItems,
  addInput,
  InputDelete,
  onChange,
  confirm,
}) => {
  return (
    <div>
      {inputItems.map((item, index) => {
        return (
          <div>
            {index > 0 && inputItems[index - 1] ? (
              <div id="bir_wrap">
                <div id="bir_yy" defaultValue={item.elementName}>
                  {item.elementName}
                </div>

                <div id="bir_dd">
                  <span class="box">
                    <input
                      name="elementAmount"
                      type="text"
                      id="dd"
                      class="int"
                      maxlength="10"
                      placeholder="재료 사용량"
                      defaultValue={item.elementAmount}
                      onChange={(e) => onChange(e, item.id)}
                    />
                  </span>
                </div>
                <div>{item.elementUnit}</div>
                <div id="bir_mm">
                  <button
                    onClick={() => InputDelete(item.id)}
                    className="btnoption"
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
              </div>
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
