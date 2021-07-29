export interface UserData {
    guid?:                string;
    user_id?:             number;
    user_first_name_elm?: string;
    user_last_name?:      string;
    user_gender?:         string;
    user_email_elm?:      string;
    user_phone_elm?:      string;
    last_login_datetime?: Date | null;
    user_login_elm?:      null | string;
    user_pass_elm?:       string;
    user_auth_code?:      string;
    user_status?:         string;
    user_role?:           string;
    display_name?:        string;
    registered_on?:       Date;
    profile_pic?:         null;
    assigned_menu?:       string;
    is_active?:           boolean;
    created_on?:          Date;
    created_by?:          string;
    modified_on?:         Date;
    modified_by?:         string;
    user_ip?:             string;
}
