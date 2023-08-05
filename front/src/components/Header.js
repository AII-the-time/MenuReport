import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 3rem;
    background-color: #fff;
    border-bottom: 1px solid #e9ecef;
`;

const Logo = styled(Link)`
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: 1px;
    color: #212529;
    text-decoration: none;
    &:hover {
        color: #000;
        text-decoration: none;
    }
`;

export default () => {
    const [searchParams] = useSearchParams();
    return (
        <HeaderWrapper>
            <Logo to={`/?userId=${searchParams.get('userId')}`}>CAFEPOS</Logo>
        </HeaderWrapper>
    );
}
