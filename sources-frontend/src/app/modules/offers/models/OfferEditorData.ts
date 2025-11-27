export interface OfferEditorData {
  response: {
    draft_details: {
      data: {
        documentAmount: number
        weight?: number
        reserves: OfferReserve[]
      }
    }
  }
  error: any
}

export interface OfferReserve {
  nomenclatureID: string
  nomenclatureName: string
  characteristic: string
  quantity: number
  bonusPercentage: number
  price: number
  amount: number
  amountWithMarkup: number
  markupDiscountPercentage: number
  unitOfMeasurementName: string
  piecesPerSet: number
  quantityConversionFactor: number
  fillCharacteristic: boolean
  soldInSets: boolean
  total: number
  ownPrice?: number
}
