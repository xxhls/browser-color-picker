const path = require("path");
const pkgJson = require(path.resolve(__dirname, "../package.json"));

module.exports = {
	name: pkgJson.name,
	namespace: "http://tampermonkey.net/",
	version: pkgJson.version,
	description: pkgJson.description,
	author: pkgJson.author,
	match: "*://*/*",
	icon: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
	grant: "GM_registerMenuCommand",
	license: pkgJson.license
};
