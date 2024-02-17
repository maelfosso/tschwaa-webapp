export type Organization = {
  id: number;
  code: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
}

export type Session = {
  id: number;
  startDate: Date;
  endDate: Date;
  inProgress: true;
  organizationID: number;
}
