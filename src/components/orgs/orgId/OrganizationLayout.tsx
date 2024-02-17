import { QueryClient, useQuery } from "@tanstack/react-query";
import { getOrganizationQuery } from "api/organizations";
import WithFlowbite from "components/common/WithFlowbite";
import { Modal } from "flowbite";
import { Organization } from "models/organizations";
import { useEffect, useMemo } from "react";
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

const NoSessionInProgress = () => {
  return (
    <div className="grow flex items-center justify-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No Session in progress</h5>
        <p className="text-justify mb-3 font-normal text-gray-700 dark:text-gray-400">There is no session in progress. To continue, you have to create a new session first. Kindly, click below to create a new session</p>
        <div className="flex justify-center">
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create a new session
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

const Layout = () => {
  const params = useParams()
  const { data: response } = useQuery(getOrganizationQuery(params.orgId))
  const organization = response?.organization;
  const currentSession = response?.currentSession;
  console.log('current-session', currentSession);
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
                {/* <li>
                  <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
                </li>
                <li>
                  <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <div className="grow flex flex-col">
          { !currentSession && <NoSessionInProgress /> }
        </div>
        {/* <div id="no-session-modal" tabIndex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="no-session-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button data-modal-hide="no-session-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button data-modal-hide="no-session-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </>
    </WithFlowbite>
  );
}

export default Layout;
