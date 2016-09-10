var webpack = require('webpack');
var path = require("path");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js', [
    'dashboard','login','findpassword',
    'index','register','forget']
);
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jquery=require('jquery');
var plugins=[commonsPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production") 
      }
    }),
    new  webpack.optimize.UglifyJsPlugin({compress:{warnings:false}})
];
var fs =require('fs');
var files = fs.readdirSync('./html');
files.forEach(function(item){
        if(item.match('.ejs')!=null){
            plugins.push(new HtmlWebpackPlugin({
                filename:'../html/'+item.replace('.ejs','.html'),
                template:'./html/'+item,
                inject:false,
                hash:false
            }));
        }
    });
files = fs.readdirSync('./html/dashboard');
files.forEach(function(item){
        if(item.match('.ejs')!=null){
            plugins.push(new HtmlWebpackPlugin({
                filename:'../html/dashboard/'+item.replace('.ejs','.html'),
                template:'./html/dashboard/'+item,
                inject:false,
                hash:false
            }));
        }
    });
//console.log("plugins.length:"+plugins.length)
var isDev=false;
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
        path: path.join(__dirname, 'built'),
        publicPath: '/built/',
        filename: '[name].js',
        chunkFilename: '[id].[hash].js',
    },
    resolve:{
        extensions:['', '.js', 'css', 'vue']
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
            }
            ,{
               test: /\.(png|jpg|gif)$/,
                //loader: 'url-loader?limit=1024'
                loader:'file-loader'
            }
            ,{
                test: /\.woff/,
                loader: 'file-loader'
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
                loader:'html-loader?interpolate&minimize=false'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    },
	plugins:plugins
};