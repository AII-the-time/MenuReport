import { Link } from "react-router-dom";
import styled from "styled-components";
import DetailMenu from "./DetailMenu";
export default function () {
  return (
    <Report>
      <TopInfo>
        <h1>메뉴 레포트</h1>
        <div>
          현재 지속 연구 개발중이므로 제안하시고 싶으신 부분이나 불편한 점이
          있으셨다면 언제든{" "}
          <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
            문의해주세요
          </a>{" "}
          이 레포트에 담긴 내용은 오차가 있을 수 있으므로 참고용으로
          활용해주시면 감사하겠습니다.
        </div>
      </TopInfo>
      <Average>
        <Span>
          <H3>66.7% </H3>
          <H6>평균 마진율</H6>
        </Span>
        <Span>
          <H3>200,100원 </H3>
          <H6>매출 30만원 판매시</H6>
          <H8>
            평균 마진율 기반이어서
            <br />
            오차가 있을 수 있어요!
          </H8>
        </Span>
      </Average>
      <MenuList>
        <DetailMenu />
      </MenuList>
    </Report>
  );
}

const Report = styled.div`
  border: 2px solid black;
`;
const TopInfo = styled.div``;
const Average = styled.div`
  display: flex;
`;
const MenuList = styled.div``;
const Span = styled.span`
  display: flex;
`;
const H3 = styled.h3`
  margin: 10px;
`;
const H6 = styled.h6`
  margin: 10px;
`;
const H8 = styled.div`
  align-items: center;
  text-align: center;
  font-size: 10px;
`;
