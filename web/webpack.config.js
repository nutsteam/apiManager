var webpack = require('webpack');
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js', ['dashboard','login','forget','index','register','findpassword']);
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:{
        'dashboard':'./html/dashboard/app/index.js',
        'register':'./html/src/register.js',
        'login':'./html/src/login.js',
        'forget':'./html/src/forget.js',
		'findpassword':'./html/src/findpassword.js',
        'index':'./html/src/index.js'
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: "../../../build/",
        filename: '[name].js', 
        chunkFilename: '[id].js',
    },
    resolve:{
        extensions:['', '.js', '.jsx', 'css', 'vue']
    },
    module:{
        loaders:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },{
                test: /\.css$/,
                //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                loader: 'style-loader!css-loader'
            },{
                test: /\.scss$/,
                //loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
                loader: 'style-loader!css-loader!sass-loader'

            },{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },{
                test: /\.woff/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },{
                test: /\.ttf/,
                loader: 'file-loader'
            },{
                test: /\.eot/,
                loader: 'file-loader'
            },{
                test: /\.svg/,
                loader: 'file-loader'
            },{
                test:/\.html$/,
                loader:'html-loader'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    },
	plugins:[
		commonsPlugin,
    ]
};