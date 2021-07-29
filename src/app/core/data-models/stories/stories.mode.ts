export interface StoryData {
    [key:string]:     StoryRequestData[];
}



export interface StoryRequestData {
    guid?:                string;
    story_id?:            number;
    category_master_id?:  number;
    story_title_en?:      string;
    story_title_hn?:      string;
    story_decription_en?: string;
    story_decription_hn?: string;
    story_credits_by_en?: string;
    story_credits_by_hn?: string;
    is_featured?:         boolean;
    image_thumbnail?:     string;
    is_published?:        boolean;
    published_on?:        null;
    is_active?:           boolean;
    created_on?:          Date;
    created_by?:          string;
    modified_on?:         Date;
    modified_by?:         string;
    user_ip?:             null;
}
