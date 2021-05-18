import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Superman', family: 'DC', type: 'Heroe' },
      { id: 1, name: 'Batman', family:  'DC', type: 'Heroe'},
      { id: 2, name: 'Aquaman', family: 'DC', type: 'Heroe' },
      { id: 3, name: 'Flash', family: 'DC', type: 'Heroe' },
      { id: 4, name: 'Spiderman', family: 'Marvel', type: 'Heroe' },
      { id: 5, name: 'Capitan America', family: 'Marvel', type: 'Heroe' },
      { id: 6, name: 'IronMan', family: 'Marvel', type: 'Heroe' },
      { id: 7, name: 'Capitana Marvel', family: 'Marvel', type: 'Heroe' },
      { id: 8, name: 'Doctor Extraño', family: 'Marvel', type: 'Heroe' },
      { id: 9, name: 'Lex Luthor', family: 'DC', type: 'Villano' },
      { id: 10, name: 'Joker', family: 'DC', type: 'Villano' },
      { id: 11, name: 'Manta Raya', family: 'DC', type: 'Villano' },
      { id: 12, name: 'Darkseid', family: 'DC', type: 'Villano' },
      { id: 13, name: 'Duende Verde', family: 'Marvel', type: 'Villano' },
      { id: 14, name: 'Craneo Rojo', family: 'Marvel', type: 'Villano' },
      { id: 15, name: 'Thanos', family: 'Marvel', type: 'Villano' },
      { id: 16, name: 'Ultron', family: 'Marvel', type: 'Villano' }
    ];
    return { heroes };
  }
}