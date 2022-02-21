import React, { useState  } from 'react'
import styled from 'styled-components'
import { MenuContext } from '@/global/ContextMenuProvider'
import { FaHome } from "react-icons/fa"
import { BiSearchAlt } from "react-icons/bi"
import { AiOutlineMenu } from "react-icons/ai"
import MobileHeader from './MobileHeader'
import useWindowDimensions from '@/miscs/WindowDeminsion'

const Header = ({ general }) => {
    const { config } = React.useContext(MenuContext)
    const [scrollY, setScrollY] = useState(0);
    const [ name, setName ] = useState('')
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

    console.log(`width--->`, config.width)

    console.log(`general`, general)

    return (
        <>
            <TopHeadStyle>
                <div className="inner">
                    <div className="logo_par">
                        <img src="/img/logo_nonb.png" alt="edumedia_logo" />
                    </div>
                    <div className="logo_par logo_par2">
                        <img src="https://demo.afthemes.com/newsever-pro/light/wp-content/uploads/sites/3/2020/04/banner-promotion-1200.jpg" alt="bunner" />
                    </div>
                </div>
            </TopHeadStyle>
            <Container  >
                <div className="top_menus">
                    <div className="left_sector">

                        <div className="items HomeSvg">
                            <FaHome />
                        </div>
                        <div className="desktop">

                        </div>

                        { config.width < 860 ? <div className="mobile_icon" onClick={_=>setVisible(true)}>
                            <AiOutlineMenu />
                        </div>: menuData.map((el,ind)=>{
                                return(
                                    <div key={ind} className="items">{el.text}</div>
                                )
                        }) }
                        

                       {config.width < 860 ? <MobileHeader data={menuData} visible={visible} setVisible={setVisible} /> : null }
                        

                    </div>
                    <div className="left_sector right">
                        <div className="search_div">
                            <BiSearchAlt />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Header

// #d2d6e2 //grey color

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
                font-size: 14px;
                // line-height: 20px;
                padding: 0px 20px;
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
        .search_div{
            cursor:pointer;
            svg{
                font-size:20px;
            }
        }
    }
`