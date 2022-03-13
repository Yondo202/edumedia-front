import React, { useEffect, useState } from 'react'
import axios from "@/global/axiosbase"
import CustomParser from '@/miscs/CustomParser';
import styled from 'styled-components'
import { TitleStyle } from "@/miscs/CustomStyle";
import SideNews from '@/components/reusable/SideNews'
import ContentCard from '@/components/reusable/ContentCard'

const NewsDetail = ({ data, user }) => {
    const [ myData, setMyData ] = useState([])

    useEffect(()=>{
        void async function Fetch(){
            let datas = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[user][id][$eq]=${user?.id}&filters[id][$ne]=${data?.id}&pagination[start]=0&pagination[limit]=3`)
            setMyData(datas?.data?.data)
        }()
    },[data])

    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 col-12">
                        <div className="content_body">
                            <CustomParser data={data?.attributes?.body} />
                        </div>
                        {myData?.length > 0?<div className="more_news">
                            <TitleStyle><span className="text">Холбогдолтой</span></TitleStyle>
                            <div className="row">
                                {myData.map((el,ind)=>{
                                    return(
                                        <div key={ind} className="col-md-4 col-12">
                                            <ContentCard data={el} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>:null}
                    </div>
                    <div className="col-md-3 col-12">
                        <SideNews />
                    </div>
                </div>
            </div>
           
        </Container>
    )
}

export default NewsDetail


const Container = styled.div`
    ${({theme})=>{
    return `
        ${theme.containerWrap}
        margin-top:18px;
        padding:20px;
        background-color:#fff;
        margin-bottom:70px;
        .content_body{
            padding-right:50px;
            margin-bottom:40px;
            font-size:15px;
            line-height: 1.7;
            ${theme.weight}
        }
        @media (max-width:768px){
            .content_body{
                padding-right:0px;
            }
        }
    `;
}}
`