var path = require("path");
var webpack = require("webpack");
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var getFilesRoot = function(root) {
    var _resolvedpaths = [];
    glob.sync(root).forEach(function(file) {
        if (file) {
            var _r = path.resolve(file);
            _r = _r.replace(__dirname, '.').replace(/\\/g, "/");
            _resolvedpaths.push(_r);
        };
    });
    return _resolvedpaths;
};

var mapFiles = function(arr) {
    var _f = [],
        _arr;
    arr.forEach(function(path) {
        if (path) {
            _arr = getFilesRoot(path);
            _f = _f.concat(_arr);
        };
    });
    return _f;
};

function root(__path) {
    return path.join(__dirname, __path);
}

var _app = mapFiles(['./src/js/**/*.js']);
var copyFromPath = path.join(__dirname, 'node_modules/');
var copyToPath = path.join(__dirname, 'dist/');

var jsModuleConfig = {
    entry: {
        app: _app
    },
    output: {
        path: path.resolve(__dirname, "dist/js/"),
        publicPath: "public/js/",
        filename: "dashboard.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src') // location of your src
        ),
        new CopyWebpackPlugin([
            { from: copyFromPath + 'angular/angular.min.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'bootstrap/dist/js/bootstrap.min.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'jquery/dist/jquery.min.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'angular-ui-router/release/angular-ui-router.min.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'underscore/underscore-min.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'requirejs/require.js', to: copyToPath + 'js/lib/' },
            { from: copyFromPath + 'bootstrap/dist/css/bootstrap.min.css', to: copyToPath + 'css/' },
            { from: copyFromPath + 'bootstrap/dist/css/bootstrap.min.css.map', to: copyToPath + 'css/' },
            { from: copyFromPath + 'bootstrap/dist/css/bootstrap-theme.min.css', to: copyToPath + 'css/' },
            { from: copyFromPath + 'bootstrap/dist/css/bootstrap-theme.min.css.map', to: copyToPath + 'css/' },
            { from: copyFromPath + 'bootstrap/dist/fonts/', to: copyToPath + 'fonts/' },
        ])
    ]
};


var _scss = mapFiles(['src/sass/**/*.scss']);
var sassComplier = new ExtractTextPlugin({
    filename: "main.css"
        //disable: process.env.NODE_ENV === "development"
});

var sassConfig = {
    entry: {
        scss: _scss
    },
    output: {
        path: path.resolve(__dirname, "dist/css/"),
        publicPath: "public/css/",
        filename: "main.css"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        sassComplier
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: sassComplier.extract({
                use: [{
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]

    }
};

module.exports = [jsModuleConfig, sassConfig];