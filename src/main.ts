import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
import nginx from 'highlight.js/lib/languages/nginx';
import monkey from 'highlight.js/lib/languages/monkey';
import markdown from 'highlight.js/lib/languages/markdown';
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
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('monkey', monkey);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', c);
hljs.registerLanguage('typescript', typescript);

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code: any, lang: any) {
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

const app = createApp(App);
app.config.globalProperties.marked = marked;
app.use(Router).mount('#app');
