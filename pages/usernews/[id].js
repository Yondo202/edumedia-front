import React from "react";
import Root from "@/core/Root";
import PagesHome from "@/dynamic/Pageshomeuser";
import axios from "@/global/axiosbase"

const Blog = ({ data, user }) => {
    return (
        <Root >
            <PagesHome data={data} user={user} />
        </Root>
    );
};

export default Blog;

export async function getServerSideProps({params, req}){
    let data = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[user][id][$eq]=${params?.id}`)
    let cat = await axios.get(`/users/${params.id}`)
    return { props: { data: data?.data?.data, user: cat?.data } }
}