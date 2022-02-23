import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ContentCard from '@/components/reusable/ContentCard'
import SideNews from '@/components/reusable/SideNews'
import axios from "@/global/axiosbase"

const Homecontents = () => {

    const [ leftNews, setLeftNews ] = useState([])
    const [ bigNews, setBigNews ] = useState([])
    const [ smNews, setSmNews ] = useState([])
    useEffect(()=>{
        FetchData()
    },[])

    const FetchData = async () =>{
        let big = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=2.3`)
        let sm = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=2.2`)
        let left = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=2.1`)
        setBigNews(big?.data?.data)
        setSmNews(sm?.data?.data)
        setLeftNews(left?.data?.data)
    }


  return (
    <Container>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-12">
                    <div className="left_trending">
                        <div className="content_par">
                            {leftNews.map((el,ind)=>{
                                return(
                                    <ContentCard key={ind} data={el} position="outside" dark={true} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="contents_middle">
                        <div className="row">

                            {bigNews.slice(0,1).map((el,ind)=>{
                                return(
                                    <div key={ind} className="col-md-12 col-12">
                                        <ContentCard data={el} size="medium" />
                                    </div>
                                )
                            })}

                            {smNews.slice(0,4).map((el,ind)=>{
                                return(
                                <div key={ind} className="col-md-6 col-12">
                                    <ContentCard data={el} under_cat={true} read_hide={true} />
                                </div>
                                )
                            })}

                        </div>
                    </div>
                    
                </div>
                <div className="col-md-3 col-12">
                    <SideNews />
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
            position:sticky;
            top:30px;
            padding:10px 15px;
            background-color:${theme.background2};
            .content_par{
                padding:15px;
                background-color:${theme.background};
            }
        }
       
    `}
`