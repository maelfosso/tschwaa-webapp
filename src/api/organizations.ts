import { Organization } from "models/organizations";
import { fetchApiResponse } from "./axios";
import { QueryObserverOptions, UseMutationOptions } from "@tanstack/react-query";
import { CreateOrganizationInputs, GetOrganizationResponse } from "./models/type";

export const ORGS = "orgs";

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
