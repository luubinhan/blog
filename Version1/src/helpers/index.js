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
    allTags = Object.keys(allTags).map( tagName => {
      return tagName;
    })
    return allTags;
}

export default {isCurrentPage, getAllTags }