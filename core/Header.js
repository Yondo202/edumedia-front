import React, { useState  } from 'react'
import { useRouter } from 'next/router'
import styled, { keyframes } from 'styled-components'
import { MenuContext } from '@/global/ContextMenuProvider'
import { FaHome } from "react-icons/fa"
import { BiSearchAlt } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import { ImUser } from "react-icons/im"
import MobileHeader from './MobileHeader'
// import useWindowDimensions from '@/miscs/WindowDeminsion'
import OutsideClickHandler from 'react-outside-click-handler';

const Header = ({ general }) => {
    const { push } = useRouter();
    const [ search, setSearch ] = useState('')
    const [ showSearch, setShowSearch ] = useState(false)
    const { config } = React.useContext(MenuContext)
    // const [scrollY, setScrollY] = useState(0);
    // const [ name, setName ] = useState('')
    const [visible, setVisible] = useState(false);
  

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

    // console.log(`width--->`, config.width)

    const globalClick = () =>{
        setShowSearch(false)
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
                        <img onClick={_=>push(`/`)} src="/img/logo_nonb.png" alt="edumedia_logo" />
                    </div>
                    <div className="logo_par logo_par2">
                        <img src="https://demo.afthemes.com/newsever-pro/light/wp-content/uploads/sites/3/2020/04/banner-promotion-1200.jpg" alt="bunner" />
                    </div>
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
                        </div>: general?.Menu?.map((el,ind)=>{
                                return(
                                    <div  onClick={_=>push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.url}`)} key={ind} className="items">{el.name}</div>
                                )
                        }) }
                       {config.width < 860 ? <MobileHeader data={general?.Menu??[]} visible={visible} setVisible={setVisible} /> : null }
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

                        <div className="items HomeSvg">
                            {/* Нэвтрэх */}
                            <ImUser />
                        </div>

                        <div className="items">
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
            }
        }
        .logo_par2{
            width:65%;
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