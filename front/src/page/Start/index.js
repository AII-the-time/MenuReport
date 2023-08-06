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
      <P>
        저희는 대한민국 과학기술정보통신부에서 주관하는 <br />
        <A>SW마에스트로 14기 연수생으로 구성된 주구장창팀</A>입니다.
      </P>
      <P>
        저희 서비스는 기존 엑셀을 사용해 모든 재료를 검색해서 추가 및
        계산해야하는 <A>레시피 장부를 편리하게 입력 및 관리</A>할 수 있도록
        고민했습니다.
      </P>
      <P>
        언제든 문의사항이 있으시면 <a></a>
        <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
          문의하기
        </a>
        로 연락주시면 더욱 개선된 모습 보여드리겠습니다.
      </P>

      <PP>
        ! 입력하신 모든 레시피는{" "}
        <A>절대 외부 유출 및 공유, 공개가 되지 않습니다.</A>
        <br />
        <br />! <A>자동 중간 저장</A> 기능이 있으므로 다시 링크로 들어오시면
        언제든 입력 가능합니다!
        <br />
        <br />! <A>먼저 1~2개의 레시피를 먼저 입력</A>하시며 익히신 후
        <A>추가 입력하시는 것을 추천</A>드립니다.
      </PP>

      <LinkButton to={`/PreInput?userId=${searchParams.get("userId")}`}>
        메뉴 레포트 체험하기
      </LinkButton>
      <Warning>* 유의사항</Warning>
      <Warn>
        1. 쇼핑몰의 정보를 수집한 것으로 <A>실제 가격과 차이</A>가 있을 수
        있습니다
      </Warn>
      <Warn>
        2. 레시피의 정보를 수집한 것으로 <A>실제 레시피와 차이</A>가 있을 수
        있습니다
      </Warn>
      <Warn>
        3. 레시피 입력 완료 후{" "}
        <A>리포트가 완성되면 문자로 알림을 보내드립니다</A>
      </Warn>
    </ContentsWrapper>
  );
}

const P = styled.p`
  margin: 10px;
  font-size: 0.9rem;
`;
const PP = styled.p`
  margin: 5px;
  font-size: 0.6rem;
`;
const Warn = styled.div`
  margin-left: 5px;
  font-size: 0.5rem;
`;
const Warning = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
`;

const A = styled.a`
  color: #ff0000;
  font-weight: bold;
`;
