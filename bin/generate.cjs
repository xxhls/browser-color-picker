(() => {
	const path = require("path");
	const config = require(path.resolve(__dirname, "./config.cjs"));
	
	const folderPath = path.resolve(__dirname, "../dist/assets");
	
	const fs = require('fs');
	fs.readdir(folderPath, (err, files) => {
		if (err) throw err;
		
		for (let file of files) {
			const code = fs.readFileSync(`${folderPath}/${file}`, {
				encoding: 'utf-8'
			});
			
			let content = `// ==UserScript==\n` +
				`// @name         ${config.name}\n` +
				`// @namespace    ${config.namespace}\n` +
				`// @version      ${config.version}\n` +
				`// @description  ${config.description}\n` +
				`// @author       ${config.author}\n` +
				`// @match        ${config.match}\n` +
				`// @icon         ${config.icon}\n` +
				`// @grant        ${config.grant}\n` +
				`// ==/UserScript==\n\n` + code;
			
			const filePath = path.resolve(__dirname, "../browser-color-picker.js");
			
			fs.writeFile(filePath, content, (err) => {
				if (err) throw err;
			});
		}
	});
})();
