export interface CreateOrganizationInputs {
  name: string;
  description: string;
}

export interface Organization {
  id: number;
  code: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
}
