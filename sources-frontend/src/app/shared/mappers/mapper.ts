export interface Mapper<R, E> {
  mapRuToEng(ru: R): E;
  mapEngToRU(eng: E): R;
}
