import styled from "styled-components";

export default function () {
  return (
    <div>
      <div>
        <H3>카페라떼</H3>
        <Span>
          <H6>1930원</H6>
        </Span>
        <Span>
          <h6>한잔을 팔 때 마진율이에요.</h6>
        </Span>
      </div>
      <div>
        <Span>
          <H6>57.1%</H6>
        </Span>
        <Span>
          <h6>전체 평균 마진율보다 {} 낮아요.</h6>
        </Span>
      </div>
      <a>레시피 목록 ?</a>
      <Elment>
        <Span>우유</Span>
        <Span>250</Span>
        <Span>ml</Span>
        <Span>1560원</Span>
      </Elment>
      <Elment>
        <Span>원두</Span>
        <Span>45</Span>
        <Span>g</Span>
        <Span>503원</Span>
      </Elment>
      <Elment>
        <Span>포장재</Span>
        <Span>1</Span>
        <Span>개</Span>
        <Span>507원</Span>
      </Elment>
    </div>
  );
}

const Span = styled.span`
  display: flex;
  margin-left: 10px;
`;
const H3 = styled.h3`
  margin: 10px;
`;
const H6 = styled.h6`
  margin: 10px;
`;
const Elment = styled.div`
  display: flex;
`;
