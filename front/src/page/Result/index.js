import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ContentsWrapper } from '../../components';
import { Report, TopInfo, Average, MenuList, Span, H3, H6, H8 } from './components';
import DetailMenu from "./DetailMenu";
import axios from 'axios';

export default function () {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    useEffect(() => {
        const setDefault = async () => {
            try {
                const response = await axios.get(`/api/report?userId=${searchParams.get('userId')}`);
                setResult(response);
                setLoading(false);
            } catch (e) {
                alert('서버에 문제가 있습니다. 다시 시도해주세요.');
                navigate(`/Input?userId=${searchParams.get('userId')}`);
            }
        }
        setDefault();
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    console.log(result);
    return (
        <ContentsWrapper>
            <Report>
                <TopInfo>
                    <h1>메뉴 레포트</h1>
                    <div>
                        현재 지속 연구 개발중이므로 제안하시고 싶으신 부분이나 불편한 점이
                        있으셨다면 언제든{" "}
                        <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
                            문의해주세요
                        </a>{" "}
                        이 레포트에 담긴 내용은 오차가 있을 수 있으므로 참고용으로
                        활용해주시면 감사하겠습니다.
                    </div>
                </TopInfo>
                <Average>
                    <Span>
                        <H3>66.7% </H3>
                        <H6>평균 마진율</H6>
                    </Span>
                    <Span>
                        <H3>200,100원 </H3>
                        <H6>매출 30만원 판매시</H6>
                        <H8>
                            평균 마진율 기반이어서
                            <br />
                            오차가 있을 수 있어요!
                        </H8>
                    </Span>
                </Average>
                <MenuList>
                    <DetailMenu />
                </MenuList>
            </Report>
        </ContentsWrapper>
    );
}
