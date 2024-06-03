import { classNames } from "lib/utils";
import { useState } from "react";

const MEETING_FREQUENCIES = {
    DAY: { id: 'day', name: 'Every day', description: 'A given time hour of the day.' },
    WEEK: { id: 'week', name: 'Every week', description: 'Once a week.' },
    MONTH: { id: 'month', name: 'Every month', description: 'Once a month.' }
}

const arrayRange = (start: number, stop: number, step: number) => Array.from(
  { length: (stop - start) / step + 1 },
  (value, index) => start + index * step
);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const displayNumber = (n:number) => {
  if (n.toString().endsWith('1')) {
    return `${n}st`;
  }
  if (n.toString().endsWith('2')) {
    return `${n}nd`;
  }
  if (n.toString().endsWith('3')) {
    return `${n}rd`;
  }
  return `${n}th`;
}

const MeetingFrequencyDay = () => {
  const [startingAt, setStartingAt] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);

  return (
    <>
      <div className="block text-sm font-medium leading-6 text-gray-900">Every day, at which time?</div>

      <div className="isolate -space-y-px rounded-md bg-white shadow-sm border-grey-200 border p-4 flex flex-col hover:border-sky-200">
        <label htmlFor="every-day-starting-at" className="block text-sm font-medium leading-6 text-gray-900">
          Starting at
        </label>
        <span className="text-grey-700 block text-sm">
          <input
            type="time" id="every-day-starting-at" name="every-day-starting-at"
            value={startingAt}
            onChange={event => setStartingAt(event.currentTarget.value)}
            min="00:00" max="24:00" required className="border-none outline-none p-0"
          />
        </span>
      </div>
    </>
  )
}

const MeetingFrequencyWeek = () => {
  const [startingAt, setStartingAt] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);

  return (
    <>
      <div className="block text-sm font-medium leading-6 text-gray-900">Every month, When exactly and at which time?</div>

      <div className="isolate space-y-4 rounded-md bg-white shadow-sm border-grey-200 border p-4 flex flex-col hover:border-sky-200">
        <div className="">
          <label htmlFor="every-week-day" className="block text-sm font-medium leading-6 text-gray-900">
            Day
          </label>
          <select
            id="every-week-day"
            name="every-week-day"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
            defaultValue="Saturday"
          >
            {days.map((d, ix) => <option key={d} value={ix}>{d}</option>)}
          </select>
        </div>
        <div className="">
          <label htmlFor="every-week-starting-at" className="block text-sm font-medium leading-6 text-gray-900">
            Starting at
          </label>
          <span
            className="text-grey-700 block text-sm"
          >
            <input
              type="time" id="every-week-starting-at" name="every-week-starting-at"
              value={startingAt}
              onChange={event => setStartingAt(event.currentTarget.value)}
              min="00:00" max="24:00" required className="border-none outline-none p-0"
            />
          </span>
        </div>
      </div>
    </>
  )
}

