var userModel = require("./userModel");
var key = "ASDFGTREWQQzxcvfdsa";
var encryptor = require("simple-encryptor")(key);

module.exports.saveUserInfoService = (userDetails) => {
  return new Promise(function saveUserInfo(resolve, reject) {
    var userModelData = new userModel();
    userModelData.username = userDetails.username;
    userModelData.email = userDetails.email;
    //encrypt the password
    var encryptedPassword = encryptor.encrypt(userDetails.password);
    userModelData.password = userDetails.password;

    userModelData.save(function resultHandle(error, result) {
      if (error) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports.userLoginService = (userLoginDetails) => {
  return new Promise(function userLoginFunctionality(resolve, reject) {
    userModel.findOne(
      { email: userLoginDetails.email },
      function getLoginResult(error, result) {
        if (error) {
          reject({ status: false, message: "Invalid data" });
        } else {
          if (result != undefined && result != null) {
            var decryptedPassword = encryptor.decrypt(result.password);
            if (decryptedPassword == userLoginDetails.password) {
              resolve({
                status: true,
                message: "User Validation successfully",
              });
            }
          } else {
            reject({ status: false, message: "error in User Information" });
          }
        }
      }
    );
  });
}
