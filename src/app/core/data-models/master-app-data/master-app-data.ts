export interface MasterAppData {
  all?: AllMasterAppData[];
}

export interface AllMasterAppData {
  guid?: string;
  app_data_id?: number;
  app_name?: string;
  package_name?: string;
  advertisement_id?: string;
  banner_id?: string;
  banner_id1?: string;
  interstitial_id?: string;
  console_id?: string;
  console_password?: string;
  contact_phone?: string;
  contact_email?: string;
  native_add_id?: string;
  app_logo_drive_link?: string;
  privacy_policy_site_link?: string;
  status?: string;
  published_on?: null;
  click_count?: number;
  is_active?: boolean;
  created_on?: Date;
  created_by?: string;
  modified_on?: Date;
  modified_by?: string;
  user_ip?: null;
}
