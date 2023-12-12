(function () {
	
	function activateColorPicker () {
		console.log("被激活了");
	}
	
	function deactivateColorPicker () {
		console.log("被注销了");
	}
	
	window.activateColorPicker = activateColorPicker;
	window.deactivateColorPicker = deactivateColorPicker;
})();
