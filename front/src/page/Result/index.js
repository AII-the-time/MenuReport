import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ContentsWrapper, Title } from '../../components';
import { BorderSpan, TopInfo, Average } from './components';
import DetailMenu from "./DetailMenu";
import axios from 'axios';

export default function () {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    useEffect(() => {
        const setDefault = async () => {
            try {
                const response = await axios.get(`/api/report?userId=${searchParams.get('userId')}`);
                setResult(response.data);
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
            <Title>메뉴 리포트</Title>
            <TopInfo>
                <div style={{ wordBreak: 'keep-all' }}>
                    현재 지속 연구·개발중이므로
                    제안하시고 싶으신 부분이나 불편한 점이 있으셨다면
                    언제든 <a href="https://open.kakao.com/o/s1CqnUyf" target="_blank">
                        문의해주세요
                    </a>
                    <br />
                    이 레포트에 담긴 내용은 오차가 있을 수 있으므로 참고용으로
                    활용해주시면 감사하겠습니다.
                </div>
            </TopInfo>
            <Average>
                <div>
                    <span>평균 마진율</span>
                    <BorderSpan>{result.allMaginAvg}%</BorderSpan>
                </div>
                <span style={{ wordBreak: 'keep-all', fontSize: '0.9rem', color:"#888" }}>
                    모든 메뉴가 동일한 비율로 팔렸다고 가정한 값입니다.
                    <br />
                    따라서 실제 매출과 차이가 있을 수 있으나, 추후 포스기와 연동하여 정확한 매출을 계산할 수 있도록 개발할 예정입니다.
                </span>
            </Average>
            {result.menu.map((item, index) => (
                <DetailMenu key={index} menu={item} index={index} setCurIndex={setCurIndex} curIndex={curIndex} allMaginAvg={result.allMaginAvg} />
            ))}
        </ContentsWrapper>
    );
}
