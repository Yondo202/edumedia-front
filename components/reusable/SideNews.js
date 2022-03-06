import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd';
import axios from "@/global/axiosbase"
import styled from 'styled-components'
import ContentCardSide from '@/components/reusable/ContentCardSide'
import { BsClockHistory } from "react-icons/bs"
import { ImFire } from "react-icons/im"

const SideNews = () => {
    const [ load, setLoad ] = useState(false)
    const [ data, setData ] = useState([])
    const [ active, setActive ] = useState('latest');

    useEffect(() =>{
        Fetch()
    },[active])

    const Fetch = async () =>{
        setLoad(true)
        try{
            let ress
            if(active === "mostsee"){
                ress = await axios.get(`posts?populate=*&sort=count%3Adesc&pagination[start]=0&pagination[limit]=5`)
            }else if ("latest"){
                ress = await axios.get(`posts?populate=*&sort=createdAt%3Adesc&pagination[start]=0&pagination[limit]=5`)
            }
           setData(ress?.data?.data)
        }catch(err){
            console.log('err', err)
        }finally{
            setLoad(false)
        }
    }

    // localhost:1380/api/posts?populate=*&sort=createdAt%3Adesc&pagination[start]=0&pagination[limit]=1 

    return (
        <Container className="right_trending">
            <div className="content_par">
                <div className="side_news_head">
                    <div onClick={_=>setActive('latest')} className={`items ${active==='latest'?`active`:``} `}><BsClockHistory /> Сүүлийн</div>
                    <div onClick={_=>setActive('mostsee')} className={`items ${active==='mostsee'?`active`:``}`}><ImFire /> Их үзэлттэй</div>
                </div>
                
                {load? 
                <>
                    <Skeleton loading={true} active avatar />
                    <Skeleton loading={true} active avatar />
                    <Skeleton loading={true} active avatar />
                    <Skeleton loading={true} active avatar />
                    <Skeleton loading={true} active avatar />
                </>
                :data?.map((el,ind)=>{
                    return(
                        <ContentCardSide key={ind} data={el} />
                    )
                })}
            </div>
        </Container>
    )
}

export default SideNews

const Container = styled.div`
    ${({theme})=>`
        position:sticky;
        top:30px;
        padding:10px 15px;
        background-color:${theme.background2};
        .content_par{
            .side_news_head{
                margin-bottom:13px;
                display:grid;
                background-color:${theme.background};
                color:#fff;
                // grid-template-rows: 50%;
                grid-template-columns: repeat(2, 1fr);
                .items{
                    cursor:pointer;
                    padding:10px 10px;
                    ${theme.weight3}
                    display:flex;
                    gap:8px;
                    align-items:center;
                    justify-content:center;
                    svg{
                        font-size:16px;
                    }
                }
                .active{
                    background-color:${theme.mainColor};
                }
            }
        }
        
    `}
`
