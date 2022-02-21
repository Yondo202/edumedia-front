import React from 'react'
import minimize from '@/miscs/minimize'
import { ContentCardStyle2 } from "@/miscs/CustomStyle"

const ContentCardSide = ({ data }) => {
    if(data){
        return (
            <ContentCardStyle2 className="custom">
                <div className="img_par">
                    <img src={minimize(data?.attributes?.image?.data?.attributes, 'thumbnail')} alt="edumedia" />
                </div>
                <div className="text_par">
                    <div className="category_par">
                        {data?.attributes?.categories?.data?.slice(0,2).map((el,ind)=>{
                            return(
                                <span key={ind} className="category">{el.attributes?.name}</span>
                            )
                        })}
                    </div>
                    <div className="title">
                        {data?.attributes?.title}
                    </div>
                </div>
            </ContentCardStyle2>
          )
    }else{
        return (
            <ContentCardStyle2 className="custom">
                <div className="img_par">
                    <img src="https://demo.afthemes.com/newsever-pro/business/wp-content/uploads/sites/11/2018/07/adults-coffee-colleagues-1323592-150x150.jpg" alt="edumedia" />
                </div>
                <div className="text_par">
                    <div className="category_par">
                        <span className="category">business</span>
                        <span className="category">tech</span>
                    </div>
                    <div className="title">
                        Google hit with record EU fine over Shopping service
                    </div>
                </div>
            </ContentCardStyle2>
        )
    }
  
}

export default ContentCardSide