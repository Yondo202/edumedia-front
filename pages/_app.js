import Router from 'next/router';
import { ThemeProvider } from "styled-components";
import '../public/css/nprogress.css'
import '../public/css/global.css'
import * as theme from "@/miscs/theme";
import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import mnMN from 'antd/lib/locale/mn_MN';
import 'moment/locale/mn';
import { MenuProvider } from "@/global/ContextMenuProvider";
import { parseCookies } from "nookies";
import NProgress from 'nprogress';
import axios from '@/global/axiosbase';
import qs from 'qs'
// import '../public/css/style.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp
//Binding events. 

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, router  }) =>{
  const [ state, setState ] = useState({
    completelyLoaded:false,
    config: {},
    general: {}
  })
  const [ completelyLoaded, setCompletelyLoaded ] = useState(false);

  useEffect(()=>{
    Fetch()
  },[])

  const Fetch = async () =>{
    const config = { width: window.innerWidth, height: window.innerHeight };
    try{
      const query = qs.stringify({
        populate:'*'
      },
      {
        encodeValuesOnly: true,
      }
    );

      let res = await axios.get(`/setting?${query}`)
      setState({ completelyLoaded:true, config:config, general:res?.data?.data?.attributes  })
    }catch{
      return {}
    }
    
  }

  
  return(
    <ConfigProvider locale={mnMN}>
      <ThemeProvider theme={theme}>
         <MenuProvider value={state}>
          <Component {...pageProps} key={router.route} />
        </MenuProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}

// function redirectUser(ctx, location){
//   if(ctx.req){
//       ctx.res.writeHead(302, { Location: location });
//       ctx.res.end();
//   }else{
//       Router.push(location);
//   }
// }

MyApp.getInitialProps = async({ Component, ctx }) =>{
  let pageProps = {}

  // const jwt = parseCookies(ctx).jwt;

  // console.log('jwt', jwt);
  // const role = parseCookies(ctx).role;


  // if(!jwt){
  //   if( ctx.pathname.includes("/auth") ){
  //       redirectUser(ctx, "/login");
  //   }
  // }
  
  if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx);
  }

  return{
      pageProps
  }
}

export default MyApp;