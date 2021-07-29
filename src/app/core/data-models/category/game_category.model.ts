export interface CategoryMaster {
    [key:string]:   CategoryRequestData[];
}


export interface CategoryRequestData {
    guid?:                string;
    category_master_id?:  number;
    cat_type?:            string;
    cat_display_name_en?: string;
    cat_display_name_hn?: string;
    category_url ?:       string;
    category_image ?:    string;
    is_active?:           boolean;
    created_on?:          Date;
    created_by?:          string;
    modified_on?:         Date;
    modified_by?:         string;
    user_ip?:             string|undefined;
}
