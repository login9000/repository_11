import {
  NonStandardElement,
  NonStandardElementPhoto
} from "../../dialogs/non-standard-element-editor/non-standard-element-editor.component";

export interface OrderOutput {
  counterparty_id?: string
  is_cash_payment?:  '1' | ''
  shipping_date?: string
  shipping_warehouse_id?: string
  is_shipping?: '1' | ''
  delivery_address?: string
  delivery_address_id?: string
  is_draft?: '1' | ''
  goods?: OrderGoodsOutput[]
  goods_non_standard_addition?: NonStandardElement[]
  files_non_standard_addition?: NonStandardElementPhoto[]
  comment?: string
  is_after_editing?: any
  draft_id?: any
  based_on_cart?: string
}
export interface OrderGoodsOutput {
  id_nomenclature_type?: string
  id_nomenclature?: string
  length?: string
  quantity?:number
  bonus_percentage?:number
}
