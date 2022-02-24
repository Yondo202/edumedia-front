import React,{ useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components'
import axios from "@/global/axiosbase"
import { TitleStyle } from "@/miscs/CustomStyle";
import SideNews from '@/components/reusable/SideNews'
import SideCard from '@/components/reusable/SideCard'

const PagesHome = ({ data, category}) => {
    const [ stateData, setStateData ] = useState([])
    const { route, query } = useRouter()

    useEffect(()=>{
        if(route === '/search'){
            void async function fetch(){
               const ress = await axios.get(`/posts?populate=*&filters[title][$containsi]=${query.text}`)
               setStateData(ress?.data?.data)
            }()
        }
    },[query.text])


    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9 col-12">
                        <TitleStyle><span className="text">{ route !== '/search'? category?.attributes.name: `Хайлтын үр дүн  (${stateData.length})` }  </span></TitleStyle>
                        {route !== '/search'?
                            data?.map((el,ind)=>{
                                return(
                                    <SideCard key={ind} data={el} small={true} />
                                )
                            }):
                            stateData?.map((el,ind)=>{
                                return(
                                    <SideCard key={ind} data={el} small={true} />
                                )
                            })
                        }
                    </div>
                    <div className="col-md-3 col-12">
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