import { useMutation } from "@tanstack/react-query";
import { processError } from "api/axios";
import { createSessionMutation } from "api/session";
import YearCalendar from "components/orgs/orgId/sessions/setup/DateRangeSelection";
import { Session } from "models/organizations";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateNewSession = () => {
  const navigate = useNavigate();
  const { orgId } = useParams();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate: mutateCreateSession } = useMutation(createSessionMutation({
    onSuccess: (session: Session) => {
      console.log("create session success: ", session.id);
      navigate(`/orgs/${orgId}/sessions/${session.id}/setup`);
    },
    onError: (error: Error) => {
      console.log("create organization error: ", processError(error));
      // setError(processError(error).error)
    }
  }))

  const isValid = () => {
    console.log('is-valid ', startDate && endDate);
    return startDate && endDate;
  }

  const handleCreateClick = async () => {
    try {
      if (isValid()) {
        // const createdSession = await createNewSession(
        //   organizationId,
        //   startDate,
        //   endDate,
        //   authSession?.accessToken!,
        // );

        // router.replace(`orgs/${organizationId}/sessions/${createdSession.id}/setup`)
        mutateCreateSession({orgId: +orgId!, startDate, endDate })
      } else {
        setError("error");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.name); // the type of error
        console.log(error.message); // the description of the error
        console.log(error.stack); // the stack trace of the error
        setError(error.message);
      } else {
        // handle other errors
      }
    }
  }

  const handleCancelClick = () => {
    // router.replace('/orgs');
  }

  return (
    <div className="flex flex-col">
      <header className="border-b border-gray-900/10 pb-3">
        <h2 className="text-xl font-semibold leading-7 text-gray-900">Create a new session</h2>
      </header>
      <div className="flex flex-col">
        <p className="mt-3 max-w-2xl text-base leading-6 text-gray-600">
          Kindly select, using the calendar, the <strong>start and end date</strong> of the session
        </p>
        <YearCalendar
          startDateValue={startDate}
          onStartDateChange={(d: string) => setStartDate(d)}
          endDateValue={endDate}
          onEndDateChange={(d: string) => setEndDate(d)}
        />
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-[#795548] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          onClick={() => handleCreateClick()}
        >
          Create the new session
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => handleCancelClick()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default CreateNewSession;
