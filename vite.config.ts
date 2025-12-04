import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 1. 修正 Vercel 部署後空白頁面的問題
    //    使用相對路徑 (./) 確保資源在任何路徑下都能正確載入
    base: './', 

    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    plugins: [react()],
    
    // 2. 移除 define 區塊，改用 Vite 原生方式引用環境變數
    //    在程式碼中，請使用 'import.meta.env.VITE_GEMINI_API_KEY'
    //    不需要額外的 define 設定來處理 process.env

    // 3. 修正 loadEnv 函數的第二個參數，以確保正確載入 .env 檔案
    //    使用 process.cwd() 取得專案根目錄，這在各種環境下更穩定。

    // 4. 修正 resolve.alias 的設定
    //    這確保 '@' 別名能正確指向專案根目錄
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 假設您的原始碼在 src 資料夾下
      }
    }
  };
});
