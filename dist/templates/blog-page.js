'use strict';
const __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, 'raw', {value: raw});
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
Object.defineProperty(exports, '__esModule', {value: true});
const gatsby_1 = require('gatsby');
const blog_1 = require('../pages/blog');

exports.default = blog_1.default;
exports.pageQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(['\nquery TemplateBlogPage($skip: Int) {\n  # Get tags\n  tags: allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {\n    group(field: frontmatter___tags) {\n      fieldValue\n      totalCount\n    }\n  }\n\n  # Get posts\n  posts: allMarkdownRemark(\n    sort: { order: DESC, fields: [frontmatter___updatedDate] },\n    filter: {\n      frontmatter: {\n        draft: { ne: true }\n      },\n      fileAbsolutePath: { regex: "/blog/" }\n    }\n    limit: 10,\n    skip: $skip\n  ) {\n    totalCount\n    edges {\n      node {\n        excerpt\n        timeToRead\n        fields {\n          slug\n        }\n        frontmatter {\n          title\n          updatedDate(formatString: "DD MMMM, YYYY")\n          image {\n          \tchildren {\n              ... on ImageSharp {\n                fluid(maxWidth: 700, maxHeight: 100) {\n                  src\n                  srcSet\n                }\n              }\n            }\n          }\n          author {\n            id\n            avatar {\n              children {\n                ... on ImageSharp {\n                  fluid(maxWidth: 35, maxHeight: 35) {\n                    src\n                    srcSet\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n'], ['\nquery TemplateBlogPage($skip: Int) {\n  # Get tags\n  tags: allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {\n    group(field: frontmatter___tags) {\n      fieldValue\n      totalCount\n    }\n  }\n\n  # Get posts\n  posts: allMarkdownRemark(\n    sort: { order: DESC, fields: [frontmatter___updatedDate] },\n    filter: {\n      frontmatter: {\n        draft: { ne: true }\n      },\n      fileAbsolutePath: { regex: "/blog/" }\n    }\n    limit: 10,\n    skip: $skip\n  ) {\n    totalCount\n    edges {\n      node {\n        excerpt\n        timeToRead\n        fields {\n          slug\n        }\n        frontmatter {\n          title\n          updatedDate(formatString: "DD MMMM, YYYY")\n          image {\n          \tchildren {\n              ... on ImageSharp {\n                fluid(maxWidth: 700, maxHeight: 100) {\n                  src\n                  srcSet\n                }\n              }\n            }\n          }\n          author {\n            id\n            avatar {\n              children {\n                ... on ImageSharp {\n                  fluid(maxWidth: 35, maxHeight: 35) {\n                    src\n                    srcSet\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n'])));
let templateObject_1;
// # sourceMappingURL=blog-page.js.map
