import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";

const SinglePostPage: React.FC<PageProps> = ({ data }: any) => {
  const content = data.markdownRemark;
  return (
    <main className="container mx-auto">
      <h1 className="text-5xl pb-5 font-bold">{content.frontmatter.name}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: content.html }}
        className="py-6"
      />
    </main>
  );
};

export const SinglePostQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
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
`;

export default SinglePostPage;

export const Head: HeadFC = ({ data }: any) => (
  <title>{data.markdownRemark.frontmatter.name}</title>
);
