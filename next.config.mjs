/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  prisma: {
    schema: 'prisma/schema.prisma',
    generate: {
      output: 'prisma/generated',
    },
  },
}

export default nextConfig
