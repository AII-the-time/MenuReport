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
  background-color: #eee;
`;
export const MenuList = styled.div``;
export const Span = styled.span`
  display: flex;
`;
