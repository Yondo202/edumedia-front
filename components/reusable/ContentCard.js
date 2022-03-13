import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { WiTime4 } from "react-icons/wi"
import { AiOutlineUser } from "react-icons/ai"
import { ContentCardStyle } from "@/miscs/CustomStyle"
import minimize from '@/miscs/minimize'

const ContentCard = ({ size, position, dark, read_hide, under_cat, data }) => {
    const [mouseMoved, setMouseMoved] = useState(false);
    const { push } = useRouter()

    const handleClick = (link) => {
        if (!mouseMoved) {
            push(link);
        }
    };

    const PushHandle = (id) =>{
        if(id){
            push(`${process.env.frontUrl}/usernews/${id}`)
        }
    }

    if(data){
        return (
            <ContentCardStyle under_cat={under_cat} size={size} position={position} dark={dark}>
                <div
                onMouseMove={() => setMouseMoved(true)} onMouseDown={() => setMouseMoved(false)}
                onMouseUp={_=>handleClick(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)}
                className="image_par">
                    <img
                        src={minimize(data?.attributes?.image?.data?.attributes, 'large')}
                        alt="eduinfo"
                    />
                </div>
                {(!read_hide&&data.attributes?.read_range)&&<div className="post_read">
                    <div className="read_text">
                        {data.attributes?.read_range?`${data.attributes?.read_range} мин уншина`:``}
                    </div>
                </div>}
                <div className="text_content">
                    <div className="category_par">
                        {data?.attributes?.categories?.data?.slice(0,2).map((el,ind)=>{
                            return(
                                <span 
                                onMouseMove={() => setMouseMoved(true)} onMouseDown={() => setMouseMoved(false)}
                                onMouseUp={_=>handleClick(`${process.env.frontUrl}/${process.env.categoryUrl}/${el.id}`)} key={ind} className="category">{el.attributes?.name}</span>
                            )
                        })}
                    </div>
                    <div
                        onMouseMove={() => setMouseMoved(true)} onMouseDown={() => setMouseMoved(false)}
                        onMouseUp={_=>handleClick(`${process.env.frontUrl}/${process.env.newsUrl}/${data.id}`)} className="content_title"
                    >
                        {data?.attributes?.title}
                    </div>
        
                    <div className="other">
                        <div className="texts date"><WiTime4 /> {data.attributes?.createdAt.slice(0,10)}</div>
                        <div onClick={_=>PushHandle(data?.attributes?.user?.data?.id)} className="texts writer"><AiOutlineUser />{data?.attributes?.user?.data?.attributes?.username??`EduMedia`}</div>
                    </div>
                </div>
            </ContentCardStyle>
        )
    }else{
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
 
}

export default ContentCard