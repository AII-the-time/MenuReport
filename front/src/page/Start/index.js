import {Link, useSearchParams} from 'react-router-dom';
import styeled from 'styled-components';

const ContentsWrapper = styeled.div`
    background-color: #fff;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: start;
    padding: 30px 10px 0 10px;
    max-width: 600px;
`;

const LinkButton = styeled(Link)`
    background-color: #fff;
    margin: 5px auto;
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px 30px;
    position: relative;
    cursor: pointer;
    &:hover{
        background-color: var(--main-color);
        color: #fff;
        text-decoration: none;
    }
`;

export default function(){
    const [searchParams] = useSearchParams();
    return(
        <ContentsWrapper>
            <h1>안녕하세요</h1>
            <p>저희는 대한민국 과학기술정보통신부에서 주관하는 SW마에스트로 ~~</p>
            <br/>
            <LinkButton to={`/PreInput?userId=${searchParams.get('userId')}`}>
                메뉴 레포트 체험하기
            </LinkButton>
            <div>
                * 유의사항: ~~~~~~~~~~~~
            </div>
        </ContentsWrapper>
    );
}
