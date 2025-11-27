export interface SessionConfig {
  user_myid?: string
  phone?: string
  email?: string
  status?: string
  fio?: string
  photo?: string
  manager_fio?: string
  manager_email?: string
  manager_id?: string
  max_file_size_for_manager?: number
  max_file_size_for_non_standard_addition?: number
  max_file_size_photo?: number
  is_not_enter_verify_code?: boolean
  delegation_fio?: string
  delegation_user_myid?: string
  csrf_token?: string
  server_rsa_pubkey?: string
  product_catalog_time_modify?: number
}
 export interface SessionConfigResponse {
  response: SessionConfig
 }