const MeetingFrequencyMonth = () => {

  const [choice, setChoice] = useState<string>('specific-day');
  const [day, setDay] = useState<number>(1);
  const [dayOfWeek, setDayOfWeek] = useState<string>(days[0]);
  const [week, setWeek] = useState<number>(1);
  const [startingAt, setStartingAt] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);

  return (
    <>
      <div className="block text-sm font-medium leading-6 text-gray-900">A which frequency do you meet?</div>

      <div className="isolate space-y-4 rounded-md bg-white shadow-sm border-grey-200 border p-4 flex flex-col hover:border-sky-200">
        <div className="">
          <label htmlFor="every-month-" className="text-sm leading-6 text-gray-900">
            These are delivered via SMS to your mobile phone.
          </label>
          <div className="space-y-1">
            <label htmlFor="every-month-specific-day" className="flex items-center gap-x-3 text-sm font-medium leading-6 text-gray-900">
              <input
                id="every-month-specific-day"
                name="every-month"
                type="radio"
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                checked={choice === "specific-day"}
                onChange={() => setChoice('specific-day')}
              />
              A specific day of the month
            </label>
            <label htmlFor="every-month-specific-weekday" className="flex items-center gap-x-3 text-sm font-medium leading-6 text-gray-900">
              <input
                id="every-month-specific-weekday"
                name="every-month"
                type="radio"
                className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                checked={choice === "specific-weekday"}
                onChange={() => setChoice('specific-weekday')}
              />
              Every specific weekday of the month
            </label>
          </div>
        </div>

        <div className={classNames(
          choice === "specific-day" ? "" : "hidden"
        )}>
          <label htmlFor="every-month-day" className="block text-sm font-medium leading-6 text-gray-900">
            Day
          </label>
          <select
            id="every-month-day"
            name="every-month-day"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
            onChange={(event) => setDay(+event.target.value)}
            value={day}
          >
            {arrayRange(1, 31, 1).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className={classNames(
          choice === "specific-weekday" ? "" : "hidden",
          "space-y-4"
        )}>
          <div>
            <label htmlFor="every-month-day" className="block text-sm font-medium leading-6 text-gray-900">
              Week (a month has 4 weeks)
            </label>
            <select
              id="every-month-day"
              name="every-month-day"
              className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
              onChange={(event) => setWeek(+event.target.value)}
              value={week}
            >
              {arrayRange(1, 4, 1).map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="every-month-day" className="block text-sm font-medium leading-6 text-gray-900">
              Day of the weekday
            </label>
            <select
              id="every-month-weekday"
              name="every-month-weekday"
              className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
              onChange={(event) => setDayOfWeek(event.target.value)}
              value={dayOfWeek}
            >
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="">
          <label htmlFor="every-month-starting-at" className="block text-sm font-medium leading-6 text-gray-900">
            Starting at
          </label>
          <span
            className="text-grey-700 block text-sm"
          >
            <input
              type="time" id="every-month-starting-at" name="every-week-starting-at"
              value={startingAt}
              onChange={event => setStartingAt(event.currentTarget.value)}
              min="00:00" max="24:00" required className="border-none outline-none p-0"
            />
          </span>
        </div>

        <div className={classNames(
          choice === "specific-day" ? "" : "hidden"
        )}>
          Every <strong>{displayNumber(day)}</strong> of the month at <strong>{startingAt}</strong>
        </div>
        <div className={classNames(
          choice === "specific-weekday" ? "" : "hidden"
        )}>
          Every <strong>{displayNumber(week)} {dayOfWeek.toLowerCase()}</strong> of the month at <strong>{startingAt}</strong>
        </div>
      </div>
    </>
  )
}


interface Props {
  orgId: number;
  sessionId: number;
}
const MeetingFrequencies = ({ orgId, sessionId }: Props) => {

  const [selectedMeetingFrequency, setSelectedMeetingFrequency] = useState(MEETING_FREQUENCIES.DAY);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setSelectedMeetingFrequency(Object.values(MEETING_FREQUENCIES)[+event.target.value]);
    // mutatePlaceOfSession({
    //   type: selectedPlaceOfSession.name
    // })
  }

  const renderFrequencyDetails = () => {
    switch (selectedMeetingFrequency.id) {
      case MEETING_FREQUENCIES.DAY.id:
        return <MeetingFrequencyDay />
      case MEETING_FREQUENCIES.WEEK.id:
        return <MeetingFrequencyWeek />
      case MEETING_FREQUENCIES.MONTH.id:
        return <MeetingFrequencyMonth />
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Meeting Frequency</h2>
          <p className="mt-2 text-base text-gray-700">
            A which frequency do you meet?
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          
        </div>
      </div>
      <div className="mb-4">
        <div className="block text-sm font-medium leading-6 text-gray-900">We meet</div>
        <div className="isolate mt-2 -space-y-px rounded-md bg-white shadow-sm">
          {Object.values(MEETING_FREQUENCIES).map((setting, settingIdx) => (
            <label
              key={setting.name}
              htmlFor={`meeting-point-radio-${settingIdx}`} 
              className={
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === Object.values(MEETING_FREQUENCIES).length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                  selectedMeetingFrequency.name == setting.name ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                  'relative flex cursor-pointer border p-4 focus:outline-none'
                )
              }
            >
              <span
                className={classNames(
                  selectedMeetingFrequency.name == setting.name ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                  'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                )}
                aria-hidden="true"
              >
                <input
                  id={`meeting-point-radio-${settingIdx}`}
                  name="meeting-points-radio" aria-describedby="helper-radio-text"
                  type="radio"
                  value={settingIdx}
                  checked={selectedMeetingFrequency.name == setting.name}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </span>
              <span className="ml-3 flex flex-col">
                <span
                  className={classNames(
                    selectedMeetingFrequency.name == setting.name ? 'text-sky-900' : 'text-gray-900',
                    'block text-sm font-medium'
                  )}
                >
                  {setting.name}
                </span>
                <span
                  className={classNames(selectedMeetingFrequency.name == setting.name ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                >
                  {setting.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      { renderFrequencyDetails() }
      <div className="mt-4">
      </div>
    </>
  )
}

export default MeetingFrequencies;
