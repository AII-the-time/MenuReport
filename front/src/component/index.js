import styled,{ css } from 'styled-components';

export const ContentsWrapper = styled.div`
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

export const ButtonCSS = css`
    background-color: #fff;
    color: var(--main-color);
    font-weight: bold;
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

export const InputCSS = css`
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px 6px 10px 6px;
    margin: 6px 0 16px 0;
`;

export const Title = styled.div`
    word-break: keep-all;
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
`;
