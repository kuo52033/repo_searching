export const ACTION = {
  LOADING: "LOADING",
  GET_REPOS: "GET_REPO",
  NOT_FOUND: "NOT_FOUND",
  CLEAN: "CLEAN",
  NO_MORE_REPO: "NO_MORE_REPO",
};
export const FILTERS = {
  type: ["all", "public", "private", "forks", "sources", "member"],
  sort: ["created", "updated", "pushed", "full_name"],
  direction: ["asc", "desc"],
};
