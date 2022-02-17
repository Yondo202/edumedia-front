import React from 'react'
import styled from 'styled-components'
import { TitleStyle } from "@/miscs/CustomStyle"
import ContentCard from '@/components/reusable/ContentCard'
import ContentCardSide from '@/components/reusable/ContentCardSide'
import { BsClockHistory } from "react-icons/bs"
import { ImFire } from "react-icons/im"

const Homecontents = () => {
  return (
    <Container>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-12">
                    <div className="left_trending">
                        <div className="content_par">
                            <ContentCard position="outside" dark={true} />
                            <ContentCard position="outside" dark={true} />
                            <ContentCard position="outside" dark={true} />
                            <ContentCard position="outside" dark={true} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="contents_middle">
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <ContentCard size="medium" />
                            </div>
                            <div className="col-md-6 col-12">
                                <ContentCard read_hide={true} />
                            </div>
                            <div className="col-md-6 col-12">
                                <ContentCard  read_hide={true} />
                            </div>
                            <div className="col-md-6 col-12">
                                <ContentCard read_hide={true} />
                            </div>
                            <div className="col-md-6 col-12">
                                <ContentCard read_hide={true} />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-3 col-12">
                    <div className="right_trending">
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
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Homecontents

const Container = styled.div`
    ${({theme})=>`
        ${theme.containerWrap}
        margin-bottom:36px;
        background-color:#fff;
        padding:20px 20px;
        // box-shadow:0 0 5px 0 rgb(0 0 0 / 20%);
        .contents_middle{
            box-shadow:0 0 5px 0 rgb(0 0 0 / 20%);
            padding:10px 15px;
            // background-color:#fff;
            // padding:2px 20px;
            // box-shadow:0 0 5px 0 rgb(0 0 0 / 20%);
        }
        .left_trending{
            padding:10px 15px;
            background-color:${theme.background2};
            .content_par{
                padding:15px;
                background-color:${theme.background};
            }
        }
        .right_trending{
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
            
        }
    `}
`