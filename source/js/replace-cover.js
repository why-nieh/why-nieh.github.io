// 修改默认图片，改成随机图片
(() => {
    // const bgs = [
    //     '/images/cover/春.png',
    //     '/images/cover/夏.png',
    //     '/images/cover/秋.png',
    //     '/images/cover/冬.png',
    //     '/images/cover/剑客.png',
    //     '/images/cover/猫.png',
    //     '/images/cover/猫2.png',
    //     '/images/cover/海岸.png',
    //     '/images/cover/山水.png',
    // ];
    //
    // [...document.querySelectorAll('img')].filter(it => it.src?.endsWith('/images/cover/default.png')).forEach(img => {
    //     const i = Math.floor(Math.random() * bgs.length);
    //     console.log(i);
    //     img.src = bgs[i];
    // });

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
