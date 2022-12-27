export interface Tag {
    tagName: string;
    tagCount: number
}

export interface ArticleInfo {
    articleCover: string;
    articleCoverURL: string;
    articleFileId: string;
    articleTitle: string;
    articleBrief: string;
    articleAuthor: string;
    articleCreateTime: string;
    articleTag: string[];
}

export interface MoodInfo {
    moodFileId: string;
    moodImages: string[];
    moodContentHtml: string;
    moodImageURLList: string[];
    moodCreateTime: string;
}

export interface PageConfig {
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
}

export interface Filing {
    filingTime: string;
    filingCount: number;
}

export interface GlobalState{
    // 页面标题
    title: string,
    // 是否显示回退按钮
    showBackBtn: boolean,
    // 是否处在文章中
    inArticle: boolean,
    // 文章信息
    articleInfo: ArticleInfo | null,
    // 文章信息列表
    articleInfoList: ArticleInfo[],
    // 标签列表
    articleTagList: Tag[],
    // 归档
    filingList: Filing[]
    // 页面配置
    page: PageConfig | null
}