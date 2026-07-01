(() => {
    const bgs = [
        '/images/cover/冬.png',
        '/images/cover/剑客.jpeg',
        '/images/cover/夏.png',
        '/images/cover/山水.jpeg',
        '/images/cover/春.png',
        '/images/cover/海岸.jpeg',
        '/images/cover/猫.jpeg',
        '/images/cover/猫2.jpeg',
        '/images/cover/秋.png',
    ];

    [...document.querySelectorAll('img')].filter(it=>it.src?.endsWith('/images/cover/default.png')).forEach(img => {
        const i = Math.floor(Math.random()*bgs.length);
        console.log(i);
        img.src = bgs[i];
    })

})()
