export interface TipData {
    [key:string]: TipRequestData[];
}

export interface TipRequestData {
    guid?:               string;
    tip_id?:             number;
    category_master_id?: number;
    tip_title_en?:       string;
    tip_title_hn?:       string;
    tip_decription_en?:  string;
    tip_decription_hn?:  string;
    is_active?:          boolean;
    created_on?:         Date;
    created_by?:         string;
    modified_on?:        Date;
    modified_by?:        string;
    user_ip?:            null;
}
