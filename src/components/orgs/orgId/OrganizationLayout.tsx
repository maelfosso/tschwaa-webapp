import { QueryClient, useQuery } from "@tanstack/react-query";
import { getOrganizationQuery } from "api/organizations";
import WithFlowbite from "components/common/WithFlowbite";
import { Organization } from "models/organizations";
import { Outlet, useParams } from "react-router-dom";

interface ParamsProps {
  params: {
    orgId: number
  }
}

interface ILoaderData {
  organization?: Organization
  error: Error | null
}
export const OrganizationLoader = (queryClient: QueryClient) => async({ params }: ParamsProps) => {
  const query = getOrganizationQuery(params.orgId);

  return (
    queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  )
}

const Layout = () => {
  const params = useParams()
  const { data: response } = useQuery(getOrganizationQuery(params.orgId))
  const organization = response?.organization;
  const currentSession = response?.currentSession;

  return (
    <WithFlowbite>
      <>
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="px-4 lg:px-6 py-2.5">
            <div className="flex items-center">
              <ul className="flex flex-row items-center font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <a href="#" className="text-gray-900 text-2xl dark:text-white hover:underline" aria-current="page">{ organization?.name.toUpperCase() }</a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 dark:text-white hover:underline">Members</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="px-4 lg:px-6 py-2.5 grow flex flex-col">
          <Outlet />
        </div>
      </>
    </WithFlowbite>
  );
}

export default Layout;
