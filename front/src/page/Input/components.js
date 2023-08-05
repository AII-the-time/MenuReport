import styled from "styled-components";
import { ButtonCSS, InputCSS } from '../../components';

export const LinkButton = styled.button`
    ${ButtonCSS}
    margin: 30px 0 0 auto;
`;

export const PlusButton = styled.button`
    ${ButtonCSS}
}`;

export const TwoInputWithLabel = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  > div {
    width: 1%;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    > label {
      font-size: 1.15rem;
      font-weight: bold;
    }
    > input {
      ${InputCSS}
      margin: 0;
    }
    >div{
      position: relative;
      display: flex;
      > input {
          ${InputCSS}
          width: 100%;
          margin: 0;
      }
      > span {
          display: block;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
      }
    }
  }
  margin: 6px 0 16px 0;
`;

export const LabelWithTooltip = styled.label`
    margin: 10px 0 6px 0;
    font-size: 1.15rem;
    font-weight: bold;
    display: flex;
    align-items: baseline;
    position: relative;
    > .material-icons {
        font-size: 1.15rem;
        > div {
            font-family: 'Noto Sans KR', sans-serif;
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            white-space: wrap;
            word-break: keep-all;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            z-index: 1;
            line-height: normal;
            grid-template-columns: auto 1fr;
            grid-gap: 10px;
            font-size: 1rem;
        }
    }
    > .material-icons:hover {
        > div {
            display: grid;
        }
    }
`;

export const SelectAndInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    > label {
        font-size: 1.15rem;
        font-weight: bold;
    }
    > div {
        display: flex;
        gap: 10px;
        width: 100%;
        position: relative;
        align-items: baseline;
        > div {
            ${InputCSS}
            text-align: center;
            width: 1%;
            flex: 1 1 0;
            display: flex;
            flex-direction: column;
            align-items: column;
        }
        > label {
            word-break: keep-all;
            flex-shrink: 0;
        }
        > input {
            ${InputCSS}
            width: 1%;
            flex: 1 0 0;
            margin: 0;
        }
        > span {
            display: block;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;
