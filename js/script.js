const countries = {
  'am-ET': 'Amharic',
  'ar-SA': 'Arabic',
  'be-BY': 'Bielarus',
  'bem-ZM': 'Bemba',
  'bi-VU': 'Bislama',
  'bjs-BB': 'Bajan',
  'bn-IN': 'Bengali',
  'bo-CN': 'Tibetan',
  'br-FR': 'Breton',
  'bs-BA': 'Bosnian',
  'ca-ES': 'Catalan',
  'cop-EG': 'Coptic',
  'cs-CZ': 'Czech',
  'cy-GB': 'Welsh',
  'da-DK': 'Danish',
  'dz-BT': 'Dzongkha',
  'de-DE': 'German',
  'dv-MV': 'Maldivian',
  'el-GR': 'Greek',
  'en-GB': 'English',
  'es-ES': 'Spanish',
  'et-EE': 'Estonian',
  'eu-ES': 'Basque',
  'fa-IR': 'Persian',
  'fi-FI': 'Finnish',
  'fn-FNG': 'Fanagalo',
  'fo-FO': 'Faroese',
  'fr-FR': 'French',
  'gl-ES': 'Galician',
  'gu-IN': 'Gujarati',
  'ha-NE': 'Hausa',
  'he-IL': 'Hebrew',
  'hi-IN': 'Hindi',
  'hr-HR': 'Croatian',
  'hu-HU': 'Hungarian',
  'id-ID': 'Indonesian',
  'is-IS': 'Icelandic',
  'it-IT': 'Italian',
  'ja-JP': 'Japanese',
  'kk-KZ': 'Kazakh',
  'km-KM': 'Khmer',
  'kn-IN': 'Kannada',
  'ko-KR': 'Korean',
  'ku-TR': 'Kurdish',
  'ky-KG': 'Kyrgyz',
  'la-VA': 'Latin',
  'lo-LA': 'Lao',
  'lv-LV': 'Latvian',
  'men-SL': 'Mende',
  'mg-MG': 'Malagasy',
  'mi-NZ': 'Maori',
  'ms-MY': 'Malay',
  'mt-MT': 'Maltese',
  'my-MM': 'Burmese',
  'ne-NP': 'Nepali',
  'niu-NU': 'Niuean',
  'nl-NL': 'Dutch',
  'no-NO': 'Norwegian',
  'ny-MW': 'Nyanja',
  'ur-PK': 'Pakistani',
  'pau-PW': 'Palauan',
  'pa-IN': 'Panjabi',
  'ps-PK': 'Pashto',
  'pis-SB': 'Pijin',
  'pl-PL': 'Polish',
  'pt-PT': 'Portuguese',
  'rn-BI': 'Kirundi',
  'ro-RO': 'Romanian',
  'ru-RU': 'Russian',
  'sg-CF': 'Sango',
  'si-LK': 'Sinhala',
  'sk-SK': 'Slovak',
  'sm-WS': 'Samoan',
  'sn-ZW': 'Shona',
  'so-SO': 'Somali',
  'sq-AL': 'Albanian',
  'sr-RS': 'Serbian',
  'sv-SE': 'Swedish',
  'sw-SZ': 'Swahili',
  'ta-LK': 'Tamil',
  'te-IN': 'Telugu',
  'tet-TL': 'Tetum',
  'tg-TJ': 'Tajik',
  'th-TH': 'Thai',
  'ti-TI': 'Tigrinya',
  'tk-TM': 'Turkmen',
  'tl-PH': 'Tagalog',
  'tn-BW': 'Tswana',
  'to-TO': 'Tongan',
  'tr-TR': 'Turkish',
  'uk-UA': 'Ukrainian',
  'uz-UZ': 'Uzbek',
  'vi-VN': 'Vietnamese',
  'wo-SN': 'Wolof',
  'xh-ZA': 'Xhosa',
  'yi-YD': 'Yiddish',
  'zu-ZA': 'Zulu',
};

const fromTxt = document.querySelector('.from-text');
const toTxt = document.querySelector('.to-text');
const selectTag = [...document.querySelectorAll('select')];

const translateBtn = document.querySelector('button');
const exchangeBtn = document.querySelector('.exchange');
const copyIcon = document.querySelectorAll('.fa-copy');
const speechIcon = document.querySelectorAll('.fa-volume-up');

selectTag.forEach((tag, id) => {
  for (countryCode in countries) {
    let selected;
    if (id === 0 && countryCode === 'en-GB') {
      selected = 'selected';
    } else if (id === 1 && countryCode === 'pt-PT') {
      selected = 'selected';
    }

    const option = `<option ${selected} value="${countryCode}">${countries[countryCode]}</option>`;

    tag.insertAdjacentHTML('beforeend', option);
  }
});

translateBtn.addEventListener('click', async () => {
  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;

  const api = `https://api.mymemory.translated.net/get?q=${fromTxt.value}!&langpair=${translateFrom}|${translateTo}`;

  toTxt.value = '';
  toTxt.setAttribute('placeholder', 'Translating...');

  const fetchApi = await fetch(api);
  const resJSON = await fetchApi.json();

  toTxt.value = resJSON.responseData.translatedText;
  toTxt.setAttribute('placeholder', 'Translation');
});

exchangeBtn.addEventListener('click', () => {
  const tempTxt = fromTxt.value;
  fromTxt.value = toTxt.value;
  toTxt.value = tempTxt;

  const tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});

copyIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    if (icon.id === 'from') {
      navigator.clipboard.writeText(fromTxt.value);
    } else {
      navigator.clipboard.writeText(toTxt.value);
    }
  });
});

speechIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    let utterance;
    if (icon.id === 'from') {
      utterance = new SpeechSynthesisUtterance(fromTxt.value);
      utterance.lang = selectTag[0].value;
    } else {
      utterance = new SpeechSynthesisUtterance(toTxt.value);
      utterance.lang = selectTag[1].value;
    }
    speechSynthesis.speak(utterance);
  });
});
