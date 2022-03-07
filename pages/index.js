import React from 'react'
import Axios from "axios"
import Root from "@/core/Root"
import {MenuContext} from '@/global/ContextMenuProvider'
import Hometop from '@/dynamic/Hometop'
import ResolveComponent from "@/dynamic/ResolveComponent"
import Homecontents from '@/dynamic/Homecontents'
// import Slickcards from '@/dynamic/Slickcards'
// import Categorycards from '@/dynamic/Categorycards'
// import Menucards from '@/dynamic/Menucards'


const Index = ({ data }) => {
  let { Layout } = data
  const {completelyLoaded} = React.useContext(MenuContext);
  return (
      <Root>
          <Hometop /> 
          <Homecontents />
          {/* <Slickcards /> */}
          {completelyLoaded && <ResolveComponent data={Layout}/>}
          
          {/* <Menucards /> */}
          {/* <Categorycards /> */}

      </Root>
  )
}

export default Index


export async function getServerSideProps({ params, req }) {
  const res = await Axios(process.env.serverUrl + '/api/home?populate=deep,4')
  return { props: { data: res.data?.data?.attributes } }
}