let jwt = require('jsonwebtoken')

let secretKey = "**my_secret_key$$";

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });
    },

    verifyToken: async(ctx, next) => {
        if (ctx.header.authorization) {
            let parts = ctx.header.authorization.split(" ");
            // console.log(parts[0]);
            // console.log(parts[1]);

            let bearer = parts[0];
            let token = parts[1];
            if (/^Bearer$/.test(bearer)) {
                try {
                    jwt.verify(token, '**my_secret_key$$');
                    await next();
                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        state: 'auth-fail'
                    };
                }
            }

        }

    },
}