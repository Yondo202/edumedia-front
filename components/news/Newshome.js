import React from 'react'
import styled from 'styled-components'
import NewsDetail from './NewsDetail'
import Slickcards from '@/dynamic/Slickcards'
import SideCard from '@/components/reusable/SideCard'

const Newshome = () => {
    return (
        <>
            <Container>
                <SideCard />
          
            </Container>
            <NewsDetail />
            <Slickcards />
        </>
    )
}

export default Newshome


const Container = styled.div`
    ${({theme})=>`
        ${theme.containerWrap}
        margin-top:26px;
        padding:20px;
        background-color:#fff;
    `}
`