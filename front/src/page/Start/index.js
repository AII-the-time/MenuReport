import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { ContentsWrapper, ButtonCSS, Title } from "../../components";

const LinkButton = styled(Link)`
  ${ButtonCSS}
`;

export default function () {
  const [searchParams] = useSearchParams();
  return (
    <ContentsWrapper>
      <Title>안녕하세요</Title>
      <p>
        저희는 대한민국 과학기술정보통신부에서 주관하는 <br />
        <b>SW마에스트로 14기 연수생으로 구성된 주구장창팀</b>입니다.
      </p>
      <p>
        저희 서비스는 기존 엑셀을 사용해 모든 재료를 검색해서 추가 및
        계산해야하는 <b>레시피 장부를 편리하게 입력 및 관리</b>할 수 있도록
        고민했습니다.
      </p>
      <p>
        언제든 문의사항이 있으시면 <a></a>
        <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
          문의하기
        </a>
        로 연락주시면 더욱 개선된 모습 보여드리겠습니다.
      </p>

      <PP>
        ! 입력하신 모든 레시피는{" "}
        <b>절대 외부 유출 및 공유, 공개가 되지 않습니다.</b>
        <br />
        <br />! <b>자동 중간 저장</b> 기능이 있으므로 다시 링크로 들어오시면
        언제든 입력 가능합니다!
        <br />
        <br />! <b>먼저 1~2개의 레시피를 먼저 입력</b>하시며 익히신 후{" "}
        <b>추가 입력하시는 것을 추천</b>드립니다.
        <br />
        <br />!{" "}
        <b>
          메뉴 레포트 체험하기를 클릭하신 경우 개인정보활용동의에 동의하신 것으로 간주
        </b>
        됩니다.
        <br />
        <Blank></Blank>해당 내용은{" "}
        <b>내부적으로 메뉴 레포트 발행 및 연구를 위해서만 사용</b>
        됩니다.
      </PP>

      <LinkButton to={`/PreInput?userId=${searchParams.get("userId")}`}>
        메뉴 레포트 체험하기
      </LinkButton>
      <Warning>* 유의사항</Warning>
      <Warn>
        1. 쇼핑몰의 정보를 수집한 것으로 <b>실제 가격과 차이</b>가 있을 수
        있습니다
      </Warn>
      <Warn>
        2. 레시피의 정보를 수집한 것으로 <b>실제 레시피와 차이</b>가 있을 수
        있습니다
      </Warn>
      <Warn>
        3. 레시피 입력 완료 후{" "}
        <b>리포트가 완성되면 문자로 알림을 보내드립니다</b>
      </Warn>
    </ContentsWrapper>
  );
}

const PP = styled.p`
  margin: 5px;
  font-size: 0.9rem;
`;
const Warn = styled.div`
  margin-left: 5px;
  font-size: 0.8rem;
`;
const Warning = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

const Blank = styled.a`
  margin-left: 7px;
`;
