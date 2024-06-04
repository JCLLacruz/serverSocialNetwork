const posts = require("./posts.js");
const users = require("./users.js");
const tags = require("./tags.js");
const comments = require("./comments")

module.exports = {
    paths: {
        ...posts,
        ...users,
        ...tags,
        ...comments
    }
};

