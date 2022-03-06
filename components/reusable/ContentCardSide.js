import React from 'react'
import { useRouter } from 'next/router'
import minimize from '@/miscs/minimize'
import { ContentCardStyle2 } from "@/miscs/CustomStyle"

const ContentCardSide = ({ data }) => {
    const { push } = useRouter()
    if(data){
        return (
            <ContentCardStyle2 className="custom">
                <div onClick={_=>push(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)} className="img_par">
                    <img src={minimize(data?.attributes?.image?.data?.attributes, 'thumbnail')} alt="edumedia" />
                </div>
                <div className="text_par">
                    <div className="category_par">
                        {data?.attributes?.categories?.data?.slice(0,2).map((el,ind)=>{
                            return(
                                <span onClick={_=>push(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.id}`)} key={ind} className="category">{el.attributes?.name}</span>
                            )
                        })}
                    </div>
                    <div onClick={_=>push(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)} className="title">
                        {data?.attributes?.title}
                    </div>
                </div>
            </ContentCardStyle2>
          )
    }else{
        <div />
    }
  
}

export default ContentCardSide