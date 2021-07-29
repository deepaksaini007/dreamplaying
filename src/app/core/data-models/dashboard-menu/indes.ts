export interface DashboardMenu {
    guid?:        string;
    menu_id?:     number;
    menu_name?:   string;
    menu_icon?:   string;
    menu_url?:    string;
    is_active?:   boolean;
    created_on?:  Date;
    created_by?:  string;
    modified_on?: Date;
    modified_by?: string;
    user_ip?:     string;
}

