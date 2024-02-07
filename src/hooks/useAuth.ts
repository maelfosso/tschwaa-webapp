import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import { SignInInputs, SignUpInputs, UserType } from "models/type";
import { useNavigate } from "react-router-dom";
import { TError, processError } from "./useAxios";
import useApiAuth, { AUTH_USER } from "api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUserContext();
  const [error, setError] = useState<string>("");
  const { signIn: _signIn, signUp: _signUp, getCurrentUser } = useApiAuth()

  const {data: currentUser, error: errorOnCurrentUser, refetch: refetchCurrentUser }  = useQuery<UserType, TError>({
    queryKey: [AUTH_USER],
    queryFn: getCurrentUser,
    enabled: false,
  })

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
      navigate("/orgs");
    }
  }, [currentUser, navigate, setCurrentUser]);

  useEffect(() => {
    if (errorOnCurrentUser) {
      setError(errorOnCurrentUser.error)
    }
  }, [errorOnCurrentUser])

  const { mutate: mutateSignIn } = useMutation({
    mutationFn: _signIn,
    onSuccess: (data: UserType) => {
      console.log("sign-in success: ", data);
      setCurrentUserContext();
    },
    onError: (error: Error) => {
      console.log("sign-in error: ", processError(error));
      setError(processError(error).error)
    }
  });

  const { mutate: mutateSignUp } = useMutation({
    mutationFn: _signUp,
    onSuccess: (data: UserType) => {
      console.log("sign-up success: ", data);
      setCurrentUserContext();
    },
    onError: (error: Error) => {
      console.log("sign-up error: ", processError(error));
      setError(processError(error).error)
    }
  });

  const setCurrentUserContext = async () => {
    refetchCurrentUser();
  }

  const signUp = async (signUpInputs: SignUpInputs) => {
    mutateSignUp(signUpInputs);
  }

  const signIn = async (signInInputs: SignInInputs) => {
    mutateSignIn(signInInputs);
  }

  return {
    signUp, 
    signIn,
    error
  }
}