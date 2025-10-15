import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-sidebar.js";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/168.jpg" }]],
  title: "我的牛包项目",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle:"目录",
    outline:[2,6],
    logo:"/168.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '家', items:[
        {text:'首页',link: '/'},
        {text: 'markdown示例', link: '/markdown-examples' }
    ] },
    {text: '示例', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples1',
        items: [
          { text: 'Markdown 演示1', link: '/markdown-examples' },
          { text: 'Runtime API 演示1', link: '/api-examples' }
        ]
      },
      {
        text: 'Examples2',
        items: [
          { text: 'Markdown 演示2', link: '/markdown-examples' },
          { text: 'Runtime API 演示2', link: '/api-examples' }
        ]
      }
    ],
    sidebar: { "/front-end/html": set_sidebar("front-end/html") },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Elestadt' }
    ],
    footer:{
      copyright:"Copyright@ 2025 Lcx",
    },
    
       // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
