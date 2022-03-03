// module.exports = {
//   reactStrictMode: true,
// }


const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");

module.exports = (phase) => {

    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    const isSTaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    
    const env = {
        // reactStrictMode: true,
        // cart:"cart_items",
        // user: "user_info",w
        serverUrl:(()=>{
            if(isDev) return 'http://localhost:1380'
            if(isProd) return 'https://4938-124-158-107-34.ngrok.io'
            if(isSTaging) return 'https://4938-124-158-107-34.ngrok.io'
        })(),
        frontUrl:(()=>{
            if(isDev) return 'http://localhost:3080'
            if(isProd) return 'https://edumedia.vercel.app'
            if(isSTaging) return 'https://edumedia.vercel.app'
        })(),
        categoryUrl:(()=>{
            return 'p'
        })(),
        newsUrl:(()=>{
            return 'news'
        })(),
       
    }
    return {
        env
    }
}


// module.exports = {
//     images: {
//         deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//         domains: ['demo.afthemes.com'],
//     },
// }