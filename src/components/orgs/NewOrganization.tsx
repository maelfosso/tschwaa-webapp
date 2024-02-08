import { useState } from "react";
import { CreateOrganizationInputs, Organization } from "models/organizations";
import { useMutation } from "@tanstack/react-query";
import useApiOrganizations from "api/organizations";
import { useNavigate } from "react-router-dom";
import { processError } from "hooks/useAxios";

const NewOrganization = () => {
  const { createOrganization } = useApiOrganizations();
  const navigate = useNavigate();
  const [org, setOrg] = useState<CreateOrganizationInputs>({
    name: '',
    description: ''
  });

  const { mutate: mutateCreateOrganization } = useMutation({
    mutationFn: createOrganization,
    onSuccess: (id: number) => {
      console.log("create success: ", id);
      navigate(`/orgs/${id}`);
    },
    onError: (error: Error) => {
      console.log("create organization error: ", processError(error));
      // setError(processError(error).error)
    }
  });

  const handleCreateOrganizationSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('to create', org);
    mutateCreateOrganization(org);
  }

  return (
    <form
      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
      onSubmit={handleCreateOrganizationSubmit}
    >
      <div className="h-0 flex-1 overflow-y-auto">
        <div className="bg-indigo-700 px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-6 text-white">
              New organization
            </h2>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                data-drawer-hide="add-organization-drawer"
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-indigo-300">
              Get started by filling in the information below to create your new organization.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="divide-y divide-gray-200 px-4 sm:px-6">
            <div className="space-y-6 pb-5 pt-6">
              <div>
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Organization name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="project-name"
                    id="project-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setOrg({...org!, name: event.target.value})}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setOrg({...org!, description: event.target.value})}
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-end px-4 py-4">
        <button
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          data-drawer-hide="add-organization-drawer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default NewOrganization;
