module.exports = {
    formatDateTime(timestamp) {
        let postTime = timestamp;
        let postTimeStr = postTime.getFullYear() + "-" + (postTime.getMonth() + 1) + "-" + postTime.getDate();
        return postTimeStr;
    }
}