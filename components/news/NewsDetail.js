import React from 'react'
import styled from 'styled-components'
import { TitleStyle } from "@/miscs/CustomStyle";
import SideNews from '@/components/reusable/SideNews'
import ContentCard from '@/components/reusable/ContentCard'

const NewsDetail = () => {
    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 col-12">
                        <div className="content_body">
                            Lorem ipsum dolor sit amet,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. sed diam voluptua.
                            Lorem ipsum dolor sit amet,sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, no sea takimata sanctus est Lorem ipsum dolor sit amet. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. no sea takimata sanctus est Lorem ipsum dolor sit amet. sed diam voluptua.
                        </div>
                        <div className="more_news">
                            <TitleStyle><span className="text">Trending</span></TitleStyle>
                            <div className="row">
                                <div className="col-md-4 col-12">
                                    <ContentCard />
                                </div>
                                <div className="col-md-4 col-12">
                                    <ContentCard />
                                </div>
                                <div className="col-md-4 col-12">
                                    <ContentCard />
                                </div>
                            </div>
                        </div>
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