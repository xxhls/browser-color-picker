/**
 * @Project: browser-color-picker
 * @File: src/components/popup.ts
 * @Author: heyq <heyq020814@qq.com>
 * @Date: 2023-12月-周二 23:39:34
 */

import hexToRgb from "@src/utils/hexToRgb";

const applyStyle = (dom: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
	for (const prop in style) {
		if (style[prop]) {
			dom.style[prop] = style[prop] as string;
		}
	}
};

const Popup = (hex: string, handler: () => void, X: number, Y: number) => {
	const container = document.createElement("div");
	const containerStyle: Partial<CSSStyleDeclaration> = {
		width: "350px",
		height: "140px",
		padding: "16px 28px 20px 28px",
		display: "flex",
		backgroundColor: "#FAFAFC",
		border: "1px solid #EDEDED",
		borderRadius: "24px",
		position: "fixed",
		left: `${X}px`,
		top: `${Y}px`,
		zIndex: "9999"
	};
	const handleClickOutside = (e: Event) => {
		if (!container.contains(e.target as Node)) {
			container.remove();
			document.removeEventListener("click", handleClickOutside);
		}
	};
	const handleRClickOutside = (e: Event) => {
		if (!container.contains(e.target as Node)) {
			container.remove();
			document.removeEventListener("contextmenu", handleRClickOutside);
		}
	}
	document.addEventListener("click", handleClickOutside);
	document.addEventListener("contextmenu", handleRClickOutside);
	applyStyle(container, containerStyle);
	
	const colorShow = document.createElement("div");
	const colorShowStyle: Partial<CSSStyleDeclaration> = {
		width: "140px",
		borderRadius: "32px",
		border: "2px solid #EDEDED",
		backgroundColor: hex
	};
	applyStyle(colorShow, colorShowStyle);
	container.appendChild(colorShow);
	
	const data = document.createElement("div");
	const dataStyle: Partial<CSSStyleDeclaration> = {
		display: "flex",
		flexGrow: "1",
		flexDirection: "column",
		justifyContent: "space-between",
		marginLeft: "16px"
	};
	applyStyle(data, dataStyle);
	container.appendChild(data);
	
	const pStyle: Partial<CSSStyleDeclaration> = {};
	const data_hex = document.createElement("p");
	data_hex.innerHTML = `HEX: ${hex.toUpperCase()}`;
	applyStyle(data_hex, pStyle);
	data.appendChild(data_hex);
	
	const copy_btn_style: Partial<CSSStyleDeclaration> = {
		outline: "none",
		borderWidth: "0px",
		backgroundColor: "#DBEBFD",
		color: "#209DF5",
		fontSize: "14px",
		height: "34px",
		lineHeight: "34px",
		padding: "0 18px",
		borderRadius: "4px",
		cursor: "pointer"
	};
	const copy_btn__hex = document.createElement("button");
	copy_btn__hex.innerText = "点此复制十六进制颜色值";
	data.appendChild(copy_btn__hex)
	applyStyle(copy_btn__hex, copy_btn_style);
	copy_btn__hex.addEventListener("click", () => {
		window.navigator.clipboard.writeText(hex.toUpperCase()).then(() => {
			copy_btn__hex.innerText = "复制成功";
			copy_btn__hex.style.backgroundColor = "#DAF0E4";
			copy_btn__hex.style.color = "#18A058";
		});
	});
	
	const data_rgb = document.createElement("p");
	data_rgb.innerHTML = `RGB: (${hexToRgb(hex)})`;
	applyStyle(data_rgb, pStyle);
	data.appendChild(data_rgb);
	
	const copy_btn__rgb = document.createElement("button");
	copy_btn__rgb.innerText = "点此复制RGB颜色值";
	data.appendChild(copy_btn__rgb)
	applyStyle(copy_btn__rgb, copy_btn_style);
	copy_btn__rgb.addEventListener("click", () => {
		window.navigator.clipboard.writeText(hexToRgb(hex)).then(() => {
			copy_btn__rgb.innerText = "复制成功";
			copy_btn__rgb.style.backgroundColor = "#DAF0E4";
			copy_btn__rgb.style.color = "#18A058";
		});
	});
	
	const exit = document.createElement("button");
	exit.innerText = "关闭插件";
	exit.addEventListener("click", () => {
		container.remove();
		handler();
	});
	const exitStyle: Partial<CSSStyleDeclaration> = {
		position: "absolute",
		right: "28px",
		top: "16px",
		outline: "none",
		borderWidth: "0px",
		backgroundColor: "#FDF0DB",
		color: "#F5B220",
		fontSize: "12px",
		height: "22px",
		lineHeight: "22px",
		padding: "0 6px",
		borderRadius: "3px",
		cursor: "pointer"
	};
	applyStyle(exit, exitStyle);
	container.appendChild(exit);
	
	document.body.appendChild(container);
};

export default Popup;
