import useAxios from "hooks/useAxios"
import { SignInInputs, SignUpInputs, UserType } from "models/auth";
import { useCallback, useMemo } from "react";

export const AUTH_USER = "user";
export const AUTH_SIGN_IN = "auth/sign-in";
export const AUTH_SIGN_UP = "auth/sign-up";

export default function useApiAuth() {
  const { fetchApiResponse } = useAxios();

  const signIn = useCallback(
    (inputs: SignInInputs) => fetchApiResponse<UserType, SignInInputs>(AUTH_SIGN_IN, "POST", inputs),
    [fetchApiResponse]
  );

  const signUp = useCallback(
    (inputs: SignUpInputs) => fetchApiResponse<UserType, SignUpInputs>(AUTH_SIGN_UP, "POST", inputs),
    [fetchApiResponse]
  );

  const getCurrentUser = useCallback(
    () => fetchApiResponse<UserType>(AUTH_USER, "GET"),
    [fetchApiResponse]
  )

  return useMemo(
    () => ({
      signUp,
      signIn,
      getCurrentUser,
    }),
    [
      signUp,
      signIn,
      getCurrentUser
    ]
  )
}
