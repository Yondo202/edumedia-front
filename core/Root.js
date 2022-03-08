import React from 'react'
import { MenuContext } from '@/global/ContextMenuProvider'
import styled from 'styled-components'
import Header from '@/core/Header'
import Footer from '@/core/Footer'
import PreSeo from '@/miscs/PreSeo'


const Root = ({ children, seo }) => {
    const { general, completelyLoaded } = React.useContext(MenuContext);
    return (
        completelyLoaded?<Body seo={seo}>
            <PreSeo seo={seo}/>
            <Header general={general} />
                {children}
            <Footer general={general}  />
        </Body>:null
    )
}

export default Root

const Body = styled.div`
    // background-color:red;
`