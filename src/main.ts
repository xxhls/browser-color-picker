import Popup from "@src/components/popup";
import zh_CN from "@src/locale/zh-CN";
import en from "@src/locale/en";

(() => {
	
	const language = navigator.language;
	let languagePack = en
	if (language === "zh-CN") {
		languagePack = zh_CN
	}
	
	const handler = async (e: MouseEvent) => {
		// 拦截默认右键菜单
		e.preventDefault();
		// 实例化EyeDropper
		const eyeDropper = new window.EyeDropper();
		// 吸取颜色
		try {
			const result = (await eyeDropper.open()) as {sRGBHex: string};
			const color_hex = result.sRGBHex;
			// 弹出层
			Popup(color_hex, () => {
				deactivateColorPicker();
			}, e.clientX, e.clientY);
		} catch (e) {
			console.log(languagePack.cancel);
		}
	};
	
	// 激活插件
	const activateColorPicker = () => {
		if (window.hasOwnProperty("EyeDropper")) {
			document.addEventListener("contextmenu", handler, false);
			console.log(languagePack.activate);
			return "";
		} else {
			console.warn(languagePack.fail);
			return ""
		}
	}
	
	// 注销插件
	const deactivateColorPicker = () => {
		document.removeEventListener("contextmenu", handler, false);
		console.log(languagePack.deactivate);
		return "";
	}
	
	window.activateColorPicker = activateColorPicker;
	window.deactivateColorPicker = deactivateColorPicker;
})();
