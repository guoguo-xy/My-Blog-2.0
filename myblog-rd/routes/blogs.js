const router = require('koa-router')()
const { verifyToken } = require('../auth');
const controller = require('../controllers/blogController');

router.prefix('/blog')

router.get(
    '/list',
    // verifyToken,
    controller.getBlogList
);

router.get(
    '/detail',
    verifyToken,
    controller.getBlogById);

router.post(
    '/addComm',
    // verifyToken,
    controller.addComm
)
router.post(
    '/addBlog',
    // verifyToken,
    controller.saveBlog
)
router.post(
    '/serBlogs',
    verifyToken,
    controller.serBlogs
)
router.get(
    '/getUserBlogs',
    verifyToken,
    controller.getUserBlogs
)
router.get(
    '/getUserComms',
    verifyToken,
    controller.getUserComms
)
router.get(
    '/deleteBlog',
    controller.deleteBlog
)
router.get(
    '/deleteComm',
    controller.deleteComm
)
router.get(
    '/commList',
    controller.getCommList,
);
module.exports = router