import React from "react";
import Root from "@/core/Root";
import PagesHome from "@/dynamic/Pageshome";
import axios from "@/global/axiosbase"

const Blog = ({ data, category }) => {
    return (
        <Root >
            <PagesHome data={data} category={category} />
        </Root>

    );
};

export default Blog;

export async function getServerSideProps({params, req}){
    if (parseInt(params.id)){
        let data = await axios.get(`/posts/?populate=*&filters[categories]=${params.id}`)
        let cat = await axios.get(`/categories/${params.id}`)
        return {props: { data: data?.data?.data, category: cat?.data?.data } }
    }else{
        console.log("--------")
        let cat = await axios.get(`/categories?filters[url]=${params.id}`)
        if(cat?.data?.data?.length !== 0){
            let data = await axios.get(`/posts/?populate=*&filters[categories]=${cat?.data?.data[0].id}`)
            return {props: { data: data?.data?.data, category: cat?.data?.data[0] } }
        // edu
        }else{
            return {props: { data: null, category: null } }
        }
    }
}