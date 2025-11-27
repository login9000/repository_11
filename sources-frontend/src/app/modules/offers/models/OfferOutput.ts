export interface OfferOutput {
  act: string,
  draft_id: string,
  commercial_offer_id?: string,
  recipient_of_the_commercial_offer: string,
  markup_type: 'manual' | 'edit_commercial_offer',
  markup_percentage: number,
  comment: string
  commercial_offer_amount: string
  is_print: '1' | ''
  goods: {
    id_nomenclature: string
    name_nomenclature: string
    length: string
    unit: string
    quantity: string
    total: string
    price: string
    sum: string
    total_amount: string
    discount: string
    bonus: string
    its_own_price?: string
  }[]
}
