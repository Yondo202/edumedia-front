import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import ReactSlider from "react-slick";
import { CustomArrow } from "@/miscs/CustomComp";
import { TitleStyle } from "@/miscs/CustomStyle"
import ContentCard from '@/components/reusable/ContentCard'
import ContentCardSide from '@/components/reusable/ContentCardSide'
import axios from "@/global/axiosbase"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade:false,
    arrows: false,
    dots:false,
    autoplay: true,
    autoplaySpeed: 3000,
};

const Hometop = () => {
    const sliderRef = useRef();
    const [ leftNews, setLeftNews ] = useState([])
    const [ bigNews, setBigNews ] = useState([])
    const [ smNews, setSmNews ] = useState([])
    
    useEffect(()=>{
        
        FetchData()
    },[])

    const FetchData = async () =>{
        let big = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=1.1&pagination[start]=0&pagination[limit]=10`)
        let sm = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=1.2&pagination[start]=0&pagination[limit]=2`)
        let left = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[position][code][$eq]=1.3&pagination[start]=0&pagination[limit]=5`)
        setBigNews(big?.data?.data)
        setSmNews(sm?.data?.data)
        setLeftNews(left?.data?.data)
    }
    
    // console.log(`leftNews`, leftNews)

    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-12">
                        <div className="right_trending">
                            <TitleStyle><span className="text">ТРЭНД МЭДЭЭ</span></TitleStyle>
                            <div className="content_par">
                                {leftNews?.map((el,ind)=>{
                                    return(
                                        <ContentCardSide  key={ind} data={el} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-9 col-12">
                            <div className="row">
                                <div className="col-md-8 col-12">

                                    <TitleStyle>
                                        <span className="text">Онцлох</span>
                                    </TitleStyle>
                                    <div className="slick_parent">
                                        <ReactSlider 
                                            ref={sliderRef}
                                            {...settings}
                                        >
                                            {bigNews?.map((el,ind)=>{
                                                return(
                                                    <ContentCard key={ind} data={el} size="big" position="outside" />
                                                )
                                            })}
                                        </ReactSlider>
                                        <CustomArrow data={bigNews} sliderRef={sliderRef} />
                                    </div>

                                </div>
                            <div className="col-md-4 col-12">
                                <div className="top_two">
                                    <TitleStyle><span className="text">САНАЛ БОЛГОСОН</span></TitleStyle>
                                    {smNews?.map((el,ind)=>{
                                        return(
                                            <ContentCard key={ind} data={el} />
                                        )
                                    })}
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