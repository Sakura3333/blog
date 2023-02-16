import { createApp } from 'vue';
import App from './App.vue';
import Router from './router/index';

// tailwind样式表
import './index.css';

// markdown引擎配置
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import glsl from 'highlight.js/lib/languages/glsl';
import lua from 'highlight.js/lib/languages/lua';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import csharp from 'highlight.js/lib/languages/csharp';
import cpp from 'highlight.js/lib/languages/cpp';
import c from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/github-dark.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);
hljs.registerLanguage('glsl', glsl);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', c);
hljs.registerLanguage('typescript', typescript);
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: any, lang: any) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-',
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

// fontawesome图标库
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faMagnifyingGlass, 
  faDragon, 
  faFireAlt, 
  faFireFlameSimple, 
  faXmark, 
  faArrowUp, 
  faChevronLeft, 
  faChevronRight, 
  faChevronUp,
  faHeadphonesSimple,
  faMusic,
  faPlay,
  faBackward,
  faForward,
  faPause,
  faRepeat,
  faShuffle,
  faRotate,
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
  faRecordVinyl,
  faPenToSquare,
  faBars,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWeixin, 
  faWeibo, 
  faQq, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEye,
  faComment,
  faStar
} from '@fortawesome/free-regular-svg-icons';
library.add(
  faMagnifyingGlass, 
  faDragon, 
  faFireAlt, 
  faFireFlameSimple, 
  faXmark, 
  faArrowUp, 
  faArrowDown, 
  faWeixin, 
  faWeibo, 
  faQq, 
  faGithub, 
  faChevronLeft, 
  faChevronRight,
  faChevronUp,
  faEye,
  faComment,
  faStar,
  faHeadphonesSimple,
  faMusic,
  faPlay,
  faBackward,
  faForward,
  faPause,
  faRepeat,
  faShuffle,
  faRotate,
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
  faRecordVinyl,
  faPenToSquare,
  faBars
);

const app = createApp(App);
app.config.globalProperties.marked = marked;
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(Router).mount('#app');
