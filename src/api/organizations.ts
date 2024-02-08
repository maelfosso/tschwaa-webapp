import useAxios from "hooks/useAxios";
import { CreateOrganizationInputs, Organization } from "models/organizations";
import { useCallback, useMemo } from "react";

export const ORGS = "orgs";

export default function useApiOrganizations() {
  const { fetchApiResponse } = useAxios();

  // const getListOfOrganizations = useCallback(
  //   (inputs: SignInInputs) => fetchApiResponse<UserType, SignInInputs>(AUTH_SIGN_IN, "POST", inputs),
  //   [fetchApiResponse]
  // );

  const createOrganization = useCallback(
    (inputs: CreateOrganizationInputs) => fetchApiResponse<number, CreateOrganizationInputs>(ORGS, "POST", inputs),
    [fetchApiResponse]
  );

  const getListOfOrganizations = useCallback(
    () => fetchApiResponse<Organization[]>(ORGS, "GET"),
    [fetchApiResponse]
  )

  return useMemo(
    () => ({
      getListOfOrganizations,
      createOrganization
    }),
    [
      getListOfOrganizations,
      createOrganization
    ]
  )
}
