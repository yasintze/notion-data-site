const path = require("path");

exports.createPages = ({ actions, graphql }: any) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
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
  `).then((result: any) => {
    if (result.errors) {
      result.errors.forEach((e: any) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge: any) => {
      const id = edge.node.id;
      createPage({
        path: `/blog/${id}`,
        component: path.resolve(`src/templates/single-post.tsx`),
        context: {
          id,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }: any) => {
  const { createNodeField } = actions;

  if (node && node.internal && node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent);

    createNodeField({
      node,
      name: "collection",
      value: parent.sourceInstanceName,
    });
  }
};
