export interface CarOwner {
  firstName: string;
  lastName: string;
  fatherName: string;
  cars: CarEntity[];
  id?: number;
}

export interface CarEntity {
  stateNumber: any;
  brandName: string;
  modelName: string;
  yearProduction: number;
}
