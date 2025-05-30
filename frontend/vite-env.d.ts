interface ImportMetaEnv {
    readonly VITE_MAPS_ID: string;
    readonly VITE_MAPS_API_KEY: string;
    readonly VITE_SERVER_URL: string;
    readonly VITE_APP_SITE_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
