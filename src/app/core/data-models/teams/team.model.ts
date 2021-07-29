export interface TeamData {
    [key:string]:TeamRequestData[]
}

export interface TeamRequestData {
    guid?:               string;
    team_id?:            number;
    category_master_id?: number;
    team_name?:          string;
    team_logo?:          string;
    is_active?:          boolean;
    created_on?:         Date;
    created_by?:         string;
    modified_on?:        Date;
    modified_by?:        string;
    user_ip?:            null;
}
