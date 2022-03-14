import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItContainer from 'markdown-it-container';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: ['id', 'class'], // empty array = all attributes are allowed
});
mdParser.use(markdownItContainer, 'embedhtml', {});

function handleEditorChange({ html, text }) {
  // console.clear();
  // console.log('handleEditorChange', html);
}

function stripScripts(s: string) {
  var div = document.createElement('div');
  div.innerHTML = s;
  var scripts = div.getElementsByTagName('script');
  var i = scripts.length;
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML;
}

const embedHtml = (html: string, text: string) => {
  console.clear();
  //create a parent div
  const parent = document.createElement('div');
  parent.innerHTML = html;
  // get all elements with a class of `embedhtml`
  const embedDivs = parent.getElementsByClassName('embedhtml');
  for (let i = 0; i < embedDivs.length; i++) {
    // decode text and inject
    embedDivs[i].innerHTML = stripScripts(embedDivs[i]?.textContent);
  }
  return parent.innerHTML;
};

const App = () => {
  return (
    <div>
      <MdEditor
        style={{ height: '500px' }}
        renderHTML={(text) => embedHtml(mdParser.render(text), text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};
/*
<iframe width="560" height="315" src="https://www.youtube.com/embed/CJJtA1NTqN4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
*/

export default App;
