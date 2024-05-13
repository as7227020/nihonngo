/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {//增加Line頭像 這樣才可以顯示 詳細可以去DB看image欄位的url 只要前半段即可 
              protocol: "https",
              hostname: "profile.line-scdn.net",
            },
        ],
      },
    reactStrictMode: false,
};

export default nextConfig;
