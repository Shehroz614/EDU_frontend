type SocialType =
  | 'aboutme'
  | 'angellist'
  | 'behance'
  | 'blogger'
  | 'coinbase'
  | 'crunchbase'
  | 'delicious'
  | 'digg'
  | 'dribbble'
  | 'facebook'
  | 'flickr'
  | 'foursquare'
  | 'ithub'
  | 'gravatar'
  | 'instagram'
  | 'keybase'
  | 'lastfm'
  | 'linkedin'
  | 'medium'
  | 'myspace'
  | 'ok'
  | 'pandora'
  | 'pinterest'
  | 'plancast'
  | 'quora'
  | 'reddit'
  | 'slideshare'
  | 'tumblr'
  | 'twitter'
  | 'vimeo'
  | 'vk'
  | 'wordpress'
  | 'yahoo'
  | 'yelp'
  | 'youtube'
  | 'telegram'

interface ParseResult {
  type: SocialType
  type_name: string
  username: string
  url: string
}

const internals = {
  // We sometimes use [A-Za-z_]{0,3} instead of www since there are localized urls like au.linkedin.com
  // The {0,3} will get flagged as unsafe but I have not found a better solution yet
  regexes: {
    aboutme: /https?:\/\/(www\.)?about\.me\/([^ "/\n]+)/i,
    angellist: /https?:\/\/(www\.)?angel\.co\/([^ "/\n]+)/i,
    behance: /https?:\/\/(www\.)?behance\.(com|net)\/([^ "/\n]+)/i,
    blogger: /https?:\/\/(www\.)?blogger\.com\/profile\/([^ "/\n]+)/i,
    coinbase: /https?:\/\/(www\.)?coinbase\.com\/([^ "/\n]+)/i,
    crunchbase:
      /https?:\/\/(www\.)?crunchbase\.com\/(person|company|organization)\/([^ "/\n]+)/i,
    delicious: /https?:\/\/(www\.)?delicious\.com\/([^ "/\n]+)/i,
    digg: /https?:\/\/(www\.)?digg\.com\/users\/([^ "/\n]+)/i,
    dribbble: /https?:\/\/(www\.)?dribbble\.com\/([^ "/\n]+)/i,
    facebook:
      /https?:\/\/([A-Za-z_]{0,3}\.|[A-Za-z_]{2}-[A-Za-z_]{2}\.)?(facebook|fb)\.com\/(groups\/)?([^ "/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    flickr:
      /https?:\/\/(www\.)?flickr\.com\/(people|photos|groups)\/([^ "/\n]+)/i,
    foursquare: /https?:\/\/(www\.)?foursquare\.com\/(user\/)?([^ "/\n]+)/i,
    ithub: /https?:\/\/(www\.)?ithub\.com\/([^ "/\n]+)/i,
    gravatar: /https?:\/\/([A-Za-z_]{0,3}\.)?gravatar\.com\/([^ "/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    instagram: /https?:\/\/(www\.)?instagram\.com\/([^ "/\n]+)/i,
    keybase: /https?:\/\/(www\.)?keybase\.io\/([^ "/\n]+)/i,
    lastfm: /https?:\/\/(www\.)?(last\.fm|lastfm\.com)\/user\/([^ "/\n]+)/i,
    linkedin:
      /https?:\/\/([A-Za-z_]{0,3}\.)?linkedin\.com\/(((sales\/)?(in|pub|people|company|companies|organization|edu|school|groups)\/)|(profile\/view\?id=[a-zA-Z]))([^ "/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    medium: /https?:\/\/(www\.)?medium\.com\/@?([^ "/\n]+)/i,
    myspace: /https?:\/\/(www\.)?myspace\.com\/([^ "/\n]+)/i,
    ok: /https?:\/\/(www\.)?ok\.ru\/(profile\/)?([^ "/\n]+)/i,
    pandora: /https?:\/\/(www\.)?pandora\.com\/people\/([^ "/\n]+)/i,
    pinterest:
      /https?:\/\/([A-Za-z_]{0,3}\.)?pinterest\.[a-zA-Z.]+\/([^ +/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    plancast: /https?:\/\/(www\.)?plancast\.com\/([^ "/\n]+)/i,
    quora: /https?:\/\/(www\.)?quora\.com\/(profile\/)?([^ "/\n]+)/i,
    reddit: /https?:\/\/(www\.)?reddit\.com\/user\/([^ "/\n]+)/i,
    slideshare: /https?:\/\/(www\.)?slideshare\.net\/([^ "/\n]+)/i,
    tumblr: /https?:\/\/(.+)\.tumblr\.com/i,
    twitter: /https?:\/\/((www|mobile)\.)?twitter\.com\/([^ "/\n]+)/i,
    vimeo: /https?:\/\/(www\.)?vimeo\.com\/([^ "/\n]+)/i,
    vk: /https?:\/\/(www\.)?vk\.com\/([^ "/\n]+)/i,
    wordpress: /https?:\/\/((?!subscribe).+)\.wordpress\.com/i,
    yahoo: /https?:\/\/((profile|me|local)\.)?yahoo\.com\/([^ "/\n]+)/i,
    yelp: /https?:\/\/([A-Za-z_]{0,3}\.)?yelp\.[a-zA-Z]{2,}\/biz\/([^ "/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    youtube:
      /https?:\/\/([A-Za-z_]{0,3}\.)?youtube\.com\/(user\/|channel\/|c\/)?([^ "/\n]+)/i, //eslint-disable-line unicorn/no-unsafe-regex
    telegram: /https?:\/\/(t\.me|telegram\.me)\/([^ "/\n]+)/i,
    snapchat: /https?:\/\/(www\.)?snapchat\.com\/add\/([^ "/\n]+)/i,
    tiktok: /https?:\/\/(www\.)?tiktok\.com\/@([^ "/\n]+)/i,
  },
  typeNameMap: new Map([
    ['aboutme', 'About.me'],
    ['angellist', 'AngelList'],
    ['blogger', 'Blogger'],
    ['coinbase', 'Coinbase'],
    ['crunchbase', 'CrunchBase'],
    ['delicious', 'Delicious'],
    ['dribbble', 'Dribbble'],
    ['facebook', 'Facebook'],
    ['flickr', 'Flickr'],
    ['foursquare', 'Foursquare'],
    ['ithub', 'GitHub'],
    ['gravatar', 'Gravatar'],
    ['instagram', 'Instagram'],
    ['keybase', 'Keybase'],
    ['lastfm', 'Last.FM'],
    ['linkedin', 'LinkedIn'],
    ['medium', 'Medium'],
    ['myspace', 'MySpace'],
    ['ok', 'Odnoklassniki'],
    ['pandora', 'Pandora'],
    ['pinterest', 'Pinterest'],
    ['plancast', 'Plancast'],
    ['quora', 'Quora'],
    ['reddit', 'Reddit'],
    ['slideshare', 'Slideshare'],
    ['tumblr', 'Tumblr'],
    ['twitter', 'Twitter'],
    ['vimeo', 'Vimeo'],
    ['vk', 'VK'],
    ['wordpress', 'Wordpress'],
    ['yahoo', 'Yahoo'],
    ['yelp', 'Yelp'],
    ['youtube', 'YouTube'],
    ['telegram', 'Telegram'],
    ['snapchat', 'Snapchat'],
    ['tiktok', 'TikTok'],
  ]),
}

export function parseSocialLink(inputLink: string): ParseResult | null {
  for (const [type, regex] of Object.entries(internals.regexes)) {
    const result = regex.exec(inputLink)
    if (result) {
      const username = result[result.length - 1]
      return {
        type: type as SocialType,
        username,
        url: result[0],
        type_name: internals.typeNameMap.get(type) || 'other',
      }
    }
  }

  return null
}
