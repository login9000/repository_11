export interface LeftoverMetal {
  response: {
    date: string;
    data: LeftoverMetalData[];
  };
}

export interface LeftoverMetalData {
  thickness: number;
  colorID: string;
  quantity: string;
  quantityInKg: number;
}

export interface __LeftoverMetal {
  response: {
    Дата: string;
    Данные: __LeftoverMetalData[];
  };
}

export interface __LeftoverMetalData {
  Толщина: number;
  ЦветИД: string;
  Количество: string;
  КоличествоВКг: number;
}
