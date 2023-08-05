import {Link, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {ContentsWrapper,ButtonCSS,Title} from '../../components';

const LinkButton = styled(Link)`
    ${ButtonCSS}
`;

export default function(){
    const [searchParams] = useSearchParams();
    return(
        <ContentsWrapper>
            <Title>안녕하세요</Title>
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
