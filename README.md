# mooc.lenskit.org

Web site for supporting teaching with LensKit.

This site is statically built with a Node-derived toolchain.  The root site content, in `content`,
is built using some custom code scripted with Gulp; the manual (in `manual`) is built with [GitBook][].

Root content is in Markdown and manual content is in [AsciiDoc][].  AsciiDoc gives us more flexibility for the typographical needs of the manual.

[GitBook]: https://toolchain.gitbook.com/
[AsciiDoc]: http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/

All the required packages are automatically managed by `npm`.  To get ready to write:

    npm install -g gulp-cli
    npm install

To rebuild the site content:

    gulp build

To start a preview server on http://localhost:4000:

    gulp serve