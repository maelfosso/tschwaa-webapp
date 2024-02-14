import { QueryClient, useQuery } from "@tanstack/react-query";
import { getOrganizationQuery } from "api/organizations";
import WithFlowbite from "components/common/WithFlowbite";
import { Organization } from "models/organizations";
import { useParams } from "react-router-dom";

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
  const { data: organization } = useQuery(getOrganizationQuery(params.orgId))
  
  return (
    <WithFlowbite>
    <nav className="bg-gray-50 dark:bg-gray-700">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">{ organization?.name.toUpperCase() }</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
            </li>
            <li>
              <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </WithFlowbite>
  );
}

export default Layout;
