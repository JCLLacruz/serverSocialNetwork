module.exports = {
	'/tags/addtagtopost/{postId}': {
		put: {
			security: [{
				ApiKeyAuth: [ ]
			  }],
		  tags: ['Tags'],
		  summary: 'Add a tag to a post',
		  security: [
			{
			  bearerAuth: [],
			},
		  ],
		  parameters: [
			{
			  name: 'postId',
			  in: 'path',
			  required: true,
			  schema: {
				type: 'string',
			  },
			  description: 'ID of the post',
			},
		  ],
		  requestBody: {
			required: true,
			content: {
			  'application/json': {
				schema: {
				  $ref: '#/components/schemas/TagInput',
				},
			  },
			},
		  },
		  responses: {
			200: {
			  description: 'Tag added to post',
			},
			404: {
			  description: 'Post not found',
			},
			401: {
			  description: 'Unauthorized',
			},
		  },
		},
	  },
	  '/tags/addtagtouser': {
		put: {
			security: [{
				ApiKeyAuth: [ ]
			  }],
		  tags: ['Tags'],
		  summary: 'Add a tag to a user',
		  security: [
			{
			  bearerAuth: [],
			},
		  ],
		  requestBody: {
			required: true,
			content: {
			  'application/json': {
				schema: {
				  $ref: '#/components/schemas/TagInput',
				},
			  },
			},
		  },
		  responses: {
			200: {
			  description: 'Tag added to user',
			},
			404: {
			  description: 'User not found',
			},
			401: {
			  description: 'Unauthorized',
			},
		  },
		},
	  },
	  '/tags/deletetagtouser/id/{tagId}': {
		delete: {
			security: [{
				ApiKeyAuth: [ ]
			  }],
		  tags: ['Tags'],
		  summary: 'Delete a tag from a user',
		  security: [
			{
			  bearerAuth: [],
			},
		  ],
		  parameters: [
			{
			  name: 'tagId',
			  in: 'path',
			  required: true,
			  schema: {
				type: 'string',
			  },
			  description: 'ID of the tag to delete',
			},
		  ],
		  responses: {
			200: {
			  description: 'Tag deleted from user',
			},
			404: {
			  description: 'Tag or user not found',
			},
			401: {
			  description: 'Unauthorized',
			},
		  },
		},
	  },
	  '/tags/deletetagtopost/id/{postId}': {
		delete: {
			security: [{
				ApiKeyAuth: [ ]
			  }],
		  tags: ['Tags'],
		  summary: 'Delete a tag from a post',
		  security: [
			{
			  bearerAuth: [],
			},
		  ],
		  parameters: [
			{
			  name: 'postId',
			  in: 'path',
			  required: true,
			  schema: {
				type: 'string',
			  },
			  description: 'ID of the post',
			},
		  ],
		  responses: {
			200: {
			  description: 'Tag deleted from post',
			},
			404: {
			  description: 'Tag or post not found',
			},
			401: {
			  description: 'Unauthorized',
			},
		  },
		},
	  },
};
