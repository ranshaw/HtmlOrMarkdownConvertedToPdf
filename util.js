const request = require("request");

function parseBody(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      console.log(error)
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject("获取页面失败" + error);
      }
    });
  });
}

module.exports = {
  parseBody
};
