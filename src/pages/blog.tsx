import * as React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import { Header, Grid, Card, List, Container, Feed, Segment, Comment } from "semantic-ui-react";
import { MarkdownRemarkConnection, ImageSharp } from "../graphql-types";
import BlogTitle from "../components/BlogTitle";
import TagsCard from "../components/TagsCard/TagsCard";
import BlogPagination from "../components/BlogPagination/BlogPagination";
import { get } from "lodash";

interface BlogProps {
    data: {
        tags: MarkdownRemarkConnection;
        posts: MarkdownRemarkConnection;
    };
    pageContext: {
        tag?: string; // only set into `templates/tags-pages.tsx`
    };
    location: {
        pathname: string;
    };
}

export default (props: BlogProps) => {
    const tags = props.data.tags.group;
    const posts = props.data.posts.edges;
    const { pathname } = props.location;
    const pageCount = Math.ceil(props.data.posts.totalCount / 10);

    // TODO export posts in a proper component
    const Posts = (
        <Container>
            {posts.map(({ node }) => {
                const { frontmatter, timeToRead, fields: { slug }, excerpt } = node;
                const avatar = frontmatter.author.avatar.children[0] as ImageSharp;
                const cover = get(frontmatter, "image.children.0.fluid", {});

                const extra = (
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar
                                src={avatar.fluid.src}
                                srcSet={avatar.fluid.srcSet}
                            />
                            <Comment.Content>
                                <Comment.Author style={{ fontWeight: 400 }}>
                                    {frontmatter.author.id}
                                </Comment.Author>
                                <Comment.Metadata style={{ margin: 0 }}>
                                    {frontmatter.updatedDate} - {timeToRead} min read
                                </Comment.Metadata>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                );

                const description = (
                    <Card.Description>
                        {excerpt}
                        <br />
                        <Link to={slug}>Read more…</Link>
                    </Card.Description>
                );

                return (
                    <Card key={slug}
                          fluid
                          image={cover}
                          header={frontmatter.title}
                          extra={extra}
                          description={description}
                    />
                );
            })}
        </Container>
    );

    return (
        <Layout location={props.location}>
            <Container>
                {/* Title */}
                <BlogTitle />

                {/* Content */}
                <Segment vertical>
                    <Grid padded style={{ justifyContent: "space-around" }}>
                        <div style={{ maxWidth: 600 }}>
                            {Posts}
                            <Segment vertical textAlign="center">
                                <BlogPagination Link={Link} pathname={pathname} pageCount={pageCount} />
                            </Segment>
                        </div>
                        <div>
                            <TagsCard Link={Link} tags={tags} tag={props.pageContext.tag} />
                        </div>
                    </Grid>
                </Segment>
            </Container>
        </Layout>
    );
};

export const pageQuery = graphql`
    query PageBlog {
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
                frontmatter: { draft: { ne: true } },
                fileAbsolutePath: { regex: "/blog/" }
            },
            limit: 10
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
