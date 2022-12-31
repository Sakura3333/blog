const BaseURI = {
    config: '../config',
    articles: '../articles',
    images: '../images',
    mood: '../mood'
};
/**
 * 获取城市天气
 * @param cityCode 城市代码
 * @param callback 回调
 */
export function getWeather(cityCode: string, callback: Function) {
    fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode?cityCode:110101}&key=6acac1d4c9f903fea4ab694309ef2dd3`).then(res => {
        res.json().then(data => {
            callback(data);
        });
    });
}

/**
 * 获取页面配置信息
 * @param callback 回调
 */
export function getPageConf(callback: Function) {
    fetch(`${BaseURI.config}/page.json`).then(res => {
        res.json().then(data => {
            callback(data);
        });
    })
}

/**
 * 获取文章信息列表
 * @param callback 回调
 */
export function getArticleInfoList(callback: Function) {
    fetch(`${BaseURI.config}/article-info-list.json`).then(res => {
        res.json().then(data => {
            callback(data);
        });
    })
}

/**
 * 获取动态信息列表
 * @param callback 回调
 */
export function getMoodInfoList(callback: Function) {
    fetch(`${BaseURI.config}/mood-info-list.json`).then(res => {
        res.json().then(data => {
            callback(data);
        });
    })
}

/**
 * 获取动态内容
 * @param moodFileId 动态文件id
 * @param callback 
 */
export function getMoodByFileId(moodFileId: any, callback: Function) {
    fetch(`${BaseURI.mood}/${moodFileId}.md`).then(res => {
        res.text().then(data => {
            callback(data);
        });
    });
}

/**
 * 获取文章内容
 * @param articleFileId 文章文件id
 * @param callback 
 */
export function getAtricleByFileId(articleFileId: any, callback: Function) {
    fetch(`${BaseURI.articles}/${articleFileId}.md`).then(res => {
        res.text().then(data => {
            callback(data);
        });
    });
}