module.exports = {

	'/users/onlineusers': {
		get: {
			tags: ['Users'],
			summary: 'Get all online users',
			responses: {
				200: {
					description: 'List of online users',
					content: {
						'application/json': {
							schema: {
								type: 'array',
								items: {
									$ref: '#/components/schemas/User',
								},
							},
						},
					},
				},
			},
		},
	},
	'/users/confirm/{emailToken}': {
		get: {
			tags: ['Users'],
			summary: 'Confirm a email user by email token',
			parameters: [
				{
					name: 'emailToken',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Email token',
				},
			],
			responses: {
				200: {
					description: 'User confirmed',
				},
				400: {
					description: 'Invalid token',
				},
				404: {
					description: 'User not found',
				},
			},
		},
	},
	'/users/id/{_id}': {
		get: {
			tags: ['Users'],
			summary: 'Get a user by ID',
			parameters: [
				{
					name: '_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User ID',
				},
			],
			responses: {
				200: {
					description: 'User data',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				404: {
					description: 'User not found',
				},
			},
		},
	},
	'/users/name/{username}': {
		get: {
			tags: ['Users'],
			summary: 'Get a user by username',
			parameters: [
				{
					name: 'username',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Username',
				},
			],
			responses: {
				200: {
					description: 'User data',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				404: {
					description: 'User not found',
				},
			},
		},
	},
	'/users/userinfo': {
		get: {
      security: [{
        ApiKeyAuth: [ ]
      }],
			tags: ['Users'],
			summary: 'Get user information',
			security: [
				{
					bearerAuth: [],
				},
			],
			responses: {
				200: {
					description: 'User information',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				401: {
					description: 'Unauthorized',
				},
			},
		},
	},
	'/users/recoverPassword/{email}': {
		get: {
			tags: ['Users'],
			summary: 'Recover password',
			parameters: [
				{
					name: 'email',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User email',
				},
			],
			responses: {
				200: {
					description: 'Password recovery instructions sent',
				},
				404: {
					description: 'User not found',
				},
			},
		},
	},
	'/users/': {
		post: {
			tags: ['Users'],
			summary: 'Register a new user',
			requestBody: {
				required: true,
				content: {
					'multipart/form-data': {
						schema: {
							type: 'object',
							properties: {
								username: {
									type: 'string',
								},
								email: {
									type: 'string',
								},
								password: {
									type: 'string',
								},
								firstname: {
									type: 'string',
								},
								lastname: {
									type: 'string',
								},
								birthday: {
									type: 'string',
									format: 'date',
								},
								profileImg: {
									type: 'string',
									format: 'binary',
								},
							},
						},
					},
				},
			},
			responses: {
				201: {
					description: 'User registered',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
				400: {
					description: 'Invalid input',
				},
			},
		},
	},
	'/users/login': {
		post: {
			tags: ['Users'],
			summary: 'Log in a user',
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								email: {
									type: 'string',
								},
								password: {
									type: 'string',
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'User logged in',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								properties: {
									token: {
										type: 'string',
									},
									user: {
										$ref: '#/components/schemas/User',
									},
								},
							},
						},
					},
				},
				401: {
					description: 'Invalid credentials',
				},
			},
		},
	},
  '/users/resetPassword/{recoverToken}': {
		put: {
			tags: ['Users'],
			summary: 'Reset password',
			parameters: [
				{
					name: 'recoverToken',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'Password recovery token',
				},
			],
			requestBody: {
				required: true,
				content: {
					'application/json': {
						schema: {
							type: 'object',
							properties: {
								newPassword: {
									type: 'string',
									description: 'New password',
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: 'Password reset successfully',
				},
				400: {
					description: 'Invalid token',
				},
				404: {
					description: 'User not found',
				},
			},
		},
	},
	'/users/follow/{_id}': {
		put: {
      security: [{
        ApiKeyAuth: [ ]
      }],
			tags: ['Users'],
			summary: 'Follow a user',
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: '_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User ID to follow',
				},
			],
			responses: {
				200: {
					description: 'User followed',
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
	'/users/unfollow/{_id}': {
		put: {
      security: [{
        ApiKeyAuth: [ ]
      }],
			tags: ['Users'],
			summary: 'Unfollow a user',
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: '_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User ID to unfollow',
				},
			],
			responses: {
				200: {
					description: 'User unfollowed',
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
	'/users/getonline/{_id}': {
		put: {
      security: [{
        ApiKeyAuth: [ ]
      }],
			tags: ['Users'],
			summary: 'Set user online status',
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: '_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User ID to set online',
				},
			],
			responses: {
				200: {
					description: 'User is online',
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
	'/users/logout/{_id}': {
		delete: {
      security: [{
        ApiKeyAuth: [ ]
      }],
			tags: ['Users'],
			summary: 'Log out a user',
			security: [
				{
					bearerAuth: [],
				},
			],
			parameters: [
				{
					name: '_id',
					in: 'path',
					required: true,
					schema: {
						type: 'string',
					},
					description: 'User ID to log out',
				},
			],
			responses: {
				200: {
					description: 'User logged out',
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
};
