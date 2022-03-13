import React, { useState, useEffect } from 'react'
import axios from "@/global/axiosbase"
import { useRouter } from 'next/router'
import CKEditor from '@/miscs/CKeditor';
import AlertMessage from '@/miscs/AlertMessage';
import NProgress from 'nprogress';
import { BsLayoutTextWindow } from "react-icons/bs"
import { setCookie, parseCookies } from "nookies";
import { RiImageAddFill } from "react-icons/ri"
import { Select, Input, Upload } from 'antd';
import { TitleStyle, MainButtonStyle } from "@/miscs/CustomStyle";
import styled from 'styled-components'
import { useForm } from "react-hook-form"
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select


const ImageStyle = styled.div`
    svg{
        color:${props=>props.theme.textColor4};
        font-size:30px;
    }
    .custom_svg{
        margin-top:8px;
        font-size:12px;
        color:${props=>props.theme.textColor2};
    }
`

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      AlertMessage(`Зөвхөн зураг хавсаргах боломжтой`, 'warning')
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      AlertMessage(`2MB өндөр хэмжээтэй байна`, 'warning')
    }
    return isJpgOrPng && isLt2M;
}


const Initial = {
    title: null,
    categories:[],
    image:null,
    body:'',
    read_range:null,
    // position:null
}

