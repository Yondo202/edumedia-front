import React from "react";
import Root from "@/core/Root";
import { MenuContext } from '@/global/ContextMenuProvider'
import ResolveComponent from "@/dynamic/ResolveComponent"
import Newshome from "@/components/news/Newshome";
import axios from "@/global/axiosbase"
import decrease from "@/miscs/decrease";

const Blog = ({ news, addition }) => {
    const {completelyLoaded} = React.useContext(MenuContext);
    let { Layout } = addition
    // seo={{title: news.name, description: decrease(news.description, 120), thumb: news.thumb.url }}
    return (
        <Root seo={{title: news?.attributes?.title, description: decrease(news?.attributes?.body, 120), thumb: news?.attributes?.image?.data?.attributes?.url }}>
            <Newshome data={news} />
            {completelyLoaded && <ResolveComponent data={Layout}/>}
        </Root>
    );
};

export default Blog;

// export async function getServerSideProps({ params, req }) {
//     const res = await Axios(process.env.serverUrl + '/api/home?populate=deep,4')
//     return { props: { data: res.data?.data?.attributes } }
// }

export async function getServerSideProps({params, req}){
    const res = await axios('/home?populate=deep,4')

    let data = await axios.get(`/posts/${params.id}/?populate=*`)
    if(data.data.data){
        await axios.put(`/posts/${params.id}`,{ data: { count: parseInt(data.data.data?.attributes?.count??0) + 1 } })
    }
    return { props: { news: data?.data?.data, addition:res?.data?.data?.attributes }}
}

// export async function getServerSideProps({ params, req }) {
//     const res = await Axios(process.env.serverUrl + '/api/home?populate=deep,4')
//     return { props: { data: res.data?.data?.attributes } }
//   }