import { UserType } from "models/type";
import { useEffect, useMemo, useState } from "react";
import { TError } from "./useAxios";
import useApiAuth, { AUTH_USER } from "api/auth";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentUser() {
  const { getCurrentUser } = useApiAuth();
  const [currentUser, setCurrentUser] = useState<UserType|null>(null);

  const {isPending: isPendingCurrentUser, isError, data, error }  = useQuery<UserType, TError>({
    queryKey: [AUTH_USER],
    queryFn: getCurrentUser
  });

  useEffect(() => {
    if (data) {
      setCurrentUser(data)
    }
  }, [data])

  return useMemo(() => ({
    currentUser,
    setCurrentUser,
    isPendingCurrentUser,
    isError,
    error
  }), [currentUser, error, isError, isPendingCurrentUser]);
}
