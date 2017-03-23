const fs = require('fs');
const parseHTML = require('posthtml-parser');
const logger = require('gulplog');

module.exports = function(footerFile) {
  let footerHTML = fs.readFileSync('piwik.html', 'utf8');
  let footer = parseHTML(footerHTML);
  if (!footer.length) {
    footer = [footer];
  }

  return function(tree) {
    tree.match({tag: 'body'}, (node) => {
      for (let e of footer) {
        node.content.push(e);
      }
      return node;
    });

    return tree;
  }
};