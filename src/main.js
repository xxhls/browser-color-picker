/**
 * @Project: browser-color-picker
 * @File: src/main.js
 * @Author: heyq <heyq020814@qq.com>
 * @Date: 2023-12月-周二 14:52:55
 * @Description: This is a piece of default text
 *
 * Copyright © 2023 heyq. All Rights Reserved.
 *
 * Licensed under the MIT License.
 * See https://mit-license.org/ for more information.
 */

/**
 * Handler of onContextmenu
 * @param {MouseEvent} e
 * @returns {Promise<void>}
 */
const handler = async (e) => {
	// Block the default handler.
	e.preventDefault();
	
	// Popup to show the color.
	const popup = document.createElement("div");
	popup.style.width = "100px";
	popup.style.height = "100px";
	popup.style.backgroundColor = "grey";
	popup.style.position = "fix";
	
	const eyeDropper = new window.EyeDropper();
	try {
		const result = await eyeDropper.open() // 开始拾取颜色
		console.log("The color is: " + result.sRGBHex)
		const p = document.createElement("p");
		p.innerText = result.sRGBHex;
		popup.appendChild(p);
		const div = document.createElement("div");
		div.style.width = "10px";
		div.style.height = "10px";
		div.style.backgroundColor = result.sRGBHex;
		popup.appendChild(div);
		document.body.appendChild(popup);
	} catch (e) {
		console.log("Cancel");
	}
}


const activateColorPicker = () => {
	try {
		document.addEventListener ("contextmenu", handler, false);
		return "Successfully Activate Color Picker in Browser! ";
	} catch (e) {
		return "Sorry, unknown error occurred.";
	}
};
const deactivateColorPicker = () => {
	try {
		document.removeEventListener ("contextmenu", handler, false);
		return "Successfully Deactivate Color Picker in Browser! ";
	} catch (e) {
		return "Sorry, unknown error occurred.";
	}
};

window.activateColorPicker = activateColorPicker;
window.deactivateColorPicker = deactivateColorPicker;

export default {};
