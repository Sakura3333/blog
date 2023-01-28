/**
 * 网站全局配置
 */
export interface GlobalConf {
    startTime: string;
    background: string[];
    article: {
        footerCard: {
            commend: string,
            content: string,
            caption: string,
            background: string
        }
    };
    header: {
        logo: string,
        headPhoto: string
    }
}
/**
 * 文章标签
 */
export interface ArticleTag {
    tagName: string;
    tagCount: number
}
/**
 * 文章信息
 */
export interface ArticleMapperRecord {
    articleCover: string;
    articleFileId: string;
    articleTitle: string;
    articleBrief: string;
    articleAuthor: string;
    articleCreateTime: string;
    articleTag: string[];
}
/**
 * 动态信息
 */
export interface MoodMapperRecord {
    moodFileId: string;
    moodImages: string[];
    moodContentHtml: string;
    moodCreateTime: string;
}
/**
 * 归档
 */
export interface Filing {
    filingTime: string;
    filingCount: number;
}
/**
 * 全局状态
 */
export interface GlobalState{
    // 文章信息列表
    articleInfoList: ArticleMapperRecord[];
    // 搜索结果
    searchInfoList: ArticleMapperRecord[];
    // 标签列表
    articleTagList: ArticleTag[];
    // 动态列表
    moodInfoList: MoodMapperRecord[];
    // 全局配置
    globalConf: GlobalConf | null;
}