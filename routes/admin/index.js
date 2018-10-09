const express = require('express');
const router = express.Router();
const faker =  require('faker');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const Category = require('../../models/Category');
const {userAuthenticated} = require('../../helpers/authentication');


router.all('/*',userAuthenticated,(req,res,next)=>{

    req.app.locals.layout = 'admin';
    next();
});

router.get('/',(req,res)=>{

    const promises = [
        Post.countDocuments().exec(),
        Category.countDocuments().exec(),
        Comment.countDocuments().exec(),

    ];

    Promise.all(promises).then(([postCount, categoryCount, commentCount])=>{

        res.render('admin/index', {postCount: postCount,commentCount: commentCount,categoriesCount: categoryCount});



    });

    /*Post.countDocuments({}).then(postCount=>{

        Comment.countDocuments({}).then(commentCount=>{

            Category.countDocuments({}).then(categoriesCount=>{


                res.render('admin/index', {postCount: postCount,commentCount: commentCount,categoriesCount: categoriesCount});

            });

        });

    });*/

});

router.post('/generate-fake-posts',(req,res)=>{

    for(let i = 0; i < req.body.amount; i++){

        let post = new Post();

        post.title = faker.name.title();
        post.slug = faker.name.title();
        post.status = 'public';
        post.file= 'house.jpg';
        post.body= faker.lorem.sentence();
        post.allowComments = faker.random.boolean();

        post.save(function (err) {
            if(err) throw  err;
        });
    }
    res.redirect('/admin/posts')

});



module.exports = router;