export interface SurveyData {
  [key:string]:SurveyRequestData[]
}

export interface SurveyRequestData {
        guid: string;
        match_survey_id: number;
        live_match_id: number;
        category_master_id: number;
        match_title_en: string;
        match_title_hn: string;
        match_name_en: string;
        match_name_hn: string;
        match_date: Date;
        match_time: Date;
        match_location: string;
        team_left_name: string;
        team_left_logo: string;
        team_left_hit_count: number;
        team_right_name: string;
        team_right_logo?: any;
        team_right_hit_count: number;
        team_tie_hit_count: number;
        registered_email_data: string;
        is_active: boolean;
        created_on: Date;
        created_by: string;
        modified_on: Date;
        modified_by: string;
        user_ip?: any;


}

