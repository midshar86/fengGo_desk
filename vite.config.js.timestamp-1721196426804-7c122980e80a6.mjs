// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Vitam/Desktop/source/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/%E7%AC%AC%E5%9B%9B%E9%98%B6%E6%AE%B5/%E9%94%8B%E8%B4%AD%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F/fengGo_desk/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // 配置实现自动导入功能
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxWaXRhbVxcXFxEZXNrdG9wXFxcXHNvdXJjZVxcXFxcdTVCNjZcdTRFNjBcdTdCMTRcdThCQjBcXFxcXHU3QjJDXHU1NkRCXHU5NjM2XHU2QkI1XFxcXFx1OTUwQlx1OEQyRFx1NTQwRVx1NTNGMFx1N0JBMVx1NzQwNlx1N0NGQlx1N0VERlxcXFxmZW5nR29fZGVza1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVml0YW1cXFxcRGVza3RvcFxcXFxzb3VyY2VcXFxcXHU1QjY2XHU0RTYwXHU3QjE0XHU4QkIwXFxcXFx1N0IyQ1x1NTZEQlx1OTYzNlx1NkJCNVxcXFxcdTk1MEJcdThEMkRcdTU0MEVcdTUzRjBcdTdCQTFcdTc0MDZcdTdDRkJcdTdFREZcXFxcZmVuZ0dvX2Rlc2tcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1ZpdGFtL0Rlc2t0b3Avc291cmNlLyVFNSVBRCVBNiVFNCVCOSVBMCVFNyVBQyU5NCVFOCVBRSVCMC8lRTclQUMlQUMlRTUlOUIlOUIlRTklOTglQjYlRTYlQUUlQjUvJUU5JTk0JThCJUU4JUI0JUFEJUU1JTkwJThFJUU1JThGJUIwJUU3JUFFJUExJUU3JTkwJTg2JUU3JUIzJUJCJUU3JUJCJTlGL2ZlbmdHb19kZXNrL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICAvLyBcdTkxNERcdTdGNkVcdTVCOUVcdTczQjBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTUyOUZcdTgwRkRcbiAgICBBdXRvSW1wb3J0KHsgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSB9KSxcbiAgICBDb21wb25lbnRzKHsgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3ZixTQUFTLGVBQWUsV0FBVztBQUUzaEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBTjZNLElBQU0sMkNBQTJDO0FBU2xTLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQTtBQUFBLElBRUosV0FBVyxFQUFFLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7QUFBQSxJQUNqRCxXQUFXLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ25EO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
