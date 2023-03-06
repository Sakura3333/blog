/**
 * 页面配置
 */
export interface PageConf {

}

/**
 * 映射记录
 */
export interface ContentMapperRecord {
    fid: string,
    imgs: string[],
    title: string,
    brief: string,
    author: string,
    date: string,
    time: string,
    tags: string[],
    schema: 1|2
}

/**
 * 数据集
 */
export interface DataSet {
    articles: ContentMapperRecord[],
    moods: ContentMapperRecord[],
    tagList: {name: string, count: number}[],
    pageConf?: PageConf
}