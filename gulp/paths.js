var appRoot = 'src/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';
var scssRoot = 'scss/';

module.exports = {
    root: appRoot,
    source: appRoot + '**/*.js',
    html: appRoot + '**/*.html',
    scssRoot: scssRoot,
    styles: scssRoot + '**/*.scss',
    scssPaths: [
        'jspm_packages/npm/foundation-sites@6.2.4/scss',
        'jspm_packages/npm/motion-ui@1.2.2/src',
        'jspm_packages/npm/font-awesome@4.6.3/scss'
    ],
    images: 'images/**/*.*',
    fontPaths: [
        'jspm_packages/npm/font-awesome@4.6.3/fonts/**/**.*'
    ],
    output: outputRoot,
    exportSrv: exportSrvRoot,
    doc: './doc',
    e2eSpecsSrc: 'test/e2e/src/**/*.js',
    e2eSpecsDist: 'test/e2e/dist/'
};
