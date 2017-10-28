var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
//  通过编译生成构造函数
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;