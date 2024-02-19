import { Organization, Session } from "models/organizations";

export type CreateOrganizationInputs = {
  name: string;
  description: string;
}

export type GetOrganizationResponse = {
  organization: Organization;
  currentSession: Session;
}

export type CreateSessionInputs = {
  orgId: number;
  startDate: string;
  endDate: string;
}
