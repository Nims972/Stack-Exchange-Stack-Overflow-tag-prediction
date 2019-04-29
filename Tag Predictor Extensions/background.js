//console.log("back");
chrome.browserAction.onClicked.addListener(extensionenabled)

function extensionenabled(tab){
	let msg = {
		txt:"search"
	}
	chrome.tabs.sendMessage(tab.id,msg);
	//console.log("back");
}