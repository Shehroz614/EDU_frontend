// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  compiler: {
    emotion: {
      sourceMap: process.env.NEXT_PUBLIC_IS_DEV?.toString() === 'true',
      autoLabel: 'dev-only',
      labelFormat: '[local]',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'objectstorage.us-ashburn-1.oraclecloud.com',
        port: '',
      },
    ],
  },
  i18n,
  trailingSlash: true,
}
