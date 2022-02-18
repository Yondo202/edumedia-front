import React from "react";
import Root from "@/core/Root";
import Newshome from "@/components/news/Newshome";

const Blog = () => {
    return (
        <Root >
            <Newshome />
        </Root>

    );
};

export default Blog;

export async function getServerSideProps({params, req}){
    // let data = await checkLanguage(`/posts?slug=${params.id}`, req, true);

    // let add
    // if(data.data[0]?.count){
    //      add = parseInt(data.data[0].count) + 1
    // }else{
    //      add = 1
    // }
    // await Axios.put(process.env.serverUrl+'/posts/'+ data.data[0]?.id, {count: add});
    return {props: {news: null}}
}