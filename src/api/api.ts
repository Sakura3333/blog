import { Conf, Dir } from "../model/enum";

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
 * 获取配置信息
 * @param callback 回调
 */
export function getConf(conf: Conf, callback: Function) {
    fetch(`../${Dir.CONF}/${conf}.json`).then(res => {
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
export function getFileContentByFileId(dir: Dir, fileId: string | string[], callback: Function) {
    if (fileId instanceof Array) {
        fileId.forEach(fi => {
            fetch(`../${dir}/${fi}.md`).then(res => {
                res.text().then(data => {
                    callback(data);
                });
            });
        })
    } else {
        fetch(`../${dir}/${fileId}.md`).then(res => {
            res.text().then(data => {
                callback(data);
            });
        });
    }
}