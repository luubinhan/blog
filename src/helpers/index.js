const isCurrentPage = (location, name) => {
	if (location.pathname === name) {
		return true;
	}
	return false;
}

/**
 * Get all tags from posts[]
 * @param  {array} posts
 * @return {array}  
 */
const getAllTags = (posts) => {
	let allTags = {};

	posts.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags
          .forEach(tag => {
            if (!allTags[tag]) {
              allTags[tag] = [];
            }
            allTags[tag].push(node);
          });
      }
    });

    return allTags;
}

export default {isCurrentPage, getAllTags }