import axios from '@/global/axiosbase';
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
// import { parseCookies } from "nookies"
import { BsImageFill } from "react-icons/bs"
import { FaUserTie } from "react-icons/fa"

let CKEditor;
let ClassicEditor;

// config={{ plugins: [ImageResize] }}


const configuration = {
    toolbar: [
        'heading',
        '|',
        'fontColor',
        'fontSize',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
    ],
};
 

const CkEditor = ({ data, setData }) => {
    const [ loading, setLoading ] = useState(true);
    const [ active, setActive ] = useState(false);
    // const [ data, setData ] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') {
            setLoading(true);
        }else{
            CKEditor = require( '@ckeditor/ckeditor5-react' ).CKEditor;
            ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
            // ImageResize = require("@ckeditor/ckeditor5-image/src/imageresize");
            setLoading(false);
        }
    }, [loading]);

    const UploadHandle = (e) =>{
        if(e.target.files.length!==0){
            let file = e.target.files[0];
            const data = new FormData();
            data.append("files", file );
            axios.post(`/upload`, data ).then(res=>{
                if(res.data.length){
                    const imgTag = `<img src="${process.env.serverUrl+res.data[0].url}" alt="edumendia"></img>`;
                    // setData(prev=>`${prev} ${imgTag}`);
                    setData('body', imgTag);
                }
            })
        }
    }

    return (
        <Container className="CkEditor">
            <div className="userProfile">
               <div className="profileImg"><FaUserTie /></div> 
            </div>
            <div className={`activeCustom`}>
                {CKEditor?<CKEditor
                    editor={ ClassicEditor }
                    config={ { ...configuration} }
                    data={data}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setData('body' ,data);
                    }}
                    onBlur={ ( event, editor ) => {
                        setActive(false);
                    }}
                    onFocus={ ( event, editor ) => {
                        setActive(true);
                    }}
                   
                />:<div>Loading...</div>}
                <div style={active?{borderTop:`1px dashed #0071ce`}:{borderTop:`1px dashed #C0C0C0`}} className="InputSector">
                    <label className="label" htmlFor="file-upload" ><BsImageFill /> Зураг оруулах</label>
                    <input onChange={UploadHandle} type="file" id="file-upload" accept=".png, .jpg, .jpeg" />
                </div>
            </div>

            <div className="buttomPar">
                <div className="title">
                    {/* <InputStyle  style={{marginBottom:`0px`}}>
                        <input className={titleRed?`red`:``} autoFocus={titleRed?true:false} value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Гарчиг" />
                    </InputStyle> */}
                </div>
                {/* <button className={data===''?`Disable`:``} disabled={data===''?true:false} onClick={SendHandle}>Сэтгэгдэл үлдээх</button> */}
            </div>
        </Container>
       
    )
}

export default CkEditor

// #f6f8fa

const Container = styled.div`
    position: relative;
    .userProfile{
        position: absolute;
        left: 0;
        top: 0;
        .profileImg{
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #d6e2ef;
            svg{
                color: #586069;
                font-size: 20px;
            }   
        }
        
    }
    .buttomPar{
        margin-left: 58px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            display: flex;
            align-items: end;
            justify-content: end;
            width: 50%;
        }
        button{
            transition: all 0.3s ease;
            cursor: pointer;
            color: #fff;
            padding: 8px 10px;
            border-style: none;
            outline: none;
            border-radius: 4px;
            background-color: ${props=>props.theme.mainColor2};
            &:hover{
                box-shadow: 1px 1px 15px -6px;
                background-color: #03467d;
            }
        }
        .Disable{
            cursor: unset;
            opacity: 0.6;
        }
    }
    
    .activeCustom{
        margin-left: 58px;
        position: relative;
        
        &:before{
            content:"";
            position:absolute;
            top: 12px;
            left:-11px;
            background-color: #b3b3b3;
            width: 18px;
            height: 18px;
            clip-path: polygon(68% 0, 1% 50%, 68% 100%);
            z-index: 2;
        }
        .InputSector{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            /* background-color: #fafafa; */
            /* border-top: 1px dashed hsl(208, 79%, 51%, 1); */
            /* color: hsl(208, 79%, 51%, 1); */
            .label{
                cursor: pointer;
                width: 100%;
                padding: 8px 30px;
                color: #586069;
                svg{
                    margin-right: 6px;
                    font-size: 18px;
                }
            }
            input{
                display: none;
            }
        }

        .ck-editor{
            .ck-editor__main{
                .ck-editor__editable_inline{
                    padding-bottom: 30px;
                    min-height:20rem !important;
                }
            }
        }
    }
    .ck.ck-reset_all, .ck.ck-reset_all * {
        text-align: right;
    }
    .ck-icon{
        opacity: 0.75;
        font-size: .63em !important;
    }
    .ck-toolbar__grouped-dropdown{
        margin-top: 1px;
        margin-bottom: 1px;
    }
 
`
