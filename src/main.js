/**
 * @Project: browser-color-picker
 * @File: src/main.js
 * @Author: heyq <heyq020814@qq.com>
 * @Date: 2023-12-12 14:52:55
 * @Description: This is a tool to pick color in browser.
 *
 * Copyright © 2023 heyq. All Rights Reserved.
 *
 * Licensed under the MIT License.
 * See https://mit-license.org/ for more information.
 */

/**
 * Auto-close alert.
 * @param {MouseEvent} e
 * @param {string} msg
 */
const alert = (e, msg) => {
	const paragraph = document.createElement("p");
	paragraph.innerText = msg;
	paragraph.style.position = "fixed";
	paragraph.style.left = `${e.clientX}px`;
	paragraph.style.top = `${e.clientY}px`;
	document.body.appendChild(paragraph);
	setTimeout(() => {
		paragraph.remove();
	}, 1000);
};

/**
 * Mount the popup
 * @param {MouseEvent} e
 * @returns {{container: HTMLDivElement, show: HTMLDivElement, hex: HTMLDivElement, rgb: HTMLDivElement, btn: HTMLButtonElement}}
 */
const mountDom = (e) => {
	const container = document.createElement("div");
	container.style.display = "flex";
	container.style.justifyContent = "space-between";
	container.style.height = "100px";
	container.style.width = "270px";
	container.style.boxSizing = "border-box";
	container.style.backgroundColor = "#F7F8FA";
	container.style.border = "1px solid #E5E6EB";
	container.style.borderRadius = "8px";
	container.style.color = "rgb(134, 144, 156)";
	container.style.padding = "8px";
	container.style.position = "fixed";
	container.style.left = `${e.clientX}px`;
	container.style.top = `${e.clientY}px`;
	container.setAttribute("id", "browser-color-picker");
	document.body.appendChild(container);
	
	const show = document.createElement("div");
	show.style.width = "84px";
	show.style.backgroundColor = "green";
	show.style.marginRight = "20px";
	container.appendChild(show);
	
	const data = document.createElement("div");
	data.style.display = "flex";
	data.style.flexDirection = "column";
	data.style.justifyContent = "space-between";
	container.appendChild(data);

	const rgb = document.createElement("div");
	rgb.style.lineHeight = "1.5";
	rgb.style.cursor = "pointer";
	rgb.innerHTML = "RGB: <span style='color: black'>255 255 255</span>"
	data.appendChild(rgb);
	
	const hex = document.createElement("div");
	hex.style.lineHeight = "1.5";
	hex.style.cursor = "pointer";
	hex.innerHTML = "HEX: <span style='color: black'>1E 1F 22</span>"
	data.appendChild(hex);
	
	const btn = document.createElement("button");
	btn.style.width = "100%";
	btn.style.borderRadius = "4px";
	btn.style.borderColor = "#E5E6EB";
	btn.style.cursor = "pointer";
	btn.innerText = "cancel pick";
	data.appendChild(btn);
	
	return { container, show, rgb, hex, btn };
};

/**
 * Remove the popup.
 */
const removeDom = () => {
	const container = document.getElementById("browser-color-picker");
	if (container) container.remove();
};

/**
 * Handler of onContextmenu
 * @param {MouseEvent} e
 * @returns {Promise<void>}
 */
const handler = async (e) => {
	e.preventDefault();
	removeDom();
	const eyeDropper = new window.EyeDropper();
	try {
		const result = await eyeDropper.open() // 开始拾取颜色
		const color_hex = result.sRGBHex;
		const {container, show, rgb, hex, btn} = mountDom(e);
		
		container.addEventListener("blur", () => {
			removeDom();
		});
		show.style.backgroundColor = color_hex;
		hex.innerHTML = `HEX: <span style='color: black'>${color_hex}</span>`
		hex.addEventListener("click", (e) => {
			window.navigator.clipboard.writeText(color_hex).then((res) => {
				console.log(e)
				alert(e, "copied");
			})
		})
		
		//console.log("The color is: " + result.sRGBHex)
		//const p = document.createElement("p");
		//p.innerText = result.sRGBHex;
		//popup.appendChild(p);
		//const div = document.createElement("div");
		//div.style.width = "10px";
		//div.style.height = "10px";
		//div.style.backgroundColor = result.sRGBHex;
		//popup.appendChild(div);
	} catch (e) {
		console.log("Cancel");
	}
}

/**
 * Activate Color Picker in Browser
 * @returns {string}
 */
let activateColorPicker = () => {
	try {
		document.addEventListener ("contextmenu", handler, false);
		return "Successfully activate color picker in browser! ";
	} catch (e) {
		return "Sorry, unknown error occurred.";
	}
};

/**
 * Deactivate Color Picker in Browser.
 * @returns {string}
 */
let deactivateColorPicker = () => {
	try {
		removeDom();
		document.removeEventListener ("contextmenu", handler, false);
		return "Successfully deactivate color picker in browser! ";
	} catch (e) {
		return "Sorry, unknown error occurred.";
	}
};

// Register menu.
//(() => {
//	try {
//		mountDom();
		window.activateColorPicker = activateColorPicker;
		window.deactivateColorPicker = deactivateColorPicker;
//		return "Successfully configure the browser-color-picker."
//	} catch (e) {
//		return "Sorry, unknown error occurred in browser-color-picker.";
//	}
//})();
