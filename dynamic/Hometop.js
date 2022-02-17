import React from 'react'
import styled from 'styled-components'
import { TitleStyle } from "@/miscs/CustomStyle"
import ContentCard from '@/components/reusable/ContentCard'
import ContentCardSide from '@/components/reusable/ContentCardSide'

const Hometop = () => {
    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-12">
                        <div className="right_trending">
                            <TitleStyle><span className="text">Trending</span></TitleStyle>
                            <div className="content_par">
                                <ContentCardSide />
                                <ContentCardSide />
                                <ContentCardSide />
                                <ContentCardSide />
                                <ContentCardSide />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-9 col-12">
                            <div className="row">
                                <div className="col-md-8 col-12">
                                <div className="slick_parent">
                                    <TitleStyle>
                                        <span className="text">MAIN NEWS</span>
                                    </TitleStyle>
                                    <ContentCard size="big" position="outside" />

                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="top_two">
                                    <TitleStyle><span className="text">MAIN NEWS</span></TitleStyle>
                                    <ContentCard />
                                    <ContentCard />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Hometop

// background-color:rgba(32, 32, 32, 0.5);
const Container = styled.div`
    ${({theme})=>`
        ${theme.containerWrapFull}
        // background: ${theme.background};
        // background-image:linear-gradient(45deg, #202020, #404040);
        // background-image:-webkit-linear-gradient(45deg, #202020, #404040);
        margin-bottom:36px;
        .right_trending{
            .content_par{
                .custom{
                    background:#fff;
                }
            }
        }
    `}
`