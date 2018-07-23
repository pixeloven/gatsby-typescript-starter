"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var gatsby_1 = require("gatsby");
var lodash_1 = require("lodash");
var semantic_ui_react_1 = require("semantic-ui-react");
var BlogTitle_1 = require("../components/BlogTitle");
var disqus_react_1 = require("disqus-react");
var blog_post_graphql_1 = require("./blog-post.graphql");
exports.pageQuery = blog_post_graphql_1.default;
exports.default = (function (props) {
    var _a = props.data.post, frontmatter = _a.frontmatter, html = _a.html, timeToRead = _a.timeToRead;
    var avatar = frontmatter.author.avatar.children[0];
    var tags = props.data.post.frontmatter.tags
        .map(function (tag) { return React.createElement(semantic_ui_react_1.Label, { key: tag },
        React.createElement(gatsby_1.Link, { to: "/blog/tags/" + tag + "/" }, tag)); });
    var recents = props.data.recents.edges
        .map(function (_a) {
        var node = _a.node;
        var recentAvatar = node.frontmatter.author.avatar.children[0];
        var recentCover = lodash_1.get(node, "frontmatter.image.children.0.fluid", {});
        var extra = (React.createElement(semantic_ui_react_1.Comment.Group, null,
            React.createElement(semantic_ui_react_1.Comment, null,
                React.createElement(semantic_ui_react_1.Comment.Avatar, { src: recentAvatar.fluid.src, srcSet: recentAvatar.fluid.srcSet }),
                React.createElement(semantic_ui_react_1.Comment.Content, null,
                    React.createElement(semantic_ui_react_1.Comment.Author, { style: { fontWeight: 400 } }, node.frontmatter.author.id),
                    React.createElement(semantic_ui_react_1.Comment.Metadata, { style: { margin: 0 } },
                        node.timeToRead,
                        " min read")))));
        return (React.createElement("div", { key: node.fields.slug, style: { paddingBottom: "1em" } },
            React.createElement(semantic_ui_react_1.Card, { as: gatsby_1.Link, to: node.fields.slug, image: recentCover, header: node.frontmatter.title, extra: extra })));
    });
    var cover = lodash_1.get(frontmatter, "image.children.0.fluid", {});
    return (React.createElement(semantic_ui_react_1.Container, null,
        React.createElement(BlogTitle_1.default, null),
        React.createElement(semantic_ui_react_1.Segment, { vertical: true, style: { border: "none" } },
            React.createElement(semantic_ui_react_1.Item.Group, null,
                React.createElement(semantic_ui_react_1.Item, null,
                    React.createElement(semantic_ui_react_1.Item.Image, { size: "tiny", shape: "circular", src: avatar.fluid.src, srcSet: avatar.fluid.srcSet }),
                    React.createElement(semantic_ui_react_1.Item.Content, null,
                        React.createElement(semantic_ui_react_1.Item.Description, null, frontmatter.author.id),
                        React.createElement(semantic_ui_react_1.Item.Meta, null, frontmatter.author.bio),
                        React.createElement(semantic_ui_react_1.Item.Extra, null,
                            frontmatter.updatedDate,
                            " - ",
                            timeToRead,
                            " min read")))),
            React.createElement(semantic_ui_react_1.Header, { as: "h1" }, frontmatter.title)),
        React.createElement(semantic_ui_react_1.Image, __assign({}, cover, { fluid: true })),
        React.createElement(semantic_ui_react_1.Segment, { vertical: true, style: { border: "none" }, dangerouslySetInnerHTML: {
                __html: html,
            } }),
        React.createElement(semantic_ui_react_1.Segment, { vertical: true }, tags),
        props.data.site
            && props.data.site.siteMetadata
            && props.data.site.siteMetadata.disqus
            && React.createElement(semantic_ui_react_1.Segment, { vertical: true },
                React.createElement(disqus_react_1.DiscussionEmbed, { shortname: props.data.site.siteMetadata.disqus })),
        React.createElement(semantic_ui_react_1.Segment, { vertical: true },
            React.createElement(semantic_ui_react_1.Grid, { padded: true, centered: true }, recents))));
});
//# sourceMappingURL=blog-post.js.map