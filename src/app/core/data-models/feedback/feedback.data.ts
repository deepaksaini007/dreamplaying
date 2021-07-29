export interface FeedbackData {
    all?: AllFedbacks[];
}

export interface AllFedbacks {
    guid?:           string;
    feedback_id?:    number;
    feedback_text?:  string;
    feedback_reply?: null;
    is_replied?:     boolean;
    replied_on?:     Date;
    user_device_id?: string;
    user_email?:     string;
    is_active?:      boolean;
    created_on?:     Date;
    created_by?:     string;
    modified_on?:    Date;
    modified_by?:    string;
    user_ip?:        null;
}
