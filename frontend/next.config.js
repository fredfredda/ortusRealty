/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com'
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io'
            }
        ]
    }
  };

module.exports = nextConfig;

// images: {
//     remotePatterns: [
//         {
//             protocol: 'https',
//             hostname: 'ui-avatars.com'
//         },
//     ]