import { Member, Organization } from "models/organizations";
import { fetchApiResponse } from "./axios";
import { QueryObserverOptions, UseMutationOptions } from "@tanstack/react-query";
import { CreateOrganizationInputs, GetOrganizationResponse } from "./models/type";

export const ORGS = "orgs";
export const MEMBERS = "members"

export type SendMultipleWhatsappInvitationInputs = Member[];
export type SendMultipleWhatsappInvitationResponse = {
  phone: string;
  invited: boolean;
  error?: string;
}[]
export const sendMultipleWhatsappInvitation = (
  orgId: number,
  reInvitation: boolean = false,
  options: UseMutationOptions<SendMultipleWhatsappInvitationResponse, Error, SendMultipleWhatsappInvitationInputs>
) => ({
  mutationKey: [ORGS, orgId, MEMBERS, "invite"],
  mutationFn: (inputs: SendMultipleWhatsappInvitationInputs) => 
    fetchApiResponse<SendMultipleWhatsappInvitationResponse, SendMultipleWhatsappInvitationInputs>(
      `${ORGS}/${orgId}/${MEMBERS}/invite?reInvitation=${reInvitation}`,
      "POST",
      inputs
    ),
  ...options
});

export const getOrganizationQuery = (id: number, options = {}) => ({
  queryKey: [ORGS, id],
  queryFn: async () => fetchApiResponse<GetOrganizationResponse>(`${ORGS}/${id}`, "GET"),
  ...options,
});

export const getAllOrganizationsQuery = (options: QueryObserverOptions<Organization[], Error, void> = {}) => ({
  queryKey: [ORGS],
  queryFn: async () => fetchApiResponse<Organization[]>(ORGS, "GET"),
  ...options
});

export const createOrganizationMutation = (options: UseMutationOptions<number, Error, CreateOrganizationInputs>) => ({
  mutationKey: [ORGS, "create"],
  mutationFn: (inputs: CreateOrganizationInputs) => fetchApiResponse<number, CreateOrganizationInputs>(ORGS, "POST", inputs),
  ...options
});
