"use strict";window.addEventListener("load",function(){var e=document.querySelector("#url").innerHTML;chrome.runtime.sendMessage({type:"happyWechartGetConfig"},function(t){if(t.code){var c={},i=0;if(t.data.forEach(function(e){c[e.id]=e.selected,/timer/.test(e.id)&&e.selected&&(i=1e3*parseInt(e.id.split("-")[1])),"clickable"===e.id&&(c.clickAble=e.selected)}),c.autoYes&&setTimeout(function(){location.href=e},i),c.clickAble){var n='<a href="'+e+'">'+e+"</a>",r=document.querySelector("#url");r?r.innerHTML=n:document.querySelector("body").innerHTML=n}}})});