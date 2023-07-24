//to fileter seatch
export const searchPrompts = (prompts, searchTerm) => {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return prompts.filter(
    (post) =>
      post.tag.toLowerCase().includes(lowerCaseSearchTerm) ||
      post.creator.username.toLowerCase().includes(lowerCaseSearchTerm)
  );
};
