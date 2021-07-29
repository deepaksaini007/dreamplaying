export interface NewsData {
    [key:string]:     NewsRequestData[];
    
}

export interface NewsRequestData {
    guid?:               string;
    news_id?:            number;
    category_master_id?: number;
    news_title_en?:      string;
    news_title_hn?:      string;
    news_decription_en?: string;
    news_decription_hn?: string;
    news_credits_by_en?: string;
    news_credits_by_hn?: string;
    is_featured?:        boolean;
    image_thumbnail?:    string;
    is_published?:       boolean;
    published_on?:       null;
    is_active?:          boolean;
    created_on?:         Date;
    created_by?:         string;
    modified_on?:        Date;
    modified_by?:        string;
    user_ip?:            null;
}
