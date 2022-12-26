import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";

/* eslint-disable  import/no-default-export */

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
});

/* eslint-enable  import/no-default-export */