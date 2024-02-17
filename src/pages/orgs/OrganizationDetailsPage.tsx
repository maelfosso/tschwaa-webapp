import { useQuery } from "@tanstack/react-query";
import { getOrganizationQuery } from "api/organizations";
import { Navigate, useParams } from "react-router-dom";

const OrganizationDetailsPage = () => {
  const params = useParams()
  const { data: response } = useQuery(getOrganizationQuery(params.orgId))
  const currentSession = response?.currentSession;

  console.log('OrganizationDetailsPage : ', response);


  if (!currentSession) {
    return <Navigate to={"sessions/no-session-in-progress"} />
  }

  return (
    <h2>Organization Details Page</h2>
  )
}

export default OrganizationDetailsPage;
