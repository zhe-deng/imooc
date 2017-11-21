var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
//  通过编译生成构造函数
var User = mongoose.model('User', UserSchema);

module.exports = User;