import React from 'react'
import { ContentCardStyle } from "@/miscs/CustomStyle"

const ContentCard = ({ size, position }) => {
  return (
    <ContentCardStyle size={size} position={position}>
        <div className="image_par">
            <img
                src="https://demo.afthemes.com/newsever-pro/business/wp-content/uploads/sites/11/2018/07/businessmen-businesspeople-businesswomen-1249158-1024x672.jpg"
                alt="eduinfo"
            />
        </div>
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
    </ContentCardStyle>
  )
}

export default ContentCard