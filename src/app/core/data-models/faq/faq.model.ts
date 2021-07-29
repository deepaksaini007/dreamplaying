export interface FaQData {
    [key:string]: FAQRequestData[];
}


export interface FAQRequestData {
    guid?:               string;
    faq_id?:             number;
    category_master_id?: number;
    faq_title_en?:       string;
    faq_title_hn?:       string;
    faq_decription_en?:  string;
    faq_decription_hn?:  string;
    is_active?:          boolean;
    created_on?:         Date;
    created_by?:         string;
    modified_on?:        Date;
    modified_by?:        string;
    user_ip?:            string;
}
