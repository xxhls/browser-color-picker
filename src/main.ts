import Popup from "@src/components/popup";

(() => {
	
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
			});
		} catch (e) {
			console.log("取消本次拾取。");
		}
	};
	
	// 激活插件
	const activateColorPicker = () => {
		if (window.hasOwnProperty("EyeDropper")) {
			document.addEventListener("contextmenu", handler, false);
			console.log("被激活了！");
			return "";
		} else {
			console.warn("对不起，当前浏览器版本过低，请升级最新版本。");
			return ""
		}
	}
	
	// 注销插件
	const deactivateColorPicker = () => {
		document.removeEventListener("contextmenu", handler, false);
		console.log("被注销了!");
		return "";
	}
	
	window.activateColorPicker = activateColorPicker;
	window.deactivateColorPicker = deactivateColorPicker;
})();
