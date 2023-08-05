import {Link} from 'react-router-dom';
export default function(){
    return (
        <>
        <h1>
            원두, 우유, 포장재 등 입력
        </h1>
            <Link to="/Input">
                메뉴 입력하러가기
            </Link>
        </>
    );
}
