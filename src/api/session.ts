import { QueryObserverOptions, UseMutationOptions } from "@tanstack/react-query";
import { CreateSessionInputs } from "./models/type";
import { fetchApiResponse } from "./axios";
import { MemberOfSession, Session } from "models/organizations";
import { ORGS } from "./organizations";

export const SESSIONS = "sessions";

export const createSessionMutation = (options: UseMutationOptions<Session, Error, CreateSessionInputs>) => ({
  mutationKey: [ORGS, SESSIONS, "create"],
  mutationFn: (inputs: CreateSessionInputs) => 
    fetchApiResponse<Session, CreateSessionInputs>(`${ORGS}/${inputs.orgId}/${SESSIONS}`, "POST", inputs),
  ...options
});


export const getMembersOfSession = (orgId: number, sessionId: number, options: QueryObserverOptions<MemberOfSession[], Error, void> = {}) => ({
  queryKey: [ORGS, orgId, SESSIONS, sessionId, "GET"],
  queryFn: async () =>
    fetchApiResponse<MemberOfSession[]>(`${ORGS}/${orgId}/${SESSIONS}/${sessionId}/members`, "GET"),
  ...options
});


export type UpdateAllMembersOfSessionInputs = {
  membershipIds: number[];
}
export const updateAllMembersOfSession = (orgId: number, sessionId: number, options: UseMutationOptions<MemberOfSession[], Error, UpdateAllMembersOfSessionInputs>) => ({
  mutationKey: [ORGS, orgId, SESSIONS, sessionId, "PATCH"],
  mutationFn: (inputs: UpdateAllMembersOfSessionInputs) => 
    fetchApiResponse<MemberOfSession[], UpdateAllMembersOfSessionInputs>(
      `${ORGS}/${orgId}/${SESSIONS}/${sessionId}/members`,
      "PATCH",
      inputs
    ),
  ...options
});


export type AddMemberToSessionInputs = {
  membershipId: number;
}
export const addMemberToSession = (orgId: number, sessionId: number, options: UseMutationOptions<number, Error, AddMemberToSessionInputs>) => ({
  mutationKey: [ORGS, orgId, SESSIONS, sessionId, "POST"],
  mutationFn: (inputs: AddMemberToSessionInputs) => 
    fetchApiResponse<number, AddMemberToSessionInputs>(
      `${ORGS}/${orgId}/${SESSIONS}/${sessionId}/members`,
      "POST",
      inputs
    ),
  ...options
});

export type RemoveMembersFromSessionInputs = {
  membershipId: number;
}
export const removeMembersFromSession = (orgId: number, sessionId: number, options: UseMutationOptions<MemberOfSession[], Error, RemoveMembersFromSessionInputs>) => ({
  mutationKey: [ORGS, orgId, SESSIONS, sessionId, "DELETE"],
  mutationFn: (inputs: RemoveMembersFromSessionInputs) => 
    fetchApiResponse<MemberOfSession[], RemoveMembersFromSessionInputs>(
      `${ORGS}/${orgId}/${SESSIONS}/${sessionId}/members`,
      "DELETE",
      inputs
    ),
  ...options
});
