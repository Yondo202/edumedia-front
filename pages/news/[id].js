import React from "react";
import Root from "@/core/Root";
import Newshome from "@/components/news/Newshome";
import axios from "@/global/axiosbase"
import decrease from "@/miscs/decrease";

const Blog = ({ news }) => {
    // seo={{title: news.name, description: decrease(news.description, 120), thumb: news.thumb.url }}
    return (
        <Root seo={{title: news?.attributes?.title, description: decrease(news?.attributes?.body, 120), thumb: news?.attributes?.image?.data?.attributes?.url }}>
            <Newshome data={news} />
        </Root>

    );
};

export default Blog;

export async function getServerSideProps({params, req}){
    let data = await axios.get(`/posts/${params.id}/?populate=*`)
    if(data.data.data){
        await axios.put(`/posts/${params.id}`,{ data: { count: parseInt(data.data.data?.attributes?.count??0) + 1 } })
    }
    return { props: { news: data?.data?.data }}
}