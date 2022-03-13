import React from 'react'
import { useRouter } from 'next/router';
import { Popconfirm } from 'antd';
import minimize from '@/miscs/minimize'
import axios from "@/global/axiosbase"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { TitleStyle } from "@/miscs/CustomStyle";
import { parseCookies } from "nookies";
import styled from 'styled-components'
import AlertMessage from '@/miscs/AlertMessage';

const Profile = () => {
    const { push } = useRouter()
    const [ cond, setCond ] = React.useState(false)
    const { username, user_id, email, jwt } = parseCookies();
    const [ news, setNews ] = React.useState([])

  React.useEffect(()=>{
    void async function Fetch(){
        let datas = await axios.get(`/posts?populate=*&sort[0]=createdAt:desc&filters[user][id][$eq]=${user_id}`)
        setNews(datas?.data?.data)
    }()
  },[cond])

  const DeleteConfirm = (el) =>{
    axios.delete(`/posts/${el.id}` , { headers: { Authorization: `bearer ${jwt}` }}).then(()=>{
        setCond(prev=>!prev)
        AlertMessage('Амжилттай устлаа','success')
    }).catch(()=>{
        AlertMessage('Хүсэлт амжилтгүй','warning')
    })
  }

  return (
    <Container className="container">
        <div className="row">
            <div className="col-md-2 col-12">
                <div className="profile_card">
                    <img src="/img/icon-user.svg" alt="userr" />
                    <div className="name">
                        {username}
                    </div>
                    <div className="email">
                        {email}
                    </div>
                </div>
            </div>
            <div className="col-md-9 col-12">
                <div className="news_list">
                    <TitleStyle><span className="text">Оруулсан нийтлэлүүд ({news?.length})</span></TitleStyle>

                    <div className="list_par">
                        {news.map((el,ind)=>{
                            return(
                                <div key={ind} className="list_items">
                                    <div className="infoSector">
                                        <div className="image">
                                            <img src={minimize(el.attributes.image?.data?.attributes, 'thumbnail')} alt="edumedia_img" />
                                        </div>
                                        <div className="text_par">
                                            <div className="title" onClick={_=>push(`${process.env.frontUrl}/${process.env.newsUrl}/${el.id}`)} >{el.attributes?.title}</div>   
                                            <div className="date">{el?.attributes?.createdAt?.slice(0,10)}</div>    
                                        </div>
                                    </div>

                                    <div className="handle_par">
                                        <Popconfirm
                                            title="Та оруулсан нийтлэлээ устгахдаа итгэлтэй байна уу?"
                                            onConfirm={_=>DeleteConfirm(el)}
                                            okText="Тийм (устгах)"
                                            cancelText="Үгүй"
                                        >
                                            <div className="handle"><RiDeleteBin6Line /> Устгах</div>
                                        </Popconfirm>
                                        
                                        <div onClick={_=>push(`/user/insertblog?edit_id=${el.id}`)} className="handle"><AiOutlineEdit /> Засах</div>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Profile

const Container = styled.div`
    margin-top:40px; 
    margin-bottom:100px; 
    .news_list{
        .list_par{
            .list_items{
                display:flex;
                align-items:center;
                justify-content:space-between;

                padding:15px;
                border-bottom:1px solid rgba(0,0,0,0.2);
                gap:18px;
                .handle_par{
                    .handle{
                        padding:5px 0px;
                        cursor:pointer;
                        color:${props=>props.theme.textColor};
                        svg{
                            margin-right:5px;
                            font-size:16px;
                        }
                        &:hover{
                            color:${props=>props.theme.mainColor};
                        }
                    }
                }
                &:last-child{
                    border-bottom:none;
                }
                .infoSector{
                    gap:18px;
                    display:flex;
                    align-items:center;
                    width:80%;
                    .text_par{
                        width:80%;
                        .title{
                            color:${props=>props.theme.textColor};
                            font-size:15px;
                            ${props=>props.theme.weight}
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            width:100%;
                            margin-bottom:3px;
                            cursor:pointer;
                        }
                        .date{
                            color:${props=>props.theme.textColor3};
                        }
                    }
                   
                    .image{
                        width:60px;
                        height:60px;
                        position:relative;
                        img{
                            transition:all 0.3s ease;
                            width:100%;
                            height:100%;
                            object-fit:cover;
                            border-radius:50%;
                            &:hover{
                                cursor: zoom-in;
                                position:absolute;
                                height:100%;
                                object-fit:contain;
                                left:0;
                                top:0;
                                z-index:99;
                                border-radius:6px;
                                transform:scale(2.5);
                            }
                        }
                    }
                }
                
            }
        }
    }
    .profile_card{
        border-radius:8px;
        padding:20px;
        box-shadow:1px 1px 16px -8px;
        display:flex;
        flex-direction:column;
        align-items:center;
        img{
            width:50%;
            margin-bottom:16px;
        }
        .name{
            margin-bottom:8px;
            font-size:20px;
            ${props=>props.theme.weight2}
        }
    }
   
`