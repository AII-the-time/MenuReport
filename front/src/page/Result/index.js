import {Link} from 'react-router-dom';
import { ContentsWrapper } from '../../components';
export default function(){
    return (
        <ContentsWrapper>
            <p>입력해주셔서 감사합니다.
            </p>
            <p>
                당초 예상한 인원보다 많은 분이 신청해주셔서 이를 분석하여 제공드리는데 <u>시간이 소요될 예정</u>입니다.
            </p>
            <p>
                <u>8월 8일 오전 11시</u>에 결과를 안내해드리겠습니다.
            </p>
            <p>
                완료되는대로 문자로 안내드릴 예정이니, 조금만 기다려주시면 더욱 좋은 결과로 찾아뵙겠습니다.
            </p>
            <p>
                <b>다시 한번 저희 서비스에 관심가져주셔서 감사하며,</b> 해당 내용은 레포트 발행 전과 후 모두 언제든지 수정 및 추가 입력이 가능합니다.
            </p>
        </ContentsWrapper>
    );
}
