const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  const isSTaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";

  const env = {
    serverUrl: (() => {
      if (isDev) return "http://localhost:1380";
      if (isProd) return "https://edumedia.mn/api";
      if (isSTaging) return "https://edumedia.mn/api";
    })(),
    frontUrl: (() => {
      if (isDev) return "http://localhost:3080";
      if (isProd) return "https://edumedia.mn";
      if (isSTaging) return "https://edumedia.mn";
    })(),
    categoryUrl: (() => {
      return "p";
    })(),
    newsUrl: (() => {
      return "news";
    })(),
  };
  return {
    env,
  };
};

// module.exports = withCSS(
//   withImages({
//     webpack(config, options) {
//       config.module.rules.forEach(function (rule, index, array) {
//         const test = rule.test && rule.test.toString() || ''
//         if (test.includes('css')) {
//           array[index] = {
//             ...rule,
//             exclude: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
//           }
//         } else if (test.includes('svg')) {
//           array[index] = {
//             ...rule,
//             exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/
//           }
//         }
//       })

//       config.module.rules.push({
//         test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
//         use: [
//           {
//             loader: 'style-loader',
//             options: {
//               injectType: 'singletonStyleTag'
//             }
//           },
//           {
//             loader: 'postcss-loader',
//             options: styles?.getPostCssConfig({
//               themeImporter: {
//                 themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
//               },
//               minify: true
//             })
//           }
//         ]
//       })

//       config.module.rules.push({
//         test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
//         use: ['raw-loader']
//       })

//       return config
//     }
//   })
// )

// module.exports = {
//     images: {
//         deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//         domains: ['demo.afthemes.com'],
//     },
// }
