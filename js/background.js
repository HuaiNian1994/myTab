//�����򿪰ٶ�
chrome.browserAction.onClicked.addListener(function (tab) {
    var jumpto_url = "javascript:window.open('https://www.baidu.com')";
    chrome.tabs.update(tab.id, {url: jumpto_url});
});