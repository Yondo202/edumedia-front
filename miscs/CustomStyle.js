import styled from "styled-components";

export const MainButtonStyle = styled.button`
    background-color:${props=>props.color==="false"?`#fff`:props.theme.mainColor2};
    border-radius: 3px;
    text-align:center;
    vertical-align: middle;
    color: ${props=>props.color==="false"?`1px solid #000`:`#fff`};
    padding:6px 24px;
    font-size:13px;
    font-weight:${props=>props.theme.weight};
    // font-family:'SFProDisplaybold';
    outline: none !important;
    border:${props=>props.color==="false"?`1px solid #8a8d91`:`none`}; !important;
    transition:all 0.2s ease;
    position:relative;
    z-index:2;
    letter-spacing:0.2px;
    svg{
        position:absolute;
        ${props=>props.icon==='left'?`left: 5%;`:`right: 5%;`}
        top:32%;
        font-size:17px;
        color:${props=>props.color==="false"?`#8a8d91`:`#fff`};
    }
    &:hover{
        background-color: ${props=>props.color==="false"?`#d8d8d8`:`#05947C`};
    }
`

export const TitleStyle = styled.div`
    position:relative;
    margin-bottom:25px;
    font-size:20px;
    ${props=>props.theme.weight2}
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
            background-color: ${props=>props.theme.mainColor};
        }
        
    }
`

export const ContentCardStyle = styled.div`
    width:100%;
    margin-bottom: ${props=>props.size==='big'?`0px`:`15px`};
    position:relative;
    .image_par{
        width:100%;
        height: ${props=>props.size==='big'?`600px`:`293px`};
        position:relative;
        &:after{
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0.75;
            background-image:linear-gradient(to bottom, transparent 50%, #000);
        }
        img{
            width:100%;
            height:100%;
            min-width:100%;
            object-fit:cover;
        }
        @media screen and (max-width: 1366px) and (min-width: 1026px){
            ${props=>props.size==='big'?`
                height:550px;
            `:
            `
                height:265px;
            `}
        }
        @media (max-width:500px){
            height:265px;
        }
    }
    .post_read{
        position: absolute;
        right: 15px;
        top: 15px;
        display: inline-block;
        z-index: 1;
        .read_text{
            color:#202020;
            ${props=>props.theme.weight2}
            padding: 4px 10px;
            font-size: 12px;
            line-height: 17px;
            border-radius: 50px;
            background-color: rgba(255, 255, 255, 0.7);
        }
    }
    .text_content{
        background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
        ${props=>props.position==="outside"?`
        padding:15px 0px;
        `
        :`
        position: absolute;
        bottom: 0;
        left: 0;
        padding:15px;
        color:#fff;
        `}
        width: 100%;
        z-index: 1;
        
        .category_par{
            display:flex;
            gap:9px;
            padding-bottom:10px;
            .category{
                opacity:0.75;
                background-color:${props=>props.theme.mainColor};
                color:#fff;
                padding:4px 10px;
                cursor:pointer;
                transition:all 0.2s ease;
                text-transform:uppercase;
                font-size: ${props=>props.size==='big'?`10px`:`9px`};
                ${props=>props.theme.weight2}
                &:hover{
                    opacity:1;
                }
            }
        }
        
        .content_title{
            cursor:pointer;
            font-size: ${props=>props.size==='big'?`2.4em`:`1.6em`};
            ${props=>props.theme.weight4}
        }
        .other{
            display:flex;
            gap:19px;
            opacity:0.8;
            font-size: ${props=>props.size==='big'?`14px`:`12px`};
        }
    }
    @media (max-width:500px){
        .text_content{
            .content_title{
                font-size: 1.6em;
            }
        }
    }
`

export const ContentCardStyle2 = styled.div`
    margin-bottom:13px;
    background-color:rgba(32, 32, 32, 0.5);
    width:100%;
    display:flex;
    .text_par{
        width:75%;
        padding:0px 15px;
        .title{
            font-size:14px;
            color:#fff;
            opacity: 0.95;
            outline: none;
            ${props=>props.theme.weight2}
            padding:4px 0px;
            cursor:pointer;
        }
        .categorys{
            display:flex;
            gap:8px;
            .cat{
                ${props=>props.theme.weight2}
                font-size:9px;
                color:#fff;
                display: inline-block;
                position: relative;
                z-index: 1;
                padding: 4px 0px;
                text-transform: uppercase;
                opacity:0.75;
                cursor:pointer;
                &:hover{
                    opacity:1;
                }
                &:before{
                    content:'';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height:3px;
                    width:100%;
                    background-color: #a1cc20;
                }
            }
        }
    }
    .img_par{
        width:35%;
        height:110px;
        margin: 0;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
      
    }
    @media screen and (max-width: 1366px) and (min-width: 1026px){
        .img_par{
            height: 100px;
        }
    }
`