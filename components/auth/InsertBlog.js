import React from 'react'
import { TitleStyle } from "@/miscs/CustomStyle";
import styled from 'styled-components'
import { useForm } from "react-hook-form"

const InsertBlog = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue, watch, setError } = useForm({
        defaultValues: {
            username: null,
            email: null,
            categories:[],
            password:null,
            password_again: null,
        }
    });

    const state = watch()


    return (
        <Container className="container">
            <div className="content_parent">
                <TitleStyle className="custom"> <span className="text">Шинээр мэдээлэл оруулах</span> </TitleStyle>

                <div className="row">
                    <div className="col-md-4">
                        <h1>hahahahha</h1>
                    </div>
                    <div className="col-md-8">
                        <h1>hahahahha</h1>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default InsertBlog

const Container = styled.div`
    .content_parent{
        padding:25px 0px;
        padding-bottom:200px;
        .custom{
            .text{
                text-transform: none;
            }
        }
    }
`
