var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:3000',  //webpack-dev-server入口
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname, 'app/index.js')
	],   //入口文件，分析required的文件
	output: {
		path: path.join(__dirname, '/dist/'),  //指定最后输出的文件夹路径
		filename: '[name].js' ,
		publicPath: '/'
	},
	plugins:[
		new HtmlWebpackPlugin({
			template: './index.tpl.html',
			inject: 'body',
			filename: './index.html'
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env,NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/,
				loader: "babel-loader",
    			query: {
        			presets: ['es2015', 'react']
    			}	
			},
			{ 
				test: /\.css$/, 
				loader: "style!css" 
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			}
		]
	}
}