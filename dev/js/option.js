chrome.runtime.sendMessage({
    type: 'happyWechartGetOptions'
}, res => {
    if (res.code) {
        const opts = res.data;
        opts.forEach(element => {
            document.getElementById(element.id).checked = element.selected;
        });
    }
});

const happyWechart = {
    saveConfig(data) {
        chrome.runtime.sendMessage({
            type: 'happyWechartSetOptions',
            data: data
        }, res => {
            if (res.code) {
                alert('成功');
            } else {
                alert('失败');
            }
        });
    }
};

window.addEventListener('load', () => {
    const submit = document.querySelector('#submit');
    if (submit) {
        submit.addEventListener('click', () => {
            const input = document.querySelectorAll('input');
            const arr = [];
            input.forEach(ele => {
                arr.push({
                    id: ele.id,
                    selected: ele.checked
                });
            });
            happyWechart.saveConfig(arr);
        });
    }
});