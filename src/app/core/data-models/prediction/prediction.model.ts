export interface PredictionData {
    [key:string]:PredictionRequestData[]
}

export interface PredictionRequestData {
    guid?:                         string;
    match_prediction_id?:          number;
    category_master_id?:           number;
    match_title_en?:               string;
    match_title_hn?:               null;
    match_name_en?:                string;
    match_name_hn?:                null;
    match_date?:                   Date;
    match_time?:                   Date;
    match_location?:               string;
    team_left_name?:               string;
    team_left_logo?:               string;
    team_right_name?:              string;
    team_right_logo?:              string;
    preview_text_en?:              null | string;
    preview_text_hn?:              null | string;
    has_preview?:                  boolean;
    preview_added_on?:             Date | null;
    has_prediction?:               boolean;
    prediction_added_on?:          Date | null;
    prediction_added_from_mac_id?: null;
    prediction_image_url?:         string;
    is_active?:                    boolean;
    created_on?:                   Date;
    created_by?:                   string;
    modified_on?:                  Date;
    modified_by?:                  string;
    user_ip?:                      null;
}
