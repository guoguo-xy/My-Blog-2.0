const { createToken } = require('../auth')
const model = require('../models/userModels')
const { formatDateTime } = require('../utils/dateTimeUtil')

module.exports = {
    async getUserList(ctx) {
        console.log(111);
        let results = await model.getUserList();
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            results[i].create_date = formatDateTime(results[i].create_date)
        }
        console.log(results);
        ctx.body = {
            state: 'success',
            users: results
        };
    },

    async login(ctx, next) {
        let { username, password } = ctx.request.body;
        let results = await model.getUserByNameAndPwd(username, password);
        console.log(results);
        if (results.length) {
            let payload = {
                userId: Math.random(),
                username,
            };
            var token = createToken(payload);
            // console.log(token);
            ctx.body = {
                state: 'success',
                token,
                loginUser: results[0]
            }
        } else {
            ctx.body = 'fail';
        }

    },

    async regist(ctx) {
        let { username, password, nickname } = ctx.request.body;

        if (username.trim().length == 0) {
            ctx.body = {
                state: 'fail'
            }
        } else {
            let results = await model.saveUser({ username, password, nickname })
            console.log(results);
            if (results.insertId) {
                ctx.body = {
                    state: 'success'
                }
            } else {
                ctx.body = {
                    state: 'fail'
                }
            }

        }

    },

    async checkUser(ctx) {
        console.log(ctx.query);
        let { inpVal } = ctx.query;
        let results = await model.getUserByUsername(inpVal);
        console.log(results);
        if (results.length > 0) {
            ctx.body = {
                state: 'fail'
            }
        } else {
            ctx.body = {
                state: 'success'
            }

        }
    },
    async deleteUser(ctx) {
        console.log(111);
        let { userId } = ctx.query;
        console.log(userId);
        await model.updateUserById(userId)
        ctx.body = {
            state: "success"
        }
    },


}