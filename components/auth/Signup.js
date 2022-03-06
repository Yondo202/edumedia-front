import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import { setCookie } from "nookies";
import { TitleStyle } from "@/miscs/CustomStyle"
import styled from 'styled-components';
import Link from "next/link"
import {  MainButtonStyle } from "@/miscs/CustomStyle"
import { BsArrowRight } from "react-icons/bs"
// import { IoMdAdd } from "react-icons/io"
import { useForm } from "react-hook-form"
import { EyeInvisibleOutlined, EyeTwoTone, UnlockOutlined } from '@ant-design/icons';
import { Select, Input, Tooltip } from 'antd';
import axios from "@/global/axiosbase"
import AlertMessage from '@/miscs/AlertMessage';
const { Option } = Select
// import CkEditor from "@/miscs/CKeditor"
import NProgress from 'nprogress';


// const initial =

const Signup = () => {
    const { push } = useRouter()
    const [ category, setcategory ] = useState([])

    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue, watch, setError } = useForm({
        defaultValues: {
            username: null,
            email: null,
            categories:[],
            password:null,
            password_again: null,
        }
    });
    // /api/users/:id   

    useEffect(()=>{
        void async function fetch(){
            try{
                let less =  await axios.get(`/categories`)
                setcategory(less?.data?.data)
            }catch(err){
                console.log(`err`, err)
            }
        }()
    },[])

    const state = watch()


    const onSubmit =_=> {
        if(state.password_again !== state.password){
            setError('password_again', { message: "Нууц үг адил биш байна", })
        }else if (state.password.length < 8){
            setError('password', { message: "Нууц үг 8 аас дээш оронтой байх ёстой!", })
        }else{
            NProgress.start()
            SignFirst(state)
        }
    };


    const SignFirst = async (data) => {
        try{
            let res = await axios.post(`/auth/local/register`, data )

            setCookie( null, 'user_id', res.data.user?.id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            setCookie( null, 'jwt', res.data.jwt, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            setCookie( null, 'email', res.data.user?.email, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            setCookie( null, 'username', res.data.user?.username, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })

            // setProfileId(res.data.user?.id)
            
            AlertMessage(`Амжилттай бүртгэгдлээ`, 'success');
            push('/')
            window.scrollTo(0, 0);

        }catch(err){
            if ( err?.response?.data?.error?.message === "Email is already taken" ){
                setError('email', { message: "Email хаяг давхцаж байна", })
                AlertMessage(`Бүртгэгдсэн Email хаяг байна`, 'warning')
                return
            }else if( err?.response?.data?.error?.message.includes('email') ){
                AlertMessage(`Хүсэлт амжилтгүй`, 'warning')
                setError('email', { message: "Алдаатай байна", })
                return
            }else if( err?.response?.data?.error?.message.includes('An error occurred during account creation') ){
                AlertMessage(`Нэвтрэх нэр давхцаж байна`, 'warning')
                setError('username', { message: "давхцаж байна", })
                return
            }
            
            
            AlertMessage(`Хүсэлт амжилтгүй`, 'warning')
        }finally{
            NProgress.done()
        }
    }

    const onChangeHandle = (name, value ) =>{
        setValue(name,name=== 'phone'? parseInt(value) : value)
        clearErrors()
    }


  return(
    <>
    <Container className="container">
       
        <div className="bodys">
            <div className="main_content" >
                <TitleStyle > <span className="text">Бүртгүүлэх</span>  <Link href="/auth/login"><a className="addition">Нэвтрэх</a></Link> </TitleStyle>

                <div className="slice_par">

                    <form onSubmit={handleSubmit(onSubmit)} className="inputs_body">
                        <div className="input_par">
                            <div className="label">Нэр <span className="required">*</span></div>
                            <Input
                                { ...register('username', { required: 'Нэр ээ оруулна уу' }) }
                                className={errors.username?.message?`err_style`:``}
                                value={state.username}
                                size="large"
                                onChange={el => onChangeHandle(el.target.name, el.target.value)}
                            />
                            {errors.username?.message&&<span className="err_text">{errors.username?.message}</span>}
                        </div>

                        <div className="input_par">
                            <div className="label">Email - хаяг <span className="required">*</span></div>
                            <Tooltip
                                trigger={['focus']}
                                title={'Цаашид email - ээр нэвтрэнэ'}
                                placement="topRight"
                                // overlayClassName="numeric-input"
                            >
                                <Input
                                    { ...register('email', { required: 'Email ээ оруулна уу' }) }
                                    className={errors.email?.message?`err_style`:``}
                                    value={state.email}
                                    size="large"
                                    onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                />
                            </Tooltip>
                            {errors.email?.message&&<span className="err_text">{errors.email?.message}</span>}
                        </div>
                    
                        <div className="input_par">
                            <div className="label">Нийтлэл оруулах чиглэл <span className="required">*</span></div>
                            <Select
                                { ...register('categories', { required: '1 буюу түүнээс дээш оруулах чиглэл сонгоно уу' }) }
                                className={errors.categories?.message?`err_style`:``}
                                value={state?.category}
                                showSearch
                                size="large"
                                mode="multiple"
                                placeholder="- Сонго -"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={(value, option) => { onChangeHandle( 'categories', value, 'many' ) }}
                            >
                                {category?.map((el,ind)=>{
                                    return(
                                        <Option value={el.id} name="categories" key={ind}>
                                            {el.attributes.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                            {errors.categories?.message&&<span className="err_text">{errors.categories?.message}</span>}
                        </div>

                        <div className="input_par">
                            <div className="label">Нууц үг <span className="required">*</span></div>
                            <Input.Password 
                                {...register("password", { required: 'Нууц үгээ оруулна уу' })}
                                onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                className={errors.password ? `err_style` : ``}
                                size="large"
                                prefix={<UnlockOutlined />} 
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            {errors.password?.message&&<span className="err_text">{errors.password?.message}</span>}
                        </div>

                        <div className="input_par">
                            <div className="label">Нууц үг давтах <span className="required">*</span></div>
                            <Input.Password 
                                {...register("password_again", { required: 'Нууц үг ээ давтаж оруулна уу' })}
                                onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                className={errors.password_again ? `err_style` : ``}
                                size="large"
                                prefix={<UnlockOutlined />} 
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                            {errors.password_again?.message&&<span className="err_text">{errors.password_again?.message}</span>}
                        </div>

                      
                        <MainButtonStyle className="custom">Бүртгүүлэх <BsArrowRight /></MainButtonStyle>
                    </form>

                </div>
            </div>
        </div>
    </Container>

    </>
  )
};

export default Signup;


const Container = styled.div`
    padding-top:40px;
    padding-bottom:100px;
    .bodys{
        width:100%;
        display:flex;
        justify-content:center;
        .main_content{
            max-width: 400px;
            width: 100%;
            @media (max-width:768px){
                max-width: 100%;
                width: 100%;
            }
            
            .slice_par{
                display:grid;
                grid-auto-flow:column;
                grid-auto-columns:100%;
                overflow:hidden;
                // overscroll-behavior-inline:contain;
                ::-webkit-scrollbar {
                    display:none;
                }
                .inputs_body{
                    transition:all 0.3s ease;
                    width:100%;
                    height:100%;
                    .gmail_botton{
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        border: 1px solid rgba(0,0,0,0.1);
                        padding: 16px 20px;
                        font-weight:${props=>props.theme.weight};
                        cursor:pointer;
                        transition:all 0.2s ease;
                        img{
                            width:50px;
                        }
                        &:hover{
                            border: 1px solid #c4c6ca;
                        }
                    }
                    .final_buttons{
                        display:flex;
                        gap:50px;
                        button{
                            padding: 8px 0px;
                            margin: 18px 0px;
                        }
                    }
                }
                
            }
            .custom_row{
                display:grid;
                grid-auto-flow:column;
                grid-auto-columns:50%;
            }
            .input_par{
                width:100%;
                margin-bottom:24px;
                position:relative;
                .my_inp{
                    font-weight:${props=>props.theme.weight};
                    border: 1px solid #d8d9dc;
                    border-radius: 0;
                    background: #fff;
                    font-size: 14px;
                    color: #455065;
                    padding: 20px;
                    transition: all .2s;
                    width: 100%;
                    outline: none;
                    -webkit-appearance: none;
                    margin-bottom:20px;
                    ::placeholder{
                        color:${props=>props.theme.textColor4};
                    }
                    &:focus{
                        border: 1px solid ${props=>props.theme.textColor3};
                    }
                }
                .err_text{
                    position:absolute;
                    top:105%;
                    right:0;
                    font-size:11px;
                    color:red;
                    font-weight:${props=>props.theme.weight};
                }
                .label{
                    color:${props=>props.theme.textColor};
                    font-size:13px;
                    font-weight:${props=>props.theme.weight};
                    margin-bottom:6px;
                    .required{
                        color:#eb2329;
                    }
                }
                .ant-input-password{
                    .ant-input-prefix{
                        svg{
                            color:rgba(0, 0, 0, 0.45);
                        }
                        margin-right: 10px;
                    }
                    .ant-input{
                        padding-bottom:0;
                    }
                }
                
                .ant-select{
                    font-size: ${props=>props.theme.fontSize};
                    color:${props=>props.theme.textColorBlack};
                    font-weight:${props=>props.theme.weight};
                    width:100%;
                    
                }
                .ant-input{
                    font-size: ${props=>props.theme.fontSize};
                    color:${props=>props.theme.textColorBlack};
                    font-weight:${props=>props.theme.weight};
                }
                .ant-input-lg{
                    padding-bottom: 8px;
                }
               
                .ant-input-number{
                    width:100%;
                    .ant-input-number-input-wrap{
                        input{
                            color:${props=>props.theme.textColorBlack};
                            font-weight:${props=>props.theme.weight};
                            font-size: ${props=>props.theme.fontSize};
                        }
                    }

                    .ant-input-number-handler-wrap{
                        display:none;
                    }
                }
                .err_style{
                    border:1px solid #dc3c1e !important;
                    color:#dc3c1e !important;
                }
            }
          
            // .title{
            //     font-size:30px;
            //     color:${props=>props.theme.textColor};
            //     font-weight:${props=>props.theme.weight};
            //     margin-bottom:30px;
            // }
            .custom{
                width:100%;
                padding:14px 0px;
                margin:18px 0px;
            }
        }
    }
    .header{
        display:flex;
        .logo_par{
            cursor:pointer;
            padding:10px 0px;
            img{
                width:60px;
                height:auto;
                object-fit:contain;
            }
        }
    }
   
    
`