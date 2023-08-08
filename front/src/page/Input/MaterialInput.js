import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ReactComponent as AddIcon } from "./add_circle.svg";
import { ButtonCSS, InputCSS } from '../../components';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top:10px;
    align-items: baseline;
    gap: 10px;
    > *{
        width: 1%;
        &:first-child{
            flex-grow: 2;
            position: relative;
            > input {
                ${InputCSS}
                width: 100%;
                margin: 0;
            }
            > div {
                position: absolute;
                top: 100%;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                z-index: 1;
                background-color: #fff;
            }
        }
        &:nth-child(2){
            flex-grow: 1;
            position: relative;
            display: flex;
            > input {
                ${InputCSS}
                width: 100%;
                margin: 0;
                margin: 0;
            }
            > span {
                display: block;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
`;

const ContentsWrapper = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
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
}
`;

export default function FindMaterial({ item, setMenu=()=>{} }) {
    const [material, setMaterial] = useState([]);
    const menu = useRef(item);
    const searchRef = useRef();
    const volumeRef = useRef();

    const search = async (value) => {
        try{
            const response = await axios.get("/api/goods/search?keywords=" + value);
            setMaterial(response.data);
        }catch(e){
            search();
        }
    };

    const searchOnChange = async (e) => {
        e.preventDefault();
        const { value } = e.target;
        if(value.length < 2) return;
        await search(value);
        await volumeOnChange(e);
    };

    const volumeOnChange = async (e) => {
        e.preventDefault();
        setMenu({
            id: menu.current.id?menu.current.id:-1,
            name: menu.current.name,
            volume: volumeRef.current.value,
            unit: menu.current.unit,
        })
    };

    const materialOnClick = (item) =>async (e) => {
        e.preventDefault();
        item.name = item.brand + " " + item.name;
        delete item.brand;
        delete item.image;
        item.unit = item.volume ? item.unit : "개";
        delete item.volume;
        menu.current = item;
        setMaterial([]);
        searchRef.current.value = item.name;
        await volumeOnChange(e);
    };

    useEffect(() => {
        const onClick = (e) => {
            if (e.target.closest("div") !== searchRef.current?.closest("div")) {
                setMaterial([]);
            }
        };
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <Wrapper>
            <div>
                <input type="text" id="id" placeholder="재료 이름" ref={searchRef} onChange={searchOnChange} defaultValue={menu.current.name} />
                {
                    material.length > 0 && (<div>
                        {
                        material
                            .map((item, index) => {
                                return (
                                    <ContentsWrapper key={item.id} onClick={materialOnClick(item)}>
                                        <Image src={"https://www.cntmart.com" + item.image} />
                                        <div>
                                            <span>{item.brand}</span>
                                            <span>{item.name}</span>
                                            <div>
                                                <label htmlFor="price">가격</label>
                                                <span> {item.price.toLocaleString()}원</span>
                                            </div>
                                            <div>
                                                <label htmlFor="total">1{item.volume ? item.unit : "개"}당 가격</label>
                                                <span> {Math.floor((item.volume ? item.price / (item.volume * item.count) : item.price / item.count) * 100) / 100}</span>
                                            </div>
                                        </div>
                                    </ContentsWrapper>
                                );
                            })
                        }
                    </div>)
                }
            </div>
            <div>
                <input type="text" id="id" placeholder="1회 사용량" ref={volumeRef} onChange={volumeOnChange} defaultValue={menu.current.volume} />
                <span>{menu.current ? menu.current.unit : ""}</span>
            </div>
        </Wrapper>
    )
}
