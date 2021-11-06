import {InMemoryDbService} from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const users = [
      {firstName: 'Stanislav', lastName: 'Zheynov', fatherName: 'Arturovich', id: 1, cars: [
          {stateNumber: 'AE5548BG', brandName: 'Lanos', modelName: 'Deo', yearProduction: 2006},
          {stateNumber: 'AE3344AS', brandName: 'Lanos', modelName: 'Deo', yearProduction: 2006}]
      },
      {firstName: 'Max', lastName: 'Rudenko', fatherName: 'Vitalievich', id: 2, cars: [
          {stateNumber: 'AD3001GK', brandName: 'Opel', modelName: 'Nextra', yearProduction: 2012}]
      }
    ];
    return {users};
  }
}
