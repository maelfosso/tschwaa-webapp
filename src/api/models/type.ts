import { Organization, Session } from "models/organizations";

export type CreateOrganizationInputs = {
  name: string;
  description: string;
}

export type GetOrganizationResponse = {
  organization: Organization;
  currentSession: Session;
}
