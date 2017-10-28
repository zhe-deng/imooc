module.exports = function(grunt) {

    grunt.initConfig({

    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    // 便于开发的时候，不要由于语法的错误而中断了grunt的整个服务。
    grunt.option('force', true);

    // 注册默认任务
    grunt.registerTask('default', ['concurrent']);
};