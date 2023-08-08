import { BorderDiv, OpenWrapper, MenuWrapper, BorderSpan, RowFlex, MiddleTitle, RecipeGrid, InsideDiv } from './components';
import { Title } from '../../components';

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
        <Title>{menu.name + " " + Number(menu.price).toLocaleString("ko-KR")}원</Title>
        <RowFlex>
          <BorderSpan>{menu.profit} 원</BorderSpan>
          <span>한 잔을 팔면 이만큼 남아요</span>
        </RowFlex>
        <RowFlex>
          <BorderSpan>{menu.magin} %</BorderSpan>
          <span>전체 평균 마진율보다 {Math.floor(Math.abs(menu.magin - allMaginAvg) * 100) / 100}% {menu.magin > allMaginAvg ? '높아요' : '낮아요'}</span>
        </RowFlex>
        <MiddleTitle>재료 별 원가</MiddleTitle>
        <RecipeGrid>
          {menu.recipe.map((item, index) => (
            <>
              <div key={index + "1"}>{item.name}</div>
              <div key={index + "2"}>{item.weight}{item.unit}</div>
              <div key={index + "3"}>{item.price}원</div>
            </>
          ))}
        </RecipeGrid>
        <MiddleTitle>매출 분석(추후 포스기와 연동하여 제공 예정)</MiddleTitle>
        <p>
          1주일간 __명의 손님이 구매했어요.
          <InsideDiv>
            판매 매출은 ______원이에요.
          </InsideDiv>
          <InsideDiv>
            순이익은 ______원이에요.
          </InsideDiv>
        </p>
        <p>
          이 메뉴는 가게 전체 매출의 __%를 차지하고
          <InsideDiv>
            순이익은 전체 순이익의 __%를 차지해요.
          </InsideDiv>
        </p>
        <p>
          주로 __시부터 __시 사이에 많이 팔렸으며
          <InsideDiv>
            가장 같이 많이 구매한 디저트는 ____이에요(__%)
          </InsideDiv>
        </p>
        <p>
          주변 비슷한 매장에서는 이 메뉴를 _____원에 판매해요.
        </p>
        <p>
          재료 (_선_택_가_능_)은 __건의 메뉴에서 사용 중이에요.
          <InsideDiv>
            해당 재료를 ___ml당 ___원에서 ___ml당 ___원으로 변경하면
            <br/>
            이 메뉴의 순이익은 ______원 증가하고
            <br/>
            전체 메뉴의 마진율은 ___% 증가해요.
            <br/>
            매장 1달 매출 기준 ____원이 증가해요.
          </InsideDiv>
        </p>
      </MenuWrapper>
    </BorderDiv>
  );
}
