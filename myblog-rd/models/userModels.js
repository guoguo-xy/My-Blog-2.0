const db = require('./db')

module.exports = {
    getUserList() {
        return db.query(`SELECT * FROM t_user where is_delete=0`);
    },
    getUserByNameAndPwd(username, password) {
        return db.query(
            "SELECT * FROM t_user where username=? and password=?", [username, password]
        );
    },
    saveUser(user) {
        return db.query('insert into t_user set ?', user);
    },
    getUserByUsername(username) {
        return db.query('SELECT * FROM t_user where username=?', [username]);
    },
    updateUserById(userId) {
        return db.query(`update t_user set is_delete=1 where user_id=?`, [userId]);
    }
}