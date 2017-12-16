window.addEventListener('load', () => {
    const url = document.querySelector('#url').innerHTML;
    chrome.runtime.sendMessage({
        type: 'happyWechartGetConfig'
    }, res => {
        if (res.code) {
            const obj = {};
            let second = 0;
            res.data.forEach(el => {
                obj[el.id] = el.selected;
                if (/timer/.test(el.id)) {
                    if (el.selected) {
                        second = parseInt(el.id.split('-')[1]) * 1000;
                    }
                }
                if (el.id === 'clickable') {
                    obj.clickAble = el.selected;
                }
            });
            // 如果自动跳转
            if (obj.autoYes) {
                setTimeout(() => {
                    location.href = url;
                }, second);
            }
            // 如果可点击
            if (obj.clickAble) {
                const linkHTML = `<a href="${url}">${url}</a>`;
                const link = document.querySelector('#url');
                if (link) {
                    link.innerHTML = linkHTML;
                } else {
                    document.querySelector('body').innerHTML = linkHTML;
                }
            }
        }
    });
});