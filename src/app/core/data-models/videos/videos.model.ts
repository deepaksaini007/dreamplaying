export interface VideoData {
    [key:string]:     VideoRequestData[];
    
}

export interface VideoRequestData {
    guid?:                string;
    video_id?:            number;
    category_master_id?:  number;
    video_title_en?:      string;
    video_title_hn?:      string;
    video_decription_en?: string;
    video_decription_hn?: string;
    video_url?:           string;
    is_published?:        boolean;
    published_on?:        Date;
    is_featured?:         boolean;
    image_thumbnail?:     null;
    is_active?:           boolean;
    created_on?:          Date;
    created_by?:          string;
    modified_on?:         Date;
    modified_by?:         string;
    user_ip?:             null;
}
