import React from "react";
import Root from "@/core/Root";
import PagesHome from "@/dynamic/Pageshome";
import axios from "@/global/axiosbase"

const Blog = ({ data, category }) => {
    // console.log(`data`, data)
    return (
        <Root >
            <PagesHome data={data} category={category} />
        </Root>

    );
};

export default Blog;

// export async function getServerSideProps({params, req}){
//     let data = await axios.get(`/posts/?populate=*&filters[title]=${params.id}`)
//     return { props: { data: data?.data?.data, category: null, title:'Хайлтын үр дүн ( 10 )'} }
// }