// To sluggify strings
const slugify = (text) => text
  .toString()
  .toLowerCase()
  .replace(/\s+/g, '-') // Replace spaces with dash (-)
  .replace(/[^\w-]+/g, '') // Remove all non-word chars
  .replace(/--+/g, '-') // Replace multiple dash(--) with single dash(-)
  .trim();

export default slugify;
