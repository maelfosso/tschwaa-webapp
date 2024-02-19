import { UseMutationOptions } from "@tanstack/react-query";
import { CreateSessionInputs } from "./models/type";
import { fetchApiResponse } from "./axios";
import { Session } from "models/organizations";
import { ORGS } from "./organizations";

export const SESSIONS = "sessions";

export const createSessionMutation = (options: UseMutationOptions<Session, Error, CreateSessionInputs>) => ({
  mutationKey: [ORGS, SESSIONS, "create"],
  mutationFn: (inputs: CreateSessionInputs) => 
    fetchApiResponse<Session, CreateSessionInputs>(`${ORGS}/${inputs.orgId}/${SESSIONS}`, "POST", inputs),
  ...options
});
