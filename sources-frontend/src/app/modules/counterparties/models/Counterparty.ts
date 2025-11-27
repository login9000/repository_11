export interface Counterparty {
  counterparty_id: string;
  application_id: string;
  fullname: string;
  inn: string;
  kpp: string;
  ogrn: string;
  legal_address: string;
  actual_address: string;
  corr_account: string;
  bank_bik: string;
  bank_inn?: string;
  bank_name: string;
  checking_account: string;
  bonus_percentage?: number;
  id_delivery_addresses?: string
  is_confirmed?: '1' | '';
}
