module.exports = {
      "/posts": {
        get: {
          tags: {
            Posts: "Get Posts",
          },
          description: "Get posts",
          operationId: "getPosts",
          parameters: [],
          responses: {
            200: {
              description: "Posts were obtained",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Post",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: {
            Posts: "Create a post",
          },
          description: "Create Post",
          operationId: "createPost",
          parameters: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PostInput",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Post created successfully",
            },
            500: {
              description: "Server error",
            },
          },  
      },
    },
      "/posts/{_id}": {
        put: {
          tags: {
            Posts: "Update a post",
          },
          description: "Update Post",
          operationId: "updatePost",
          parameters: [
            {
              name: "_id",
              in: "path",
              schema: {
                $ref: "#/components/schemas/_id",
              },
              description: "Id of Post to be updated",
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/PostInput" },
              },
            },
          },
          responses: {
            200: { description: "Post updated successfully" },
            404: { description: "Post not found" },
            500: { description: "Server error" },
          },
        },
        delete: {
        tags: {
          Posts: "Delete a post",
        },
        description: "Deleting a Post",
        operationId: "deletePost",
        parameters: [
          {
            name: "_id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            description: "Deleting a done Post",
          },
        ],
        responses: {
          200: { description: "Post deleted successfully" },
          404: { description: "Post not found" },
          500: { description: "Server error" },
        },
      },

    },
  };
