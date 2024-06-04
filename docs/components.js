module.exports = {
    components:{
        securitySchemes: {
            bearerAuth: {
              type: 'apiKey',
              scheme: 'Authorization',
              in: 'header',
            },
          },
        schemas:{
            Post:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:'post identification number',
                        example:'6201064b0028de7866e2b2c4'
                    },
                    title:{
                        type:'string',
                        description:'post title',
                        example:'Extreme Adventure: Challenges in the Wild'
                    },
                    body:{
                        type:'string',
                        description:'post body',
                        example:'Experience the thrill of rock climbing, whitewater rafting, and backcountry skiing. Conquer nature’s toughest terrains and push your limits.'
                    },
                    image_path:{
                        type:'string',
                        description:'image URL',
                        example:'1715867848232-background.jpg'
                    },
                    UserId:{
                        type:'objectId',
                        description:'user identification number',
                        example:'664367465446a8d1920969de'
                    },
                    status:{
                        type:'string',
                        description:'status of post',
                        example:'published'
                    },
                    TagIds: [{
                        type:'objectId',
                        description:'tags identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    LikeIds: [{
                        type:'objectId',
                        description:'likes identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    CommentIds: [{
                        type:'objectId',
                        description:'comments identification number',
                        example:'664367465446a8d1920969de'
                    }],
                }
            },
            PostInput:{
                type:'object',
                properties:{
                    title:{
                        type:'string',
                        description:'Post title',
                        example:'Extreme Adventure: Challenges in the Wild'
                    },
                    body:{
                        type:'string',
                        description:'post body',
                        example:'Experience the thrill of rock climbing, whitewater rafting, and backcountry skiing. Conquer nature’s toughest terrains and push your limits.'
                    },
                    image_path:{
                        type:'string',
                        description:'image URL',
                        example:'1715867848232-background.jpg'
                    },
                    UserId:{
                        type:'objectId',
                        description:'user identification number',
                        example:'664367465446a8d1920969de'
                    }
                }
            },
            User:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:'user identification number',
                        example:'66460a9d84afadd742b6d891'
                    },
                    username:{
                        type:'string',
                        description:'use unique name to identify',
                        example:'Superusertest'
                    },
                    email:{
                        type:'string',
                        description:` user email`,
                        example:'example@example.com'
                    },
                    password:{
                        type:'string',
                        description:'user password',
                        example:'hellohello'
                    },
                    birthday:{
                        type:'date',
                        description:'user birthday',
                        example:'1977-10-22'
                    },
                    firstname:{
                        type:'string',
                        description:'user firstname',
                        example:'Garcia'
                    },
                    lastname:{
                        type:'string',
                        description:'user lastname',
                        example:'Jimenez'
                    },
                    image_path:{
                        type:'string',
                        description:'image URL',
                        example:'1715867848232-background.jpg'
                    },
                    TagIds: [{
                        type:'objectId',
                        description:'tags identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    PostIds: [{
                        type:'objectId',
                        description:'post identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    FollowerIds: [{
                        type:'objectId',
                        description:'Follower user identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    FollowIds: [{
                        type:'objectId',
                        description:'Follow user identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    CommentIds: [{
                        type:'objectId',
                        description:'comments identification number',
                        description:'Comment identification number',
                        example:'6201064b0028de7866e2b2c4'
                    }],
                }
            },
            UserInput:{
                type:'object',
                properties:{
                    username:{
                        type:'string',
                        description:'Post title',
                        example:'Extreme Adventure: Challenges in the Wild'
                    },
                    email:{
                        type:'string',
                        description:'post body',
                        example:'Experience the thrill of rock climbing, whitewater rafting, and backcountry skiing. Conquer nature’s toughest terrains and push your limits.'
                    },
                    password: {
                        type: 'string',
                        description: 'user password',
                        example: 'hellohello'
                    },
                    birthday: {
                        type: 'date',
                        description: 'user birthday',
                        example: '1986-11-24'
                    },
                    firstname: {
                        type: 'Garcia',
                        description: 'user firtname',
                        example: '1986-11-24'
                    },
                    lastname: {
                        type: 'Jimenez',
                        description: 'user lastname',
                        example: '1986-11-24'
                    },
                    image_path: {
                        type: 'string',
                        description: 'user profile image',
                        example: 'profileImg=@"/C:/Users/19lac/Desktop/Captura de pantalla 2024-04-30 115117.png'
                    },
                }
            },
            Tag:{
                type:'object',
                properties:{
                    tag:{
                        type:'string',
                        description:'Tag name',
                        example:'Football'
                    },
                    PostIds: [{
                        type:'objectId',
                        description:'post identification number',
                        example:'664367465446a8d1920969de'
                    }],
                    UserIds: [{
                        type:'objectId',
                        description:'user identification number',
                        example:'664367465446a8d1920969de'
                    }],
                }
            },
            TagInput:{
                type:'object',
                properties:{
                    tag:{
                        type:'string',
                        description:'Tag name',
                        example:'Football'
                    }
                }
            },
            _id:{
                type:'objectId',
                description:"An id of a task",
                example: "6201064b0028de7866e2b2c4"
            },
            Comment:{
                type:'object',
                properties:{
                    body:{
                        type:'string',
                        description:'Comment body',
                        example:'I love it'
                    },
                    PostId:{
                        type:'objectId',
                        description:'Post identification number',
                        example:'664367465446a8d1920969de'
                    },
                    UserId:{
                        type:'objectId',
                        description:'user identification number',
                        example:'664367465446a8d1920969de'
                    },
                    LikeIds: [{
                        type:'objectId',
                        description:'likes identification number',
                        example:'664367465446a8d1920969de'
                    }],
                }
            },
            CommentInput:{
                type:'object',
                properties:{
                    body:{
                        type:'string',
                        description:'Comment body',
                        example:'I love it'
                    },
                    PostId:{
                        type:'objectId',
                        description:'Post identification number',
                        example:'664367465446a8d1920969de'
                    },
                    UserId:{
                        type:'objectId',
                        description:'user identification number',
                        example:'664367465446a8d1920969de'
                    },
                }
            },
        }
    }
}



