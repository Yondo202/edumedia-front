import React from 'react'
import { ContentCardStyle2 } from "@/miscs/CustomStyle"

const ContentCardSide = () => {
  return (
    <ContentCardStyle2 className="custom">
        <div className="img_par">
            <img src="https://demo.afthemes.com/newsever-pro/business/wp-content/uploads/sites/11/2018/07/adults-coffee-colleagues-1323592-150x150.jpg" alt="edumedia" />
        </div>
        <div className="text_par">
            <div className="categorys">
                <span className="cat">business</span>
                <span className="cat">tech</span>
            </div>
            <div className="title">
                Google hit with record EU fine over Shopping service
            </div>
        </div>
    </ContentCardStyle2>
  )
}

export default ContentCardSide