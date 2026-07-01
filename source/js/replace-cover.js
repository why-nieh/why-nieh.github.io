(() => {
    const bgs = [
        '/images/cover/冬.png',
        '/images/cover/剑客.png',
        '/images/cover/夏.png',
        '/images/cover/山水.png',
        '/images/cover/春.png',
        '/images/cover/海岸.png',
        '/images/cover/猫.png',
        '/images/cover/猫2.png',
        '/images/cover/秋.png',
    ];

    [...document.querySelectorAll('img')].filter(it=>it.src?.endsWith('/images/cover/default.png')).forEach(img => {
        const i = Math.floor(Math.random()*bgs.length);
        console.log(i);
        img.src = bgs[i];
    })

})()
