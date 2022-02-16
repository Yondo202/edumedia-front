
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function CkEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  console.log(`uploadImage`, uploadImage)

  const uploadImage = (e, content) =>{
    console.log('------', e)
    console.log(`content`, content)
  }
  return (
    <>
      <Editor
        apiKey='pc8sfzbnapajt5vyup28otnlh0b7k9qqrid82r7knqqrd5bg'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
            'image', 'uploadimage'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help media image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        //   file_picker_callback: function(callback, value, meta) {
        //       console.log(`meta.filetype `, meta )
        //     // Provide file and text for the link dialog
        //     if (meta.filetype == 'file') {
        //       callback('mypage.html', {text: 'My text'});
        //     }
            
        //     // Provide image and alt text for the image dialog
        //     if (meta.filetype == 'image') {
        //         console.log(`meta`, meta)
        //         callback('myimage.jpg', {alt: 'My alt text'});
        //     }

        //     // Provide alternative source and posted for the media dialog
        //     if (meta.filetype == 'media') {
        //       callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
        //     }
        //   }

          images_upload_handler: async function(blobInfo, success, failure ) {
			let imageFile = new FormData();
			imageFile.append("files[]", blobInfo.blob());
            console.log("object")

			try {
                console.log(`imageFile`, imageFile)
                // const {data} = await axios.post("http://urlToHandleFileUpload", imageFile)
				// success(data.fileURL);
			} catch (error) {
				handleResponseError(error);
				return;
			}
		}
        }}
        onEditorChange={content => uploadImage( content)}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
export default CkEditor


// import React, { useEffect, useRef } from "react";
// import styled from "styled-components"

// const configuration = {
//     toolbar: [
//       'heading',
//       '|',
//     //   'fontColor',
//     //   'fontBackgroundColor',
//     //   'fontSize',
//     //   '|',
//     //   'fontColor', 'fontsize', '|',
//       'bold',
//       'italic',
//       'link',
//       'bulletedList',
//       'numberedList',
//       // 'ckfinder',
//       '|',
//       'blockQuote',
//       "uploadImage",
//       'AutoImage',
//       'insertTable',
//       'mediaEmbed',
//       'undo',
//       'redo',
//       '|',
    
//     ],
// };


// function Editor({setValue, data}) {
//    const [ loading, setLoading ] = React.useState(false);
//   const editorRef = React.useRef();
//   const { CKEditor, ClassicEditor } = editorRef.current || {};

//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
//       ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
//     };
//     setLoading(true)
//   }, []);

//   return (
//       <Container className="CkEditor">
//          <div className="activeCustom">
//             {loading ? (
//             <CKEditor
//                type=""
//                editor={ClassicEditor}
//                // config = { editorConfig }
//                config={configuration}
//                data={data}
//                onChange={(event, editor) => {
//                   const data = editor.getData();
//                   // console.log({ event, editor, data })
//                   setValue(data)
//                   // onChange(data);
//                }}
//             />
//             ) : (
//             <div>Editor loading</div>
//             )}
//       </div>
//       </Container>
//   );
// }

// export default Editor;


// const Container = styled.div`
//     position: relative;
//     .activeCustom{
//         position: relative;
//         .ck-editor{
//             .ck-editor__main{
//                 .ck-editor__editable_inline{
//                     padding-bottom: 30px;
//                     min-height:16rem !important;
//                     // border:none;
                    
//                 }
               
//                 .ck-content{
//                     p{
//                         margin-bottom:7px !important; 
//                     }
//                 }
//             }
//         }
//     }
//     .ck.ck-reset_all, .ck.ck-reset_all * {
//         text-align: right;
//     }
//     .ck-icon{
//         opacity: 0.7;
//         font-size: .6333350694em !important;
//     }
//     .ck-toolbar__grouped-dropdown{
//         margin-top: 1px;
//         margin-bottom: 1px;
//     }
// `





// // import React from "react"
// // import styled from "styled-components"

// // let CKEditors;
// // let ClassicEditor;

// // const CkEditor = ({setValue, data}) => {
// //     const [ loading, setLoading ] = React.useState(true);
// //     // const [ data, setData ] = React.useState('');

// //     React.useEffect(() => {
// //         if (typeof window === 'undefined') {
// //             setLoading(true);
// //         }else{
// //             CKEditors = require( '@ckeditor/ckeditor5-react' ).CKEditor;
// //             ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
// //             setLoading(false);
// //         }
// //     }, [loading]);


// //     // const UploadHandle = (e) =>{
// //     //     if(e.target.files.length!==0){
// //     //         let file = e.target.files[0];completelyLoaded
// //     //         const data = new FormData();
// //     //         data.append("files", file );
// //     //         axios.post(`${process.env.serverUrl}/upload`, data, { headers: {
// //     //             Authorization: `Bearer ${parseCookies().jwt}`
// //     //           } } ).then(res=>{
// //     //             if(res.data.length){
// //     //                 const imgTag = `<img src="${process.env.serverUrl+res.data[0].url}" alt="infosystem"></img>`;
// //     //                 setData(prev=>`${prev} ${imgTag}`);
// //     //             }
// //     //         })
// //     //     }
// //     // }

// //     return (
// //         <Container className="CkEditor">
// //             <div className={`activeCustom`}>
// //                 {CKEditors?<CKEditors
// //                     height={100}
// //                     editor={ ClassicEditor }
// //                     config={ configuration }
// //                     data={data}
// //                     onChange={ ( event, editor ) => {
// //                         const data = editor.getData();
// //                         setValue( 'short_presentation', data);
// //                     }}
// //                     // onBlur={ ( event, editor ) => {
// //                     //     setActive(false);
// //                     // }}
// //                     // onFocus={ ( event, editor ) => {
// //                     //     setActive(true);
// //                     // }}
                   
// //                 />:<div>Loading...</div>}
// //                 {/* <div style={active?{borderTop:`1px dashed #0071ce`}:{borderTop:`1px dashed #C0C0C0`}} className="InputSector">
// //                     <label className="label" htmlFor="file-upload" ><BsImageFill /> Зураг оруулах</label>
// //                     <input onChange={UploadHandle} type="file" id="file-upload" accept=".png, .jpg, .jpeg" />
// //                 </div> */}
// //             </div>
            
// //         </Container>
       
// //     )
// // }

// // export default CkEditor

// // // #f6f8fa




  