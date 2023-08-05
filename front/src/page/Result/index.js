import { Link } from "react-router-dom";
import styled from "styled-components";
export default function () {
  return (
    <div>
      <TopInfo>
        <h1>메뉴 레포트</h1>
        <h4>
          현재 지속 연구 개발중이므로 제안하시고 싶으신 부분이나 불편한 점이
          있으셨다면 언제든{" "}
          <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
            문의해주세요
          </a>{" "}
          이 레포트에 담긴 내용은 오차가 있을 수 있으므로 참고용으로
          활용해주시면 감사하겠습니다.
        </h4>
      </TopInfo>
      <Average>
        <span>66.7% 평균 마진율</span>
        <span>200,100원 매출 30만원 팜내시 기준</span>
      </Average>
      <HowToUse></HowToUse>
      <MenuList>
        <DetailMenu></DetailMenu>
      </MenuList>
    </div>
  );
}

const TopInfo = styled.div``;
const Average = styled.div`
  display: flex;
`;
const HowToUse = styled.div``;
const MenuList = styled.div``;
const DetailMenu = styled.div``;
