import useAxios from "hooks/useAxios";
import { Organization } from "models/organizations";
import { useCallback, useMemo } from "react";

export const ORGS = "orgs";

export default function useApiOrganizations() {
  const { fetchApiResponse } = useAxios();

  // const getListOfOrganizations = useCallback(
  //   (inputs: SignInInputs) => fetchApiResponse<UserType, SignInInputs>(AUTH_SIGN_IN, "POST", inputs),
  //   [fetchApiResponse]
  // );

  // const signUp = useCallback(
  //   (inputs: SignUpInputs) => fetchApiResponse<UserType, SignUpInputs>(AUTH_SIGN_UP, "POST", inputs),
  //   [fetchApiResponse]
  // );

  const getListOfOrganizations = useCallback(
    () => fetchApiResponse<Organization[]>(ORGS, "GET"),
    [fetchApiResponse]
  )

  return useMemo(
    () => ({
      getListOfOrganizations
    }),
    [
      getListOfOrganizations
    ]
  )
}
