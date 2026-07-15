// 修改默认图片，改成随机图片
(() => {

    [...document.querySelectorAll('article.post-content>p')].forEach(el => {
        setTimeout(() => el.innerHTML = '&emsp;&emsp;' + el.innerHTML, 0);
    });

    [...document.querySelectorAll('.recent-post-item .article-title')].forEach(el => {
        setTimeout(()=>el.style.fontSize = '1.2em', 0);
    });

    [...document.querySelectorAll('.toc .toc-text')].forEach(el => {
        setTimeout(()=>el.style.fontSize = '16px', 0);
    });
})();
