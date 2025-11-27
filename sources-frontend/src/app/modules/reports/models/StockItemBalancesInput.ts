export interface StockItemBalancesInput {
  response: {
    date: string,
    shipment_warehouses: {
      data: {
        СкладИД: string
        Наименование: string
        Аббревиатура: string
        СкладНекондиции: boolean
      }[]
    },
    products: {
      [key: string]: string[]
    },
    list_profiles: string[],
    list_thickness: string[],
    list_coating: string[],
    list_colors: string[],
    cart_info: {
      data: CartInfo
    }
  }
}

export interface CartInfo {
  number_of_positions: number,
  total_sum: number
  target?: string
}