const InsertBlog = () => {
    const { query, back } = useRouter()
    let newsId = query?.edit_id
    // edit_id
    const { jwt, user_id } = parseCookies();
    const [ imageLoad, setImageLoad ] = useState(false);
    
    // const [ imageLoad, setImageLoad ] = useState(false);
    const [ category, setcategory ] = useState([])

    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue, watch, setError } = useForm({
        defaultValues: Initial
    });

    useEffect(()=>{
        window.scrollTo(0, 170);
        void async function fetch(){
            try{
                let less =  await axios.get(`/categories`)
                setcategory(less?.data?.data)
            }catch(err){
                console.log(`err`, err)
            }
        }()
    },[])

    useEffect(()=>{
        if(newsId){
            void async function fetch(){
                try{
                    let data = await axios.get(`/posts/${newsId}/?populate=*`)
                    let mydata = data?.data?.data?.attributes
                    reset({...mydata, categories: mydata?.categories?.data.map(el=>el.id ), image:{ ...mydata?.image?.data?.attributes, id:mydata?.image?.data.id } })
                }catch(err){
                    console.log(`err`, err)
                }
            }()
        }
    },[newsId])

 

    const state = watch();



    const onChangeHandle = ( name, value ) =>{
        setValue(name, value)
        clearErrors()
    }

    const uploadButton = (
        <ImageStyle>
          {imageLoad ? <LoadingOutlined /> : <RiImageAddFill />}
          {/* <div className="custom_svg">Нүүр зураг</div> */}
        </ImageStyle>
    );


    const uploadHandle = (file, name) =>{
        setImageLoad(true)
        const image = new FormData();
        image.append("files", file.file.originFileObj);
        axios.post(`/upload`, image).then(res=>{
            setValue(name, res?.data[0])
            setImageLoad(false)
        }).catch(err=>{
            setImageLoad(false)
        })

        clearErrors()
    }

    
    const onSubmit =_=> {
        if(!state.image?.url){
            AlertMessage(`Нийтлэлийн зурагаа хавсрагана уу`, 'warning')
            setError('image', { message: "Зурагаа хавсрагана уу", })
        }else if (state.body === ''){
            AlertMessage(`Үндсэн нийтлэлээ оруулна уу`, 'warning')
            setError('body', { message: "Үндсэн нийтлэлээ оруулна уу", })
        }else{
            SignFirst()
        }
    };

    const SignFirst = async () => {
        NProgress.start()
        try{
            if(newsId){
                await axios.put(`/posts/${newsId}`, { data: {...state, user: parseInt(user_id) } }, { headers: { Authorization: `bearer ${jwt}` }})
                AlertMessage(`Амжилттай засварлалаа`, 'success')
                back()
            }else{
                await axios.post(`/posts`, { data: {...state, user: parseInt(user_id) } }, { headers: { Authorization: `bearer ${jwt}` }})
                AlertMessage(`Амжилттай хадаглалаа`, 'success')
                window.scrollTo(0, 0);
            }

            
            // reset(Initial)
        }catch(err){
            AlertMessage(`Хүсэлт амжилтгүй`, 'warning')
        }finally{
            NProgress.done()
        }
    }

    console.log('state', state)

    return (
        <Container className="container">
            <div className="content_parent">
                <TitleStyle className="custom"> <span className="text">Шинээр мэдээлэл оруулах</span> </TitleStyle>
                <form onSubmit={handleSubmit(onSubmit)} className="inputs_body">
                    <div className="row">
                        <div className="col-md-3 col-12">

                            <div className="input_par">
                                <div className="label">Гарчиг <span className="required">*</span></div>
                                <Input
                                    { ...register('title', { required: 'Нэр ээ оруулна уу' }) }
                                    className={errors.title?.message?`err_style`:``}
                                    value={state.title}
                                    size="large"
                                    onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                />
                                {errors.title?.message&&<span className="err_text">{errors.title?.message}</span>}
                            </div>

                            <div className="input_par">
                                <div className="label">Аль ангилалд багтах эсэх <span className="required">*</span></div>
                                
                                <Select
                                    { ...register('categories', { required: '1 буюу түүнээс дээш ангилал сонгоно уу' }) }
                                    className={errors.categories?.message?`err_style`:``}
                                    value={state?.categories}
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
                                <div className="label">Нийтлэлийн унших хугацаа <span className="required">*</span></div>
                                <Select
                                    { ...register('read_range') }
                                    className={errors.read_range?.message?`err_style`:``}
                                    value={state?.read_range}
                                    showSearch
                                    size="large"
                                    // mode="multiple"
                                    placeholder="- Сонго -"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value, option) => { onChangeHandle( 'read_range', value, 'many' ) }}
                                >
                                    {menutes?.map((el,ind)=>{
                                        return(
                                            <Option value={el} name="read_range" key={ind}> {el} минут </Option>
                                        )
                                    })}
                                </Select>
                                {errors.read_range?.message&&<span className="err_text">{errors.read_range?.message}</span>}
                            </div>



                            <div className="input_par">
                                <div className="label">Үндсэн зураг оруулах <span className="required">*</span></div>
                                <Upload
                                    multiple={false}
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={e => uploadHandle(e, 'image')}
                                >
                                    {state.image?.url ? <img src={ process.env.serverUrl + state.image?.url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>

                                {errors.image?.message&&<span className="err_text">{errors.image?.message}</span>}
                            </div>


                            {/* <div className="input_par">
                                <MainButtonStyle type='button' icon="left" color='false'><BsLayoutTextWindow /> Нийтлэлийн харагдах байрлалыг сонгох</MainButtonStyle>
                            </div> */}

                        </div>
                        
                        <div className="col-md-9 col-12">
                            <div className="input_par Custom">
                                <div className="label">Үндсэн нийтлэл оруулах <span className="required">*</span></div>
                                <CKEditor data={state.body} setData={onChangeHandle} />
                                {errors.body?.message&&<span className="err_text custom_err">{errors.body?.message}</span>}

                            </div>

                            <div className="final_botton">
                                <MainButtonStyle type='submit' > Хадгалах </MainButtonStyle>
                            </div>
                                
                        </div>
                    </div>

                    
                </form>
            </div>
        </Container>
    )
}

export default InsertBlog

const menutes = [
    1,2,3,4,5,6,7,8, 9, 10, 15, 20
]

const Container = styled.div`
    .content_parent{
        padding:25px 0px;
        padding-bottom:200px;
        .final_botton{
            text-align:right;
        }
        .inputs_body{
            .Custom{
                padding-left:30px;
                .custom_err{
                    top:97% !important;
                }
                @media (max-width:768px){
                    padding-left:0px;
                }
            }
            .input_par{
                width:100%;
                margin-bottom:28px;
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
                    top:100%;
                    right:0;
                    font-size:11px;
                    color:red;
                    font-weight:${props=>props.theme.weight};
                }
                .label{
                    color:${props=>props.theme.textColor};
                    font-size:13px;
                    font-weight:${props=>props.theme.weight};
                    margin-bottom:8px;
                    .required{
                        color:#eb2329;
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
        }   
        .custom{
            .text{
                text-transform: none;
            }
        }
    }
`
