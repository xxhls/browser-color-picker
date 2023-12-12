/**
 * @param {string} path
 */
function deleteFolder (fs, path) {
	let files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function (file, index) {
			const curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				deleteFolder(fs, curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

(() => {
	const path = require("path");
	const fs = require("fs");
	deleteFolder(fs, path.resolve(__dirname, "../dist"));
})();
