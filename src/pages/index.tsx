import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link, graphql } from "gatsby";

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
  const articles = data.articles.edges;
  return (
    <main className="container mx-auto">
      {articles &&
        articles.map(({ node }: any) => (
          <div key={node.id} className="hero py-10 my-1 bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">{node.frontmatter.name}</h1>
                <div className="pb-5" />
                <Link to={`/blog/${node.id}`}>
                  <button className="btn btn-primary">Read more</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
};

export const IndexPageQuery = graphql`
  query {
    articles: allMarkdownRemark(
      filter: { fields: { collection: { eq: "articles" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            name
            errors
            status
            location
            author
            slug
            publish_channels
            publish_url
            meta_description
            publish_date {
              start
            }
            tags
            secondary_channels
          }
        }
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
