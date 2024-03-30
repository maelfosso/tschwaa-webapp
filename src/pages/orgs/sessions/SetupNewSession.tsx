import CashInConfiguration from "components/orgs/orgId/sessions/setup/CashInConfiguration";
import CashOutConfiguration from "components/orgs/orgId/sessions/setup/CashOutConfiguration";
import MeetingFrequencies from "components/orgs/orgId/sessions/setup/MeetingFrequencies";
import MeetingPoints from "components/orgs/orgId/sessions/setup/MeetingPoints";
import MembersSelection from "components/orgs/orgId/sessions/setup/MembersSelection";
import { classNames } from "lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const SetupNewSession = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { orgId: _orgId, sessionId: _sessionId } = useParams();
  const orgId = Number(_orgId)
  const sessionId = Number(_sessionId);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (searchParams.has('step')) {
      setStep(+searchParams.get('step')!)
    } else {
      navigate({
        pathname,
        search: `step=${step}`
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])


  const handleNextClick = () => {
    if (step < 5) {
      // router.push(pathname + '?' + createQueryString('step', (step + 1).toString()))
      navigate({
        pathname,
        search: `step=${step + 1}`
      });
    }
  }

  const handlePreviousClick = () => {
    if (step > 1) {
      navigate({
        pathname,
        search: `step=${step - 1}`
      });
      // router.push(pathname + '?' + createQueryString('step', (step - 1).toString()))
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <MembersSelection orgId={orgId} sessionId={sessionId} />
      case 2:
        return <MeetingPoints orgId={orgId} />
      // case 3:
      //   return <MeetingFrequencies orgId={+(orgId ?? "")} />
      // case 4:
      //   return <CashInConfiguration orgId={+(orgId ?? "")} />
      // case 5:
      //   return <CashOutConfiguration orgId={+(orgId ?? "")} />
      default:
        <></>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex flex-wrap items-end gap-6 sm:flex-nowrap">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Setup the new session
          </h1>
          <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
            <a
              href="#"
              className={classNames(step === 1 ? "text-indigo-600" : "text-gray-700")}
            >
              Members
            </a>
            <a
              href="#"
              className={classNames(step === 2 ? "text-indigo-600" : "text-gray-700")}
            >
              Place
            </a>
            <a
              href="#"
              className={classNames(step === 3 ? "text-indigo-600" : "text-gray-700")}
            >
              Frequency
            </a>
            <a
              href="#"
              className={classNames(step === 4 ? "text-indigo-600" : "text-gray-700")}
            >
              Cash In
            </a>
            <a
              href="#"
              className={classNames(step === 5 ? "text-indigo-600" : "text-gray-700")}
            >
              Cash Out
            </a>
          </div>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0"></div>
      </div>
      { renderStep() }
      <div className="flex items-center justify-between mt-auto">
        <button
          className={classNames(
            step == 1 ? "hidden": ""
          )}
          onClick={() => handlePreviousClick()}
        >
          Previous
        </button>
        <button
          className="ml-auto"
          onClick={() => handleNextClick()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SetupNewSession;
