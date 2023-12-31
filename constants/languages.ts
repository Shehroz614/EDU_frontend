const languages: {
  [_key: string]: {
    code: string
    name: string
    nativeName: string
  }
} = {
  ab: {
    code: 'ab',
    name: 'Abkhaz',
    nativeName: 'аҧсуа',
  },
  aa: {
    code: 'aa',
    name: 'Afar',
    nativeName: 'Afaraf',
  },
  af: {
    code: 'af',
    name: 'Afrikaans',
    nativeName: 'Afrikaans',
  },
  ak: {
    code: 'ak',
    name: 'Akan',
    nativeName: 'Akan',
  },
  sq: {
    code: 'sq',
    name: 'Albanian',
    nativeName: 'Shqip',
  },
  am: {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
  },
  an: {
    code: 'an',
    name: 'Aragonese',
    nativeName: 'Aragonés',
  },
  hy: {
    code: 'hy',
    name: 'Armenian',
    nativeName: 'Հայերեն',
  },
  as: {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
  },
  av: {
    code: 'av',
    name: 'Avaric',
    nativeName: 'авар мацӀ, магӀарул мацӀ',
  },
  ae: {
    code: 'ae',
    name: 'Avestan',
    nativeName: 'avesta',
  },
  ay: {
    code: 'ay',
    name: 'Aymara',
    nativeName: 'aymar aru',
  },
  az: {
    code: 'az',
    name: 'Azerbaijani',
    nativeName: 'azərbaycan dili',
  },
  bm: {
    code: 'bm',
    name: 'Bambara',
    nativeName: 'bamanankan',
  },
  ba: {
    code: 'ba',
    name: 'Bashkir',
    nativeName: 'башҡорт теле',
  },
  eu: {
    code: 'eu',
    name: 'Basque',
    nativeName: 'euskara, euskera',
  },
  be: {
    code: 'be',
    name: 'Belarusian',
    nativeName: 'Беларуская',
  },
  bn: {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
  },
  bh: {
    code: 'bh',
    name: 'Bihari',
    nativeName: 'भोजपुरी',
  },
  bi: {
    code: 'bi',
    name: 'Bislama',
    nativeName: 'Bislama',
  },
  bs: {
    code: 'bs',
    name: 'Bosnian',
    nativeName: 'bosanski jezik',
  },
  br: {
    code: 'br',
    name: 'Breton',
    nativeName: 'brezhoneg',
  },
  bg: {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'български език',
  },
  my: {
    code: 'my',
    name: 'Burmese',
    nativeName: 'ဗမာစာ',
  },
  ca: {
    code: 'ca',
    name: 'Catalan; Valencian',
    nativeName: 'Català',
  },
  ch: {
    code: 'ch',
    name: 'Chamorro',
    nativeName: 'Chamoru',
  },
  ce: {
    code: 'ce',
    name: 'Chechen',
    nativeName: 'нохчийн мотт',
  },
  ny: {
    code: 'ny',
    name: 'Chichewa; Chewa; Nyanja',
    nativeName: 'chiCheŵa, chinyanja',
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文 (Zhōngwén), 汉语, 漢語',
  },
  cv: {
    code: 'cv',
    name: 'Chuvash',
    nativeName: 'чӑваш чӗлхи',
  },
  kw: {
    code: 'kw',
    name: 'Cornish',
    nativeName: 'Kernewek',
  },
  co: {
    code: 'co',
    name: 'Corsican',
    nativeName: 'corsu, lingua corsa',
  },
  cr: {
    code: 'cr',
    name: 'Cree',
    nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ',
  },
  hr: {
    code: 'hr',
    name: 'Croatian',
    nativeName: 'hrvatski',
  },
  cs: {
    code: 'cs',
    name: 'Czech',
    nativeName: 'česky, čeština',
  },
  da: {
    code: 'da',
    name: 'Danish',
    nativeName: 'dansk',
  },
  dv: {
    code: 'dv',
    name: 'Divehi; Dhivehi; Maldivian;',
    nativeName: 'ދިވެހި',
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands, Vlaams',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  eo: {
    code: 'eo',
    name: 'Esperanto',
    nativeName: 'Esperanto',
  },
  et: {
    code: 'et',
    name: 'Estonian',
    nativeName: 'eesti, eesti keel',
  },
  ee: {
    code: 'ee',
    name: 'Ewe',
    nativeName: 'Eʋegbe',
  },
  fo: {
    code: 'fo',
    name: 'Faroese',
    nativeName: 'føroyskt',
  },
  fj: {
    code: 'fj',
    name: 'Fijian',
    nativeName: 'vosa Vakaviti',
  },
  fi: {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'suomi, suomen kieli',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'français, langue française',
  },
  ff: {
    code: 'ff',
    name: 'Fula; Fulah; Pulaar; Pular',
    nativeName: 'Fulfulde, Pulaar, Pular',
  },
  gl: {
    code: 'gl',
    name: 'Galician',
    nativeName: 'Galego',
  },
  ka: {
    code: 'ka',
    name: 'Georgian',
    nativeName: 'ქართული',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
  el: {
    code: 'el',
    name: 'Greek, Modern',
    nativeName: 'Ελληνικά',
  },
  gn: {
    code: 'gn',
    name: 'Guaraní',
    nativeName: 'Avañeẽ',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
  },
  ht: {
    code: 'ht',
    name: 'Haitian; Haitian Creole',
    nativeName: 'Kreyòl ayisyen',
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa, هَوُسَ',
  },
  he: {
    code: 'he',
    name: 'Hebrew',
    nativeName: 'עברית',
  },
  iw: {
    code: 'iw',
    name: 'Hebrew',
    nativeName: 'עברית',
  },
  hz: {
    code: 'hz',
    name: 'Herero',
    nativeName: 'Otjiherero',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी, हिंदी',
  },
  ho: {
    code: 'ho',
    name: 'Hiri Motu',
    nativeName: 'Hiri Motu',
  },
  hu: {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
  },
  ia: {
    code: 'ia',
    name: 'Interlingua',
    nativeName: 'Interlingua',
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
  },
  ie: {
    code: 'ie',
    name: 'Interlingue',
    nativeName: 'Originally called Occidental; then Interlingue after WWII',
  },
  ga: {
    code: 'ga',
    name: 'Irish',
    nativeName: 'Gaeilge',
  },
  ig: {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
  },
  ik: {
    code: 'ik',
    name: 'Inupiaq',
    nativeName: 'Iñupiaq, Iñupiatun',
  },
  io: {
    code: 'io',
    name: 'Ido',
    nativeName: 'Ido',
  },
  is: {
    code: 'is',
    name: 'Icelandic',
    nativeName: 'Íslenska',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
  },
  iu: {
    code: 'iu',
    name: 'Inuktitut',
    nativeName: 'ᐃᓄᒃᑎᑐᑦ',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語 (にほんご／にっぽんご)',
  },
  jv: {
    code: 'jv',
    name: 'Javanese',
    nativeName: 'basa Jawa',
  },
  kl: {
    code: 'kl',
    name: 'Kalaallisut, Greenlandic',
    nativeName: 'kalaallisut, kalaallit oqaasii',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
  },
  kr: {
    code: 'kr',
    name: 'Kanuri',
    nativeName: 'Kanuri',
  },
  ks: {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'कश्मीरी, كشميري‎',
  },
  kk: {
    code: 'kk',
    name: 'Kazakh',
    nativeName: 'Қазақ тілі',
  },
  km: {
    code: 'km',
    name: 'Khmer',
    nativeName: 'ភាសាខ្មែរ',
  },
  ki: {
    code: 'ki',
    name: 'Kikuyu, Gikuyu',
    nativeName: 'Gĩkũyũ',
  },
  rw: {
    code: 'rw',
    name: 'Kinyarwanda',
    nativeName: 'Ikinyarwanda',
  },
  ky: {
    code: 'ky',
    name: 'Kirghiz, Kyrgyz',
    nativeName: 'кыргыз тили',
  },
  kv: {
    code: 'kv',
    name: 'Komi',
    nativeName: 'коми кыв',
  },
  kg: {
    code: 'kg',
    name: 'Kongo',
    nativeName: 'KiKongo',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어 (韓國語), 조선말 (朝鮮語)',
  },
  ku: {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'Kurdî, كوردی‎',
  },
  kj: {
    code: 'kj',
    name: 'Kwanyama, Kuanyama',
    nativeName: 'Kuanyama',
  },
  la: {
    code: 'la',
    name: 'Latin',
    nativeName: 'latine, lingua latina',
  },
  lb: {
    code: 'lb',
    name: 'Luxembourgish, Letzeburgesch',
    nativeName: 'Lëtzebuergesch',
  },
  lg: {
    code: 'lg',
    name: 'Luganda',
    nativeName: 'Luganda',
  },
  li: {
    code: 'li',
    name: 'Limburgish, Limburgan, Limburger',
    nativeName: 'Limburgs',
  },
  ln: {
    code: 'ln',
    name: 'Lingala',
    nativeName: 'Lingála',
  },
  lo: {
    code: 'lo',
    name: 'Lao',
    nativeName: 'ພາສາລາວ',
  },
  lt: {
    code: 'lt',
    name: 'Lithuanian',
    nativeName: 'lietuvių kalba',
  },
  lu: {
    code: 'lu',
    name: 'Luba-Katanga',
    nativeName: '',
  },
  lv: {
    code: 'lv',
    name: 'Latvian',
    nativeName: 'latviešu valoda',
  },
  gv: {
    code: 'gv',
    name: 'Manx',
    nativeName: 'Gaelg, Gailck',
  },
  mk: {
    code: 'mk',
    name: 'Macedonian',
    nativeName: 'македонски јазик',
  },
  mg: {
    code: 'mg',
    name: 'Malagasy',
    nativeName: 'Malagasy fiteny',
  },
  ms: {
    code: 'ms',
    name: 'Malay',
    nativeName: 'bahasa Melayu, بهاس ملايو‎',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
  },
  mt: {
    code: 'mt',
    name: 'Maltese',
    nativeName: 'Malti',
  },
  mi: {
    code: 'mi',
    name: 'Māori',
    nativeName: 'te reo Māori',
  },
  mr: {
    code: 'mr',
    name: 'Marathi (Marāṭhī)',
    nativeName: 'मराठी',
  },
  mh: {
    code: 'mh',
    name: 'Marshallese',
    nativeName: 'Kajin M̧ajeļ',
  },
  mn: {
    code: 'mn',
    name: 'Mongolian',
    nativeName: 'монгол',
  },
  na: {
    code: 'na',
    name: 'Nauru',
    nativeName: 'Ekakairũ Naoero',
  },
  nv: {
    code: 'nv',
    name: 'Navajo, Navaho',
    nativeName: 'Diné bizaad, Dinékʼehǰí',
  },
  nb: {
    code: 'nb',
    name: 'Norwegian Bokmål',
    nativeName: 'Norsk bokmål',
  },
  nd: {
    code: 'nd',
    name: 'North Ndebele',
    nativeName: 'isiNdebele',
  },
  ne: {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
  },
  ng: {
    code: 'ng',
    name: 'Ndonga',
    nativeName: 'Owambo',
  },
  nn: {
    code: 'nn',
    name: 'Norwegian Nynorsk',
    nativeName: 'Norsk nynorsk',
  },
  no: {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
  },
  ii: {
    code: 'ii',
    name: 'Nuosu',
    nativeName: 'ꆈꌠ꒿ Nuosuhxop',
  },
  nr: {
    code: 'nr',
    name: 'South Ndebele',
    nativeName: 'isiNdebele',
  },
  oc: {
    code: 'oc',
    name: 'Occitan',
    nativeName: 'Occitan',
  },
  oj: {
    code: 'oj',
    name: 'Ojibwe, Ojibwa',
    nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ',
  },
  cu: {
    code: 'cu',
    name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
    nativeName: 'ѩзыкъ словѣньскъ',
  },
  om: {
    code: 'om',
    name: 'Oromo',
    nativeName: 'Afaan Oromoo',
  },
  or: {
    code: 'or',
    name: 'Oriya',
    nativeName: 'ଓଡ଼ିଆ',
  },
  os: {
    code: 'os',
    name: 'Ossetian, Ossetic',
    nativeName: 'ирон æвзаг',
  },
  pa: {
    code: 'pa',
    name: 'Panjabi, Punjabi',
    nativeName: 'ਪੰਜਾਬੀ, پنجابی‎',
  },
  pi: {
    code: 'pi',
    name: 'Pāli',
    nativeName: 'पाऴि',
  },
  fa: {
    code: 'fa',
    name: 'Persian',
    nativeName: 'فارسی',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'polski',
  },
  ps: {
    code: 'ps',
    name: 'Pashto, Pushto',
    nativeName: 'پښتو',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
  },
  qu: {
    code: 'qu',
    name: 'Quechua',
    nativeName: 'Runa Simi, Kichwa',
  },
  rm: {
    code: 'rm',
    name: 'Romansh',
    nativeName: 'rumantsch grischun',
  },
  rn: {
    code: 'rn',
    name: 'Kirundi',
    nativeName: 'kiRundi',
  },
  ro: {
    code: 'ro',
    name: 'Romanian, Moldavian, Moldovan',
    nativeName: 'română',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'русский язык',
  },
  sa: {
    code: 'sa',
    name: 'Sanskrit (Saṁskṛta)',
    nativeName: 'संस्कृतम्',
  },
  sc: {
    code: 'sc',
    name: 'Sardinian',
    nativeName: 'sardu',
  },
  sd: {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'सिन्धी, سنڌي، سندھی‎',
  },
  se: {
    code: 'se',
    name: 'Northern Sami',
    nativeName: 'Davvisámegiella',
  },
  sm: {
    code: 'sm',
    name: 'Samoan',
    nativeName: 'gagana faa Samoa',
  },
  sg: {
    code: 'sg',
    name: 'Sango',
    nativeName: 'yângâ tî sängö',
  },
  sr: {
    code: 'sr',
    name: 'Serbian',
    nativeName: 'српски језик',
  },
  gd: {
    code: 'gd',
    name: 'Scottish Gaelic; Gaelic',
    nativeName: 'Gàidhlig',
  },
  sn: {
    code: 'sn',
    name: 'Shona',
    nativeName: 'chiShona',
  },
  si: {
    code: 'si',
    name: 'Sinhala, Sinhalese',
    nativeName: 'සිංහල',
  },
  sk: {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'slovenčina',
  },
  sl: {
    code: 'sl',
    name: 'Slovene',
    nativeName: 'slovenščina',
  },
  so: {
    code: 'so',
    name: 'Somali',
    nativeName: 'Soomaaliga, af Soomaali',
  },
  st: {
    code: 'st',
    name: 'Southern Sotho',
    nativeName: 'Sesotho',
  },
  es: {
    code: 'es',
    name: 'Spanish; Castilian',
    nativeName: 'español, castellano',
  },
  su: {
    code: 'su',
    name: 'Sundanese',
    nativeName: 'Basa Sunda',
  },
  sw: {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
  },
  ss: {
    code: 'ss',
    name: 'Swati',
    nativeName: 'SiSwati',
  },
  sv: {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'svenska',
  },
  ta: {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
  },
  tg: {
    code: 'tg',
    name: 'Tajik',
    nativeName: 'тоҷикӣ, toğikī, تاجیکی‎',
  },
  th: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
  },
  ti: {
    code: 'ti',
    name: 'Tigrinya',
    nativeName: 'ትግርኛ',
  },
  bo: {
    code: 'bo',
    name: 'Tibetan Standard, Tibetan, Central',
    nativeName: 'བོད་ཡིག',
  },
  tk: {
    code: 'tk',
    name: 'Turkmen',
    nativeName: 'Türkmen, Түркмен',
  },
  tl: {
    code: 'tl',
    name: 'Tagalog',
    nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔',
  },
  tn: {
    code: 'tn',
    name: 'Tswana',
    nativeName: 'Setswana',
  },
  to: {
    code: 'to',
    name: 'Tonga (Tonga Islands)',
    nativeName: 'faka Tonga',
  },
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
  },
  ts: {
    code: 'ts',
    name: 'Tsonga',
    nativeName: 'Xitsonga',
  },
  tt: {
    code: 'tt',
    name: 'Tatar',
    nativeName: 'татарча, tatarça, تاتارچا‎',
  },
  tw: {
    code: 'tw',
    name: 'Twi',
    nativeName: 'Twi',
  },
  ty: {
    code: 'ty',
    name: 'Tahitian',
    nativeName: 'Reo Tahiti',
  },
  ug: {
    code: 'ug',
    name: 'Uighur, Uyghur',
    nativeName: 'Uyƣurqə, ئۇيغۇرچە‎',
  },
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'українська',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
  },
  uz: {
    code: 'uz',
    name: 'Uzbek',
    nativeName: 'zbek, Ўзбек, أۇزبېك‎',
  },
  ve: {
    code: 've',
    name: 'Venda',
    nativeName: 'Tshivenḓa',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
  },
  vo: {
    code: 'vo',
    name: 'Volapük',
    nativeName: 'Volapük',
  },
  wa: {
    code: 'wa',
    name: 'Walloon',
    nativeName: 'Walon',
  },
  cy: {
    code: 'cy',
    name: 'Welsh',
    nativeName: 'Cymraeg',
  },
  wo: {
    code: 'wo',
    name: 'Wolof',
    nativeName: 'Wollof',
  },
  fy: {
    code: 'fy',
    name: 'Western Frisian',
    nativeName: 'Frysk',
  },
  xh: {
    code: 'xh',
    name: 'Xhosa',
    nativeName: 'isiXhosa',
  },
  yi: {
    code: 'yi',
    name: 'Yiddish',
    nativeName: 'ייִדיש',
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
  },
  za: {
    code: 'za',
    name: 'Zhuang, Chuang',
    nativeName: 'Saɯ cueŋƅ, Saw cuengh',
  },
}

export default languages
