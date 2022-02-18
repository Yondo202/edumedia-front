import React from 'react'
import { WiTime4 } from "react-icons/wi"
import { AiOutlineUser } from "react-icons/ai"
import { ContentCardStyle } from "@/miscs/CustomStyle"

const ContentCard = ({ size, position, dark, read_hide, under_cat }) => {
  return (
    <ContentCardStyle under_cat={under_cat} size={size} position={position} dark={dark}>
        <div className="image_par">
            <img
                src="https://demo.afthemes.com/newsever-pro/light/wp-content/uploads/sites/3/2018/07/wing-cloud-sky-air-flying-fly-651586-pxhere.com_-1024x755.jpg"
                alt="eduinfo"
            />
        </div>
        {!read_hide&&<div className="post_read">
            <div className="read_text">
                1 мин уншина
            </div>
        </div>}
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
    </ContentCardStyle>
  )
}

export default ContentCard