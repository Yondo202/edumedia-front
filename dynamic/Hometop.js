import React from 'react'
import styled from 'styled-components'
import Image from "next/image"

const Hometop = () => {
    const convertImage = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

    const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
    return (
        <Container>
            <div className="slick_parent">
                <div className="title_par">
                    <span className="text">MAIN NEWS</span>
                </div>
                <div className="content_parent">
                    <img
                        src="https://demo.afthemes.com/newsever-pro/business/wp-content/uploads/sites/11/2018/07/businessmen-businesspeople-businesswomen-1249158-1024x672.jpg"
                        alt="eduinfo"
                    />
                    <div className="post_read">
                        <div className="read_text">
                            1 мин уншина
                        </div>
                    </div>
                    <div className="text_content">
                        <div className="category_par">
                            <span className="category">business</span>
                            <span className="category">media</span>
                        </div>
                        <div className="content_title">Trump-Putin: Your toolkit to help understand the story</div>

                        <div className="other">
                            <div className="date">July 18, 2018</div>
                            <div className="writer">AF themes</div>
                        </div>
                    </div>
                    {/* <Image
                        quality={100}
                        layout="responsive"
                        width={50}
                        height={100}
                        src="https://demo.afthemes.com/newsever-pro/business/wp-content/uploads/sites/11/2018/07/charts-data-desk-669615-768x508.jpg"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            convertImage(700, 475)
                        )}`}
                    /> */}
                </div>
            </div>
            <div className="right_parent">

            </div>
        </Container>
    )
}

export default Hometop


const Container = styled.div`
    ${({theme})=>`
        ${theme.containerWrapFull}
        background: #202020;
        background-image:linear-gradient(45deg, #202020, #404040);
        background-image:-webkit-linear-gradient(45deg, #202020, #404040);
        display:flex;
        .slick_parent{
            width:50%;
            .title_par{
                position:relative;
                margin-bottom:25px;
                font-size:20px;
                ${theme.weight2}
                &:before{
                    content:'';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height:3px;
                    width:100%;
                    background-color: rgba(0,0,0,.1);
                }
                
                .text{
                    color:#fff;
                    display: inline-block;
                    position: relative;
                    z-index: 1;
                    padding: 5px 5px 15px 0;
                    text-transform: uppercase;
                    &:before{
                        content:'';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height:3px;
                        width:100%;
                        background-color: ${theme.mainColor};
                    }
                    
                }
            }
            .content_parent{
                width:100%;
                position:relative;
                img{
                    width:100%;
                    height:auto;
                    min-width:100%;
                    object-fit:cover;
                }
                .post_read{
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    display: inline-block;
                    z-index: 1;
                    .read_text{
                        color:#202020;
                        ${theme.weight2}
                        padding: 4px 10px;
                        font-size: 12px;
                        line-height: 17px;
                        border-radius: 50px;
                        background-color: rgba(255, 255, 255, 0.7);
                    }
                }
                .text_content{
                    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1;
                    color:#fff;
                    padding:15px;
                    .category_par{
                        display:flex;
                        gap:14px;
                        padding-bottom:10px;
                        .category{
                            opacity:0.75;
                            background-color:${theme.mainColor};
                            color:#fff;
                            padding:4px 10px;
                            cursor:pointer;
                            transition:all 0.2s ease;
                            text-transform:uppercase;
                            font-size:10.5px;
                            ${theme.weight2}
                            &:hover{
                                opacity:1;
                            }
                        }
                    }
                    
                    .content_title{
                        font-size:40px;
                        ${theme.weight4}
                    }
                    .other{
                        display:flex;
                        gap:19px;
                        opacity:0.9;
                    }
                }

            }
        }
        .right_parent{
            width:50%;
        }
    `}
`