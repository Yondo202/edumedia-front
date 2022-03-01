import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { WiTime4 } from "react-icons/wi"
import { AiOutlineUser } from "react-icons/ai"
import minimize from '@/miscs/minimize'
import {FacebookShareButton,TwitterShareButton, LinkedinShareButton, PinterestShareButton, EmailShareButton } from 'react-share';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"


const SideCard = ({ small, data }) => {
    const { push } = useRouter()

    if(data){
        return (
            <Container small={small} className="custom_card">
                <div  onClick={_=>push(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)} className="image_par">
                    <img src={minimize(data.attributes.image?.data?.attributes)} alt="edumedia_img" />
                </div>
                <div className="text_content">
                    <div>
                        <div className="category_par">
                            {data.attributes?.categories?.data?.map((el,ind)=>{
                                return(
                                    <span onClick={_=>push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.id}`)} key={ind} className="category">{el.attributes?.name}</span>
                                )
                            })}
                        
                            {/* <span className="category">media</span> */}
                        </div>
                        <div  onClick={_=>push(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)} className="content_title">{data.attributes?.title}</div>
        
                        <div className="other">
                            <div className="texts date"><WiTime4 /> {data.attributes?.createdAt.slice(0,10)}</div>
                            <div className="texts writer"><AiOutlineUser />EduMedia</div>
                        </div>
                    </div>

                    <div className="share_button">
                        {/* <FacebookShareButton  imageURL={minimize(news.thumb,"medium")} title="hahaha" media={minimize(news.thumb,"small")} resetButtonStyle={true} url={`http://e-medee.mn${process.env.newsUrl}${news.Slug}`} style={{ width: 50, height: 50 }} >
                            <div className="Btnss facebook"><FaFacebookF /></div>
                        </FacebookShareButton> */}
                        <FacebookShareButton resetButtonStyle={true} url={`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`} >
                            <div className="Btnss facebook"><FaFacebookF /></div>
                        </FacebookShareButton>

                        <TwitterShareButton resetButtonStyle={true} url={`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`}  >
                            <div className="Btnss twitter"><FaTwitter /></div>
                        </TwitterShareButton>

                        <PinterestShareButton resetButtonStyle={true} url={`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`}  >
                            <div className="Btnss FaPinterestP"><FaPinterestP /></div>
                        </PinterestShareButton>
{/* 
                        <EmailShareButton resetButtonStyle={true} url={`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`}  >
                            <div className="Btnss AiOutlineMail"><MdEmail /></div>
                        </EmailShareButton> */}

                    </div>
                </div>
            </Container>
        )
    }else{
       return  <div />
    }
    
}

export default SideCard

const Container = styled.div`
    ${({theme, small})=>`
            margin-bottom:30px;
            display:grid;
            grid-template-columns:repeat(2, 1fr);
            .image_par{
                cursor:pointer;
                img{
                    width:100%;
                    height:auto;
                }
            }
            @media (max-width:850px){
                grid-template-columns:repeat(1, 1fr);
            }
           
            .text_content{
                min-height:100%;
                padding: ${small ?`20px 20px`:`50px 20px`};
                width: 100%;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                align-items:space-between;
                .category_par{
                    display:flex;
                    gap:10px;
                    .category{
                        ${theme.weight2}
                        font-size:12px;
                        color:${theme.textColor2}
                        display: inline-block;
                        position: relative;
                        z-index: 1;
                        padding: 4px 0px;
                        text-transform: uppercase;
                        opacity:0.8;
                        cursor:pointer;
                        &:hover{
                            opacity:1;
                        }
                        &:before{
                            content:'';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            height:2px;
                            width:100%;
                            background-color: ${theme.mainColor};
                        }
                    }
                }
                
                .content_title{
                    padding:20px 0px;
                    cursor:pointer;
                    font-size:${small ?`1.7em`:`3em`};
                    ${theme.weight4}
                }
                .other{
                    ${theme.weight3}
                    display:flex;
                    gap:19px;
                    opacity:0.8;
                    font-size: 14px;
                    .texts{
                        display:flex;
                        align-items:Center;
                        svg{
                            margin-right:5px;
                            font-size:18px;
                        }
                    }
                }
                .share_button{
                    // margin-bottom:9px;
                    display:flex;
                    gap:18px;
                    .Btnss{
                        border-radius:50%;
                        color:#ffffff;
                        font-size:12px;
                        width:43px;
                        height:43px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        svg{
                            transition:all 0.2s ease;
                            font-size:15px;
                        }
                        &:hover{
                            svg{
                                transform:scale(1.3);
                            }
                        }
                    }
                    .FaPinterestP{
                        background: #cb2027;
                    }
                    .facebook{
                        background: #3b5998;
                    }
                    .twitter{
                        background-color: rgb(29, 161, 242);
                    }
                    // .AiOutlineMail{
                    //     font-size:14px;
                    //     background-color: #bbb;
                    // }
                }
            }
            @media (max-width:796px){
                .category_par{
                    .category{
                        font-size:10px;
                    }
                }
                .text_content{
                    padding:10px 15px;
                    .content_title{
                        font-size: ${small ?`1.5em`:`2em`};
                    }
                }
            }
    `}
`