module.exports = {
  localePath:
    typeof window === 'undefined'
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('path').resolve('./public/locales')
      : '/locales',
  i18n: {
    locales: ['en', 'ua'],
    defaultLocale: 'en',
  },
  reloadOnPrerender: true,
  debug: true,
}
