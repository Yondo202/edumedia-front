import React from 'react'
import { TitleStyle } from "@/miscs/CustomStyle"
import styled from 'styled-components'
import SideNews from '@/components/reusable/SideNews'
import SideCard from '@/components/reusable/SideCard'

const PagesHome = ({ data, user}) => {
    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-12">
                    <TitleStyle><span className="text">{`${user?.username} (${data.length})`}  </span></TitleStyle>
                        { data?.map((el,ind)=>{
                            return(
                                <SideCard key={ind} data={el} small={true} />
                            )
                        })}
                    </div>
                    <div className="col-md-4 col-12">
                        <SideNews />
                    </div>
                </div>
            </div>
        </Container>
    )
}


export default PagesHome


const Container = styled.div`
    ${props=>props.theme.containerWrap}
    margin-top:18px;
    padding:20px;
    background-color:#fff;
    margin-bottom:60px;
    @media (max-width:768px){ 
        padding:20px 0px;
    }
`