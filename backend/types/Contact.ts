export interface BasicContact {
  id: number;
}

export interface Contact extends BasicContact {
  nume: string;
  prenume: string;
  email?: string;
  data_adaugare?: Date;
  mesaj: string;
}