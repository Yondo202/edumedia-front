import React from 'react';
import { TitleStyle } from "@/miscs/CustomStyle";
import styled from 'styled-components';
import ContentCard from '@/components/reusable/ContentCard'

const Slickcards = ({data}) => {
    return (
        <Container>
            <TitleStyle><span className="text">{data?.title}</span></TitleStyle>
            <div className="contents_par container-fluid">
                <div className="row">
                    {data?.news?.data.slice(0,4).map((el,ind)=>{
                        return(
                            <div key={ind} className="col-md-3 col-12">
                                <ContentCard data={el} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Slickcards

const Container = styled.div`
    ${({theme})=>`
        ${theme.containerWrap}
        margin-bottom:60px;
        background-color:#fff;
        padding:20px;
        .contents_par{

        }
    `}
`
