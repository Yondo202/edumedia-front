import React from 'react'
import { MenuContext } from '@/global/ContextMenuProvider'
import styled from 'styled-components'
import Header from '@/core/Header'
import Footer from '@/core/Footer'

const Root = ({children}) => {
    const { general } = React.useContext(MenuContext)

    return (
        <Body>
            <Header general={general} />
                {children}
            <Footer />
        </Body>
    )
}

export default Root

const Body = styled.div`
    // background-color:red;
`