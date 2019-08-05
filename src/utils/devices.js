const sizes = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 600,
    tablet: 800,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560
};

export default Object.keys(sizes).reduce((acc, label) => {
    acc[label] = `(max-width: ${sizes[label]}px)`;
    return acc;
}, {});
