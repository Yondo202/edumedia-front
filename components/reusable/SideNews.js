import React from 'react'
import styled from 'styled-components'
import ContentCardSide from '@/components/reusable/ContentCardSide'
import { BsClockHistory } from "react-icons/bs"
import { ImFire } from "react-icons/im"

const SideNews = () => {
    return (
        <Container className="right_trending">
            <div className="content_par">
                <div className="side_news_head">
                    <div className="items active"><BsClockHistory /> Сүүлийн</div>
                    <div className="items"><ImFire /> Их үзэлттэй</div>
                </div>
                <ContentCardSide />
                <ContentCardSide />
                <ContentCardSide />
                <ContentCardSide />
                <ContentCardSide />
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
