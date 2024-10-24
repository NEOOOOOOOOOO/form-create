import {createVuePlugin} from 'vite-plugin-vue2'
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import banner from 'vite-plugin-banner'
import {author, license, name, version} from './package.json'

function getBanner(banner, pkg) {
  if (!banner || typeof banner === 'string') {
    return banner || '';
  }

  banner = {...pkg, ...(banner === true ? {} : banner)};

  const author =banner.author

  const license = banner.license || '';
  return (
      '/*!\n' +
      ' * FormCreate 低代码表单渲染器\n' +
      ` * ${banner.name} v${banner.version}\n` +
      ` * (c) ${author || ''}\n` +
      (license && ` * Released under the ${license} License.\n`) +
      ' */'
  );
}

const __banner__ = {
  author: `2018-${new Date().getFullYear()} ${author}\n * Github https://github.com/xaboy/form-create\n * Site https://form-create.com/`,
  license,
  name,
  version
}

/* @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: "src/index.js",
      name: "FcUpload",
      formats: ["es", "umd"], // 指定打包模式为 es
      fileName: (format) => {
        //向前兼容
        return `index${(format === 'umd' ? '' : ('.' + format))}.js`
      }, // es 模式打包文件名为 index.es.js
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    },
  },
  plugins: [createVuePlugin({
            jsx: true,
        }), cssInjectedByJsPlugin(), banner(getBanner(__banner__))],
});
