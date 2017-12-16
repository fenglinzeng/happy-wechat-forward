/*
 * @Author: @fenglinzeng
 * @Date: 2018-02-08 15:28:53
 * @Last Modified by: @fenglinzeng
 * @Last Modified time: 2018-02-08 17:40:29
 */


const defaultSetting = [
    {
        id: 'autoYes',
        selected: true
    },
    {
        id: 'autoNo',
        selected: false
    },
    {
        id: 'timer-00',
        selected: true
    },
    {
        id: 'timer-01',
        selected: false
    },
    {
        id: 'timer-03',
        selected: false
    },
    {
        id: 'clickable',
        selected: true
    }
];

if (!window.localStorage.getItem('happyWechatConfigs')) {
    window.localStorage.setItem('happyWechatConfigs', JSON.stringify(defaultSetting));
}

const util = {
    getOption() {
        return JSON.parse(window.localStorage.getItem('happyWechatConfigs'));
    },
    saveOption(opt) {
        window.localStorage.setItem('happyWechatConfigs', JSON.stringify(opt));
        return true;
    }
};

// 全局消息监听
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const actionType = request.type;
    if (actionType === 'happyWechartGetConfig') {
        const opt = util.getOption();
        sendResponse({
            code: 1,
            data: opt
        });
    } else if (actionType === 'happyWechartGetOptions') {
        const opt = util.getOption();
        sendResponse({
            code: 1,
            data: opt
        });
    } else if (actionType === 'happyWechartSetOptions') {
        const opt = request.data;
        if (util.saveOption(opt)) {
            sendResponse({
                code: 1
            });
        } else {
            sendResponse({
                code: 0
            });
        }
    }
});