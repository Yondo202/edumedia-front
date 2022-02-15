import React from 'react'
import Root from "@/core/Root"
import Hometop from '@/dynamic/Hometop'
import Homecontents from '@/dynamic/Homecontents'
// import Categorycards from '@/dynamic/Categorycards'
// import Menucards from '@/dynamic/Menucards'


const Index = () => {
  return (
      <Root>
          <Hometop /> 
          <Homecontents />
          {/* <Menucards /> */}
          {/* <Categorycards /> */}

      </Root>
  )
}

export default Index


// export async function getServerSideProps({ params, req }) {
//   const res = await Axios(process.env.serverUrl + '/home')
//   return { props: { data: res.data } }
// }