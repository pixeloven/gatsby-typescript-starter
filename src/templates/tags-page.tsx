import * as React from "react";
import { graphql } from "gatsby";

import Blog from "../pages/blog";

export default Blog;

export const pageQuery = graphql`
    query TemplateTagPage($tag: String) {
        # Get tags
        tags: allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }

        # Get posts
        posts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___updatedDate] },
            filter: {
                frontmatter: {
                    draft: { ne: true }
                    tags: { in: [$tag] }
                },
                fileAbsolutePath: { regex: "/blog/" }
            }
        ) {
            totalCount
            edges {
                node {
                    excerpt
                    timeToRead
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        updatedDate(formatString: "DD MMMM, YYYY")
                        image {
                            children {
                                ... on ImageSharp {
                                    fluid(maxWidth: 700, maxHeight: 100) {
                                        src
                                        srcSet
                                    }
                                }
                            }
                        }
                        author {
                            id
                            avatar {
                                children {
                                    ... on ImageSharp {
                                        fluid(maxWidth: 35, maxHeight: 35) {
                                            src
                                            srcSet
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
