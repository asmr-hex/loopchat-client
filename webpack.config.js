
var baseConfig = {
    module: {
	loaders: [
	    {
		test: /\.js$/,
		loader: "babel-loader",
		exclude: /node_modules/
	    }
	]
    }
}

var libConfig = Object.assign({}, baseConfig, {
    name: "library",
    entry: ["./src/lib.core.js"],
    output: {
	path: "./",
	filename: "library.bundle.js"
    }
});

var examplesConfig = Object.assign({}, baseConfig, {
    name: "examples",
    entry: [ __dirname + "/examples/index.js"],
    output: {
	path: __dirname + "/examples/",
	filename: "bundle.js"
    }
});


// export configurations for library src and example src
module.exports = [
    libConfig,
    examplesConfig,
]
