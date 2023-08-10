import {
  BorderDiv,
  OpenWrapper,
  MenuWrapper,
  BorderSpan,
  RowFlex,
  MiddleTitle,
  RecipeGrid,
  InsideDiv,
  Bold,
} from "./components";
import { Title } from "../../components";

export default function ({ menu, index, setCurIndex, curIndex, allMaginAvg }) {
  return (
    <BorderDiv>
      <OpenWrapper open={curIndex !== index} onClick={() => setCurIndex(index)}>
        <div>
          <span>{menu.name}</span>
          <span>{Number(menu.price).toLocaleString("ko-KR")}원</span>
        </div>
        <div></div>
      </OpenWrapper>
      <MenuWrapper open={curIndex === index}>
        <Title>
          {menu.name + " " + Number(menu.price).toLocaleString("ko-KR")}원
        </Title>
        <RowFlex>
          <BorderSpan>{menu.profit} 원</BorderSpan>
          <span>{menu.name} 한 잔을 팔면 이만큼 남아요</span>
        </RowFlex>
        <RowFlex>
          <BorderSpan>{menu.magin} %</BorderSpan>
          <span>
            전체 평균 마진율보다{" "}
            {Math.floor(Math.abs(menu.magin - allMaginAvg) * 100) / 100}%{" "}
            {menu.magin > allMaginAvg ? "높아요" : "낮아요"}
          </span>
        </RowFlex>
        <MiddleTitle>재료 별 원가</MiddleTitle>
        <RecipeGrid>
          {menu.recipe.map((item, index) => (
            <>
              <div key={index + "1"}>{item.name}</div>
              <div key={index + "2"}>
                {item.weight}
                {item.unit}
              </div>
              <div key={index + "3"}>{item.price}원</div>
            </>
          ))}
        </RecipeGrid>
        <MiddleTitle>매출 분석</MiddleTitle>
        <p>*해당 내용은 실제 데이터가 아닌 추후 제공 내용 예시입니다.</p>
        <p>
          1주일간 <Bold>27</Bold>명의 손님이 구매했어요.
          <InsideDiv>
            판매 매출은 <Bold>217,000</Bold>원이에요.
          </InsideDiv>
          <InsideDiv>
            순이익은 <Bold>167,000</Bold>원이에요.
          </InsideDiv>
        </p>
        <p>
          이 메뉴는 가게 전체 매출의 <Bold>13</Bold>%를 차지하고
          <InsideDiv>
            순이익은 전체 순이익의 <Bold>17</Bold>%를 차지해요.
          </InsideDiv>
        </p>
        <p>
          주로 <Bold>12</Bold>시부터 <Bold>1</Bold>시 사이에 많이 팔렸으며
          <InsideDiv>
            가장 같이 많이 구매한 디저트는 <Bold>티라미수 케이크</Bold>이에요(
            <Bold>25</Bold>%, <Bold>16</Bold>건 중 <Bold>4</Bold>건)
          </InsideDiv>
        </p>
        <p>
          주변 비슷한 매장에서는 이 메뉴를 <Bold>4800</Bold>원에 판매해요.
        </p>
        <p>
          재료 <Bold>우유</Bold>는 <Bold>8</Bold>건의 메뉴에서 사용 중이에요.
          <InsideDiv>
            해당 재료를 <Bold>1000</Bold>ml당 <Bold>2400</Bold>원에서
            <Bold>1000</Bold>ml당 <Bold>2300</Bold>원으로 변경하면
            <br />이 메뉴의 순이익은 <Bold>40</Bold>원 증가하고
            <br />
            전체 메뉴의 마진율은 <Bold>5.3</Bold>% 증가해요.
            <br />
            매장 1달 매출 기준 <Bold>121,000</Bold>원이 증가해요.
          </InsideDiv>
        </p>
      </MenuWrapper>
    </BorderDiv>
  );
}
