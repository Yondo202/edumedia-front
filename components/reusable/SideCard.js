import React from 'react'
import styled from 'styled-components'
import { WiTime4 } from "react-icons/wi"
import { AiOutlineUser } from "react-icons/ai"

const SideCard = ({ small }) => {
    return (
        <Container small={small} className="custom_card">
            <div className="image_par">
                <img src="https://demo.afthemes.com/newsever-pro/light/wp-content/uploads/sites/3/2018/07/sky-town-city-landmark-urban-area-street-1449703-pxhere.com-1.jpg" alt="edumedia_img" />
            </div>
            <div className="text_content">
                <div className="category_par">
                    <span className="category">business</span>
                    <span className="category">media</span>
                </div>
                <div className="content_title">Trump-Putin: Your toolkit to help understand the story</div>

                <div className="other">
                    <div className="texts date"><WiTime4 /> July 18, 2018</div>
                    <div className="texts writer"><AiOutlineUser /> AF themes</div>
                </div>
            </div>
        </Container>
    )
}

export default SideCard

const Container = styled.div`
    ${({theme, small})=>`
            margin-bottom:30px;
            display:grid;
            grid-template-columns:repeat(2, 1fr);
            .image_par{
                img{
                    width:100%;
                    height:auto;
                }
            }
            @media (max-width:850px){
                grid-template-columns:repeat(1, 1fr);
            }
           
            .text_content{
                padding: ${small ?`20px 20px`:`50px 20px`};
                width: 100%;
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
                            margin-right:4px;
                            font-size:15px;
                        }
                    }
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