import React from 'react'
import ReactSlider from "react-slick";
import { CustomArrow } from "@/miscs/CustomComp";
import minimize from '@/miscs/minimize';

const settings = {
    infinite: true,
    speed: 800,
    // fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade:false,
    arrows: false,
    dots:true,
    autoplay: true,
    autoplaySpeed: 3000,
};

const TopBunner = ({ data }) => {
    const sliderRef = React.useRef();

    return (
        <div className="logo_par logo_par2">
            <ReactSlider 
                ref={sliderRef}
                {...settings}
            >
                {data?.map((el,ind)=>{
                    return(
                        <a key={ind} href={el.link !=='' && el.link !== null?`${el.link}`:`#`} target={el.link !=='' && el.link !== null?`_blank`:`_self`} >
                            <img src={minimize(el.image?.data?.attributes)} alt="bunner" />
                        </a>
                    )
                })}
            </ReactSlider>
        </div>
    )
}

export default TopBunner