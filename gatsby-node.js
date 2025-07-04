/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve('./src/templates/blogTemplate.js')
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: {frontmatter: {date: DESC} }
        limit: 1000
        filter: {fileAbsolutePath: {regex: "/\\/src\\/posts\\//"}}
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.frontmatter.slug}/`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      }
    })
  })
}
