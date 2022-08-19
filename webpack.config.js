const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    entry: './src/app.ts',
    // 出力先の設定
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
    },
	devtool: 'source-map',
	// dev Serverの設定
	devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
				open: true,
    },
	module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
	resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        // { systemvars: true } を設定するとシステム環境変数も読み込まれるようになる
        new Dotenv({ systemvars: true }),
      ],
}