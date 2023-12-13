/**
 * @Project: browser-color-picker
 * @File: src/utils/hex2rgb.ts
 * @Author: heyq <heyq020814@qq.com>
 * @Date: 2023-12月-周三 13:39:40
 */

const hexToRgb = (hex: string) => {
	hex = hex.substring(1, hex.length);
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `${r}, ${g}, ${b}`;
}

export default hexToRgb;
