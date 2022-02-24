import path from 'path'
import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import EnvironmentPlugin from "vite-plugin-environment"

export default defineConfig({
    plugins: [
        reactRefresh(),
        EnvironmentPlugin('all', {prefix: ''})
    ],
    resolve: {
        alias: {
            'components': path.resolve(__dirname, './src/app/components'),
            'pages': path.resolve(__dirname, './src/app/pages'),
            'state': path.resolve(__dirname, './src/state'),
            'assets': path.resolve(__dirname, './src/assets'),
            'lib': path.resolve(__dirname, './src/lib'),
            'styles': path.resolve(__dirname, './src/styles')
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                rootpath: 'http://localhost:3000/src/assets/',
            }
        }
    }
})

