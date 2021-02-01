const db = require('./db')

module.exports = {
    getBlogs() {
        return db.query(`SELECT * FROM t_blog where is_delete=0`)
    },
    getComms() {
        return db.query(`SELECT * FROM t_comment where is_delete=0`)
    },
    getBlogById(blogId) {
        return db.query(`
        SELECT blog.*, comm.comm_id, comm.content as comm_content, comm.post_time as comm_post_time, usr.username
        FROM t_blog blog  LEFT JOIN t_comment comm 
        ON comm.blog_id=blog.blog_id 
        LEFT JOIN t_user usr ON comm.user_id=usr.user_id
        WHERE blog.blog_id=?`, [blogId]);

    },
    saveComm(inpVal, blogId, userId) {

        return db.query("insert into t_comment set content=?,blog_id=?,user_id=?", [inpVal, blogId, userId]);

    },
    saveBlog(blogTitle, blogContent, userId) {
        return db.query("insert into t_blog set title=?,content=?,user_id=?", [blogTitle, blogContent, userId]);
    },
    getBlogByTitle(inpVal) {

        return db.query("SELECT * FROM t_blog where title like '%" + inpVal + "%'");
    },
    getBlogsByUserId(userId) {
        return db.query(`SELECT * FROM t_blog where user_id=?`, [userId]);
    },
    getCommsByUserId(userId) {
        return db.query(`SELECT * FROM t_comment where user_id=?`, [userId]);
    },
    updateBlogById(blogId) {
        return db.query(`update t_blog set is_delete=1 where blog_id=?`, [blogId]);
    },
    updateCommById(commId) {
        return db.query(`update t_comment set is_delete=1 where comm_id=?`, [commId]);
    }
}