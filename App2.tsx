import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItContainer from 'markdown-it-container';
import { decode } from 'html-entities';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

const extractEmbedRegex =
  /<div(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/div>/gi;
const stripScriptRegex =
  /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/gi;

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

const embedHtml = (html: string, text: string) => {
  console.clear();
  console.log('htmsl => ', html);
  let newHtml = html;
  const embedBoxes = html.match(extractEmbedRegex);

  if (embedBoxes) {
    embedBoxes.forEach((box) => {
      // strip opening and closing tags
      const boxContent = box.replace(/(^<div.*?>|<\/div>)/gi, '');
      const realBoxContent = boxContent.replace(/<[^>]+>/g, '');
      const decodedBoxContent = decode(realBoxContent);
      newHtml = newHtml.replace(box, '<div>' + decodedBoxContent.replace(stripScriptRegex, '')  + '</div>');
    });
  }

  console.log('newHtml => ', newHtml)s

  return newHtml;
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
