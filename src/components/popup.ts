/**
 * @Project: browser-color-picker
 * @File: src/components/popup.ts
 * @Author: heyq <heyq020814@qq.com>
 * @Date: 2023-12月-周二 23:39:34
 */

const applyStyle = (dom: HTMLElement, style: Partial<CSSStyleDeclaration>) => {
	for (const prop in style) {
		if (style[prop]) {
			dom.style[prop] = style[prop] as string;
		}
	}
};

const Popup = (hex: string, handler: (dom: HTMLElement) => void) => {
	const container = document.createElement("div");
	const containerStyle: Partial<CSSStyleDeclaration> = {
		width: "200px",
		height: "100px",
		backgroundColor: hex
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
	
	const data_hex = document.createElement("p");
	data_hex.innerText = hex;
	container.appendChild(data_hex);
	data_hex.addEventListener("click", (e) => {
		window.navigator.clipboard.writeText(hex).then(() => {
			console.log("成功复制到剪贴板");
		});
	})
	
	const exit = document.createElement("button");
	exit.innerText = "退出";
	exit.addEventListener("click", () => {
		handler(container);
	});
	container.appendChild(exit);
	
	document.body.appendChild(container);
};

export default Popup;
