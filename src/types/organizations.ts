export interface RegisterOrganizationData {
  user: {
    email: string;
    name: string;
    surname: string;
    middle_name: string;
    password: string;
  };
  organization: {
    name: string;
    logo: string;
    tariff: {
      id: number;
    };
  };
}

export interface Department {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
}
