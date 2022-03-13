import React, { useState  } from 'react'
import minimize from '@/miscs/minimize';
import { smoothSm } from "@/miscs/CustomStyle"
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import { MenuContext } from '@/global/ContextMenuProvider'
import { FaHome } from "react-icons/fa"
import { BiSearchAlt } from "react-icons/bi"
import { AiOutlineMenu, AiOutlineUser, AiOutlineArrowRight } from "react-icons/ai"
import { ImUser } from "react-icons/im"
import MobileHeader from './MobileHeader'
// import useWindowDimensions from '@/miscs/WindowDeminsion'
import OutsideClickHandler from 'react-outside-click-handler';
import TopBunner from './TopBunner';

const Header = ({ general }) => {
    const { jwt, email } = parseCookies()
    const { push } = useRouter();
    const [ search, setSearch ] = useState('')
    const [ showSearch, setShowSearch ] = useState(false)
    const { config } = React.useContext(MenuContext)
    // const [scrollY, setScrollY] = useState(0);
    // const [ name, setName ] = useState('')
    const [visible, setVisible] = useState(false);

    const [visibleLog, setVisibleLog] = useState(false);
  

    // function logit() {
    //     setScrollY(window.pageYOffset);
    // }

    // useEffect(() => {
    //     function watchScroll() {
    //     window.addEventListener("scroll", logit);
    //     }
    //     watchScroll();
    //     return () => {
    //     window.removeEventListener("scroll", logit);
    //     };
    // }, []);

    const LogOut = () =>{
        destroyCookie(null, 'jwt')
        destroyCookie(null, 'email')
        destroyCookie(null, 'user_id')
        destroyCookie(null, 'username')
        push('/')
        setVisibleLog(false)
    }

    const globalClick = () =>{
        setShowSearch(false)
    }
    const globalClick2 = () =>{
        setVisibleLog(false)
    }

    const Submithandle = (e) =>{
        e.preventDefault()
        push(`/search?text=${search}`)
        setShowSearch(false)
    }

    return (
        <>
            <TopHeadStyle>
                <div className="inner">
                    <div className="logo_par">
                        <img onClick={_=>push(`/`)} src={minimize(general?.logoBig?.data?.attributes)} alt="edumedia_logo" />
                    </div>
                    <TopBunner data={general.TopBunner} />
                </div>
            </TopHeadStyle>
            <Container  >
                <div className="top_menus">
                    <div className="left_sector">

                        <div onClick={_=>push(`/`)} className="items HomeSvg">
                            <FaHome />
                        </div>

                        { config.width < 860 ? <div className="mobile_icon" onClick={_=>setVisible(true)}>
                            <AiOutlineMenu />
                        </div>: 
                        <>
                            {general?.menu?.map((el,ind)=>{
                                return(
                                    <div onClick={_=>push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.news?.data?.attributes.url}`)} key={ind} className="items">
                                        {el.text??el.news?.data?.attributes.name}
                                    </div>
                                )
                            })}
                            {general?.subMenu?.length !== 0 ?<div className="items others">
                                Бусад
                                <div className="other_par">
                                    {general?.subMenu?.map((el,ind)=>{
                                        return(
                                            <div onClick={_=>push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.news?.data?.attributes.url}`)} key={ind} className="sub_items">
                                                {el.text??el.news?.data?.attributes.name}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>:null}
                        </>
                                
                        
                        }
                       {config.width < 860 ? <MobileHeader data={[...general?.menu, ...general?.subMenu]??[]} visible={visible} setVisible={setVisible} /> : null }
                    </div>
                    <div className="left_sector right">
                        <div className="search_div">
                            <BiSearchAlt onClick={_=>setShowSearch(prev=>!prev)} />

                            {showSearch && <OutsideClickHandler
                                    onOutsideClick={() => globalClick()}
                            >
                                <div className="search_inp">
                                    <form onSubmit={Submithandle} className="input_par">
                                        <button type="submit" ><BiSearchAlt /></button>
                                        <input autoFocus value={search} onChange={e=>setSearch(e.target.value)} required placeholder="Бичээд 'Enter - дарна уу' " />
                                    </form>
                                </div>
                            </OutsideClickHandler>}
                            
                        </div>

                        {!jwt?<div onClick={_=>push(`/auth/login`)} className="items HomeSvg userSector">
                            {/* Нэвтрэх */}
                            <ImUser />
                        </div>
                        :<div className="userSector">
                            <div onClick={_=>setVisibleLog(true)} className="username">
                                {email?.slice(0,1)}
                            </div>
                            
                            {visibleLog&&<OutsideClickHandler
                                onOutsideClick={() => globalClick2()}
                            >
                                <div className="setting_modal">
                                    <div className="modal_item">
                                        <div className="svgs"><AiOutlineUser /></div>
                                        <span className="text">{email}</span>  
                                    </div>

                                    <div onClick={LogOut} className="modal_item">
                                        <div className="svgs"><AiOutlineArrowRight /></div>
                                        <span className="text">Гарах</span>  
                                    </div>
                                </div>
                            </OutsideClickHandler>}
                            
                        </div>}

                        <div onClick={_=>push(`/user/insertblog`)} className="items">
                            Мэдээ оруулах
                        </div>
                    </div>
                   
                </div>
            </Container>
        </>
    )
}

export default Header

// #d2d6e2 //grey color

const animate = keyframes`
    0%{ transform:translateY(8px); opacity:0.5; }
    100%{ transform:translateY(0px); opacity:1; }
`

const TopHeadStyle = styled.div`
    background: url(/img/top_background.jpg) no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding:36px 0px;
    .inner{
        display:flex;
        justify-content:space-between;
        ${props=>props.theme.containerWrap}
        .logo_par{
            cursor:pointer;
            width:25%;
            display:flex;
            justify-content:center;
            align-items:center;
            img{
                width:100%;
                height:auto;
                object-fit:contain;
                max-height:200px;
            }
        }
        .logo_par2{
            width:65%;
            .slick-slider{
                width:100%;
                img{
                    width:100%;
                    height:auto;
                    object-fit:contain;
                    max-height:100px;
                }
            }
        }
    }
    @media (max-width:768px){
        padding:28px 0px;
        .inner{
            flex-direction:column;
            justify-content:center;
            align-items:center;
            gap:30px;
            height:100%;
            .logo_par{
                width:70%;
            }
            .logo_par2{
                width:100%;
            }
        }
    }
    
`

const menuData = [
    { text:'Боловсрол' },
    // { text:'Шинжлэх ухаан' },
    { text:'Иноваци' },
    { text:'БСШУЯ' },
    // { text:'Эрдэм шинжилгээ' },
    // { text:'Мэдээллийн технологи' },
    { text:'Эрүүл мэнд' },
    { text:'Фото мэдээлэл' },
    { text:'Энтертайнмент' },
    { text:'Бусад' },
]


const Container = styled.div`
    height: 51px;
    // background-image:-webkit-linear-gradient(140deg, #0096c4, #20c96f);
    // background-image:linear-gradient(140deg, #0096c4, #20c96f);
    background:#cc0000;
    background-image:-webkit-linear-gradient(140deg, #cc0000, #f25600);
    background-image:linear-gradient(140deg, #cc0000, #f25600);
    border-top:3px solid #a1cc20;
    color:#fff;
    .top_menus{
        display:flex;
        align-items:center;
        justify-content:space-between;
        height:100%;
        width:100%;
        ${props=>props.theme.containerWrap}
        .left_sector{
            display:flex;
            align-items:center;
            height:100%;
            .mobile_icon{
                cursor:pointer;
                padding:0px 20px;
                svg{
                    color:#fff;
                    font-size:26px;
                }
            }
            .items{
                position: relative;
                font-size: 11.5px;
                // line-height: 20px;
                padding: 0px 13px;
                white-space:nowrap;
                display:flex;
                align-items:center;
                height:100%;
                cursor:pointer;
                ${props=>props.theme.weight2}
                &:after{
                    content:'';
                    position:absolute;
                    z-index:1;
                    bottom:0;
                    left:0;
                    width:0%;
                    height:2px;
                    background-color:#fff;
                    transition:all 0.250s ease;
                }
                &:hover{
                    &:after{
                        width:100%;
                    }
                }
            }
            .others{
                position:relative;
                .other_par{
                    display:none;
                    animation:${smoothSm} 0.3s ease;
                    box-shadow:0px 0px 16px -7px #000; 
                    position:absolute;
                    top:100%;
                    right:0;
                    background-color:#fff;
                    z-index:4;
                    border-radius:5px;
                    .sub_items{
                        padding:10px 28px;
                        font-size:13px;
                        color:${props=>props.theme.textColor};
                        &:hover{
                            background-color:rgba(0,0,0,0.057);
                        }
                    }
                }
                &:hover{
                    .other_par{
                        display:block;
                    }
                }
            }
            .HomeSvg{
                &:after{
                    display:none;
                }
                svg{
                    font-size:20px;
                }
                padding: 0px 12px;
                background-color:${props=>props.theme.mainColor};
                &:hover{
                    opacity:0.9;
                    transition:all 0.250s ease;
                }
            }
            .userSector{
                position:relative;
                padding:0px 12px !important;
                font-size: 11.5px;
                white-space:nowrap;
                display:flex;
                align-items:center;
                height:100%;
                cursor:pointer;
                ${props=>props.theme.weight2}
                .username{
                    text-transform:uppercase;
                    ${props=>props.theme.weight4}
                    background-color:rgba(255,255,255,0.9);
                    width:28px;
                    height:28px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    border-radius:50%;
                    font-weight:bold;
                    font-size:18px;
                    color:${props=>props.theme.mainColor};
                    cursor:pointer;
                    // padding-bottom:4px;
                    position:relative;
                    &:after{
                        content:'';
                        position:absolute;
                        top:-3px;
                        right:-2px;
                        background-color:#09c709;
                        height:9px;
                        width:9px;
                        border-radius:50%;
                    }
                }
                .setting_modal{
                    animation:${smoothSm} 0.3s ease;
                    cursor: auto !important;
                    position:absolute;
                    top:122%;
                    right:0;
                    background-color: #fff; 
                    color: ${props=>props.theme.textColor}; 
                    font-size:15px;
                    z-index:4;
                    border-radius:8px;
                    box-shadow:0px 0px 16px -7px #000; 
                    padding:12px 20px;
                    .modal_item{
                        cursor:pointer;
                        display:flex;
                        align-items:center;
                        padding:14px 0px;
                        gap:17px;
                        .svgs{
                            // margin-right:10px;
                            background-color:rgba(0,0,0,0.057);
                            height:34px;
                            width:34px;
                            border-radius:50%;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            svg{
                                font-size:20px;
                            }
                        }
                        .text{
                            margin-right:8px;
                            display: inline-block;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        &:hover{
                            color: ${props=>props.theme.mainColor}; 
                        }
                    }
                }
            }
        }
        .right{
            display:flex;
            gap:16px;
            .items{
                padding: 0px 16px;
            }
            .search_div{
                position:relative;
                cursor:pointer;
            svg{
                font-size:24px;
            }
            .search_inp{
                animation: ${animate} 0.3s ease;
                position:absolute;
                z-index:10;
                right:0;
                top:140%;
                background-color:#fff;
                padding:15px;
                box-shadow:1px 1px 18px -8px black;
                .input_par{
                    display:flex;
                    align-items:center;
                    button{
                        border:none;
                        outline:none;
                        background:none;
                        svg{
                            font-size:23px;
                            margin-right:12px;
                            color:#000;
                        }
                    }
                    input{
                        width:240px;
                        padding:7px 20px;
                        border:none;
                        outline:none;
                        background-color:rgba(32, 32, 32, 0.1);
                        color:#000;
                        border: 1px solid #fff;
                        &:focus{
                            border: 1px solid #000;
                            background-color:rgba(200, 200, 200, 0.1);
                        }
                    }
                   
                }
            }
        }
        }
        
    }
`