module.exports = {
    "/comments": {
      get: {
        tags: {
          Comments: "Get Comments",
        },
        description: "Get Comments",
        operationId: "getComments",
        parameters: [],
        responses: {
          200: {
            description: "Comments were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Comment",
                },
              },
            },
          },
        },
      },
      post: {
        tags: {
          Comments: "Create a comment",
        },
        description: "Create Comment",
        operationId: "createComment",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CommentInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Comment created successfully",
          },
          500: {
            description: "Server error",
          },
        },  
    },
  },
    "/comments/{_id}": {
      put: {
        tags: {
          Comments: "Update a comment",
        },
        description: "Update Comment",
        operationId: "updateComment",
        parameters: [
          {
            name: "_id",
            in: "path",
            schema: {
              $ref: "#/components/schemas/_id",
            },
            description: "Id of Comment to be updated",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CommentInput" },
            },
          },
        },
        responses: {
          200: { description: "Comment updated successfully" },
          404: { description: "Comment not found" },
          500: { description: "Server error" },
        },
      },
    delete: {
      tags: {
        Comments: "Delete a comment",
      },
      description: "Deleting a Comment",
      operationId: "deleteComment",
      parameters: [
        {
          name: "_id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/_id",
          },
          description: "Deleting a done Comment",
        },
      ],
      responses: {
        200: { description: "Comment deleted successfully" },
        404: { description: "Comment not found" },
        500: { description: "Server error" },
      },
    },
  },
};