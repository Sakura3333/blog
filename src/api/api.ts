export enum Conf {
    CONTENT_MAPPER = 'content_mapper',
    PAGE_CONF = 'page_conf'
}
/**
 * 读取json配置文件
 */
export function getConf(conf: Conf, callback: Function) {
    fetch(`../conf/${conf}.json`).then(res => {
        res.json().then(data => {
            callback(data);
        });
    });
}

/**
 * 读取md文件
 */
export function getMdContent(fid: string, callback: Function) {
    fetch(`../md/${fid}.md`).then(res => {
        res.text().then(data => {
            callback(data);
        });
    });
}