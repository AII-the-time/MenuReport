import styled from "styled-components";
import { ButtonCSS, InputCSS } from "../../components";

export const Report = styled.div`
  border: 2px solid black;
`;
export const TopInfo = styled.div`
    ${InputCSS}
`;
export const Average = styled.div`
  display: flex;
  flex-direction: column;
  ${InputCSS}
  > div {
    display: flex;
    justify-content: start;
    gap: 1rem;
    align-items: baseline;
    font-size: 1.5rem;
    font-weight: bold;
    word-break: keep-all;
    >input{
        ${InputCSS}
        width: 4rem;
    }
  }
`;

export const BorderSpan = styled.span`
  ${InputCSS}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-color: var(--main-color);
  border-width: 3px;
  background-color: #eee;
  font-weight: bold;
  margin-right: 1rem;
  flex: 0 0 auto;
`;

export const MiddleTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const RowFlex = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`;

export const BorderDiv = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
`;

export const MenuWrapper = styled.div`
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
`;

export const OpenWrapper = styled.div`
    display: ${({ open }) => open ? 'flex' : 'none'};
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    > div {
        display: flex;
        gap: 10px;
        font-size: 1.15rem;
        font-weight: bold;
    }
    > div:last-child {
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        border: 3px solid #ccc;
        border-top: none;
        border-left: none;
        margin-left: auto;
        cursor: pointer;
    }
`;

export const RecipeGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    width: fit-content;
    > div {
      padding: 10px;
      display: flex;
      justify-content: end;
      align-items: center;
      border-top: 1px solid #ccc;
      &:nth-last-child(-n+3) {
          border-bottom: 1px solid #ccc;
      }
      &:nth-child(3n+1) {
        justify-content: start;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
`;

export const InsideDiv = styled.div`
    margin-left: 1rem;
`;
