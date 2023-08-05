import { useRef,useState,useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {ReactComponent as AddIcon} from "./add_circle.svg";

const Search = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:10px;
    > button {
        height: 50px;
        margin: 6px 0 16px 0;
        padding-top: 0;
        padding-bottom: 0;
    }
    > input:nth-child(2) {
        flex: 1;
    }
`;

const Input = styled.input`
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 12px 20px 12px 20px;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

const ListWrapper = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 12px 20px 12px 20px;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const ContentsWrapper = styled.div`
  background-color: #fff;
  margin: 5px auto;
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0 10px;
  position: relative;
  cursor: pointer;
  >div{
    border-left: 1px solid #ccc;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    >div{
        color: #888;
        font-size: 0.8rem;
        >label{
            margin:0;
        }
    }
  }
  >article{
    position: absolute;
    display:none;

  }
  &:hover{
    >article{
        display:flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        opacity: 0.7;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        z-index: 1;
        text-align: left;
    }
  }
}
`;

export default function FindMaterial({addFunction}) {
    const [material, setMaterial] = useState([]);
    const [search, setSearch] = useState({});
    const searchRef = useRef();
    const brandRef = useRef();

    useEffect(() => {
        if(search === "") return;
        (async () => {
            const response = await axios.get("/api/search/?keyword="+search.search+"&brand="+search.brand);
            setMaterial(response.data);
        })();
    }, [search]);
    
    const onSubmit = (e) => {
        e.preventDefault();
        setSearch({
            search: searchRef.current.value,
            brand: brandRef.current.value
        });
    };

    return (
        <form>
            <Search>
                <Input type="text" id="id" maxlength="20" placeholder="브랜드 이름" ref={brandRef}></Input>
                <Input type="text" id="id" maxlength="20" placeholder="재료 이름" ref={searchRef}></Input>
                <button type="submit" onClick={onSubmit} className="btnplus">검색</button>
            </Search>
            <ListWrapper>
                {
                    material
                        .map((item, index) => {
                            return (
                                <ContentsWrapper key={item.id} onClick={() => addFunction(item)}>
                                    <article>
                                        <AddIcon width="100px" height="80%"/>
                                    </article>
                                    <Image src={"https://www.cntmart.com"+item.image}/>
                                    <div>
                                        <span>{item.brand}</span>
                                        <span>{item.name}</span>
                                        <div>
                                            <label htmlFor="price">가격</label>
                                            <span> {item.price.toLocaleString()}원</span>
                                        </div>
                                        <div>
                                            <label htmlFor="total">1{item.volume?item.unit:"개"}당 가격</label>
                                            <span> {Math.floor((item.volume?item.price/(item.volume*item.count):item.price/item.count)*100)/100}</span>
                                        </div>
                                    </div>
                                </ContentsWrapper>
                            );
                        })
                }
            </ListWrapper>
        </form>
    )
}
