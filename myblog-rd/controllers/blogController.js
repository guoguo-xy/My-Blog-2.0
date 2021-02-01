const blogModel = require("../models/blogModels")
const { formatDateTime } = require('../utils/dateTimeUtil')

module.exports = {
    async getBlogList(ctx, next) {
        let results = await blogModel.getBlogs();
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            results[i].post_time = formatDateTime(results[i].post_time)
        }
        ctx.body = {
            state: 'success',
            blogs: results
        };
    },
    async getBlogById(ctx, next) {

        let { blogId } = ctx.query;
        let results = await blogModel.getBlogById(blogId);
        // console.log(results);
        if (results.length > 0) {
            let { blog_id, title, content, post_time } = results[0];
            let blogInfo = {
                blog_id,
                title,
                content,
                post_time: formatDateTime(post_time)
            };
            blogInfo.comments = [];
            for (let i = 0; i < results.length; i++) {
                let obj = results[i];
                if (obj.comm_id) {
                    blogInfo.comments.push({
                        comm_id: obj.comm_id,
                        comm_content: obj.comm_content,
                        comm_post_time: formatDateTime(obj.comm_post_time),
                        username: obj.username
                    });
                }
            }
            ctx.body = {
                state: "success",
                blog: blogInfo
            };

        } else {
            await ctx.render("error", {
                message: '该条文章不存在！'
            });
        }

    },
    addComm(ctx, next) {

        let { inpVal, blogId, userId } = ctx.request.body;
        if (inpVal) {
            blogModel.saveComm(inpVal, blogId, userId);
            ctx.body = {
                state: 'success',
            }
        }
    },
    saveBlog(ctx, next) {
        let { blogTitle, blogContent, userId } = ctx.request.body;
        if (blogTitle && blogContent) {
            blogModel.saveBlog(blogTitle, blogContent, userId);
            ctx.body = {
                state: 'success',
            }
        }
    },
    async serBlogs(ctx) {
        let { inpVal } = ctx.request.body;
        console.log(inpVal);
        if (inpVal.length > 0) {
            let results = await blogModel.getBlogByTitle(inpVal);
            for (let i = 0; i < results.length; i++) {
                results[i].post_time = formatDateTime(results[i].post_time)
            }
            console.log(results);
            if (results.length > 0) {
                ctx.body = {
                    state: 'success',
                    blogs: results

                }
            } else {
                ctx.body = {
                    state: 'fail'
                }
            }
        }

    },
    async getUserBlogs(ctx) {
        let { userId } = ctx.query;
        let results = await blogModel.getBlogsByUserId(userId)
        for (let i = 0; i < results.length; i++) {
            results[i].post_time = formatDateTime(results[i].post_time)
        }
        if (results.length > 0) {
            ctx.body = {
                state: 'success',
                blogs: results
            }
        } else {
            ctx.body = {
                state: 'fail'
            }
        }
    },
    async getUserComms(ctx) {
        let { userId } = ctx.query;
        let results = await blogModel.getCommsByUserId(userId)
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            results[i].post_time = formatDateTime(results[i].post_time)
        }
        if (results.length > 0) {
            ctx.body = {
                state: 'success',
                comms: results
            }
        } else {
            ctx.body = {
                state: 'fail'
            }
        }
    },
    async deleteBlog(ctx) {
        let { blogId } = ctx.query;
        await blogModel.updateBlogById(blogId)
        ctx.body = {
            state: "success"
        }
    },
    async deleteComm(ctx) {
        let { commId } = ctx.query;
        await blogModel.updateCommById(commId)
        ctx.body = {
            state: "success"
        }
    },
    async getCommList(ctx, next) {
        let results = await blogModel.getComms();
        for (let i = 0; i < results.length; i++) {
            results[i].post_time = formatDateTime(results[i].post_time)
        }
        ctx.body = {
            state: 'success',
            comms: results
        };
    },
}