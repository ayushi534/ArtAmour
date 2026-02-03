const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5555/api";
const SERVER_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

const resolveImageUrl = (src) => {
  if (!src) return src;
  if (isAbsoluteUrl(src)) return src;
  if (src.startsWith("/uploads")) return `${SERVER_ORIGIN}${src}`;
  if (src.startsWith("uploads/")) return `${SERVER_ORIGIN}/${src}`;
  return src;
};

export default resolveImageUrl;
