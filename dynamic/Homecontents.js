import React from 'react'
import styled from 'styled-components'
import { TitleStyle } from "@/miscs/CustomStyle"
import ContentCard from '@/components/reusable/ContentCard'
import ContentCardSide from '@/components/reusable/ContentCardSide'

const Homecontents = () => {
  return (
    <Container>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9 col-12">
                    <div className="contents_middle">
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <ContentCard position="outside" />
                            </div>
                            <div className="col-md-4 col-12">
                                <ContentCard position="outside" />
                            </div>
                            <div className="col-md-4 col-12">
                                <ContentCard position="outside" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-3 col-12">
                    <div className="right_trending">
                        <div className="content_par">
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
        .contents_middle{
            background-color:#fff;
            padding:2px 20px;
            box-shadow:0 0 5px 0 rgb(0 0 0 / 20%);
        }
    `}
`