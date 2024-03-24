import { classNames } from "lib/utils";
import { useState } from "react";

interface Props {
  orgId: number;
}

const meetingPoints = [
  { name: 'Online', description: 'This project would be available to anyone who has the link' },
  { name: 'Given venue', description: 'Only members of this project would be able to access' },
  { name: 'Member\'s house', description: 'You are the only one able to access this project' },
]

const MeetingPoints = ({ orgId }: Props) => {

  const [meetingPoint, setMeetingPoint] = useState(meetingPoints[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setMeetingPoint(meetingPoints[+event.target.value]);
  }

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Meeting Point</h2>
          <p className="mt-2 text-base text-gray-700">
            Where do you meet? Where do you go for you meeting?
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          
        </div>
      </div>
      
      <div>
        <div className="block text-sm font-medium leading-6 text-gray-900">We meet</div>
        <div className="isolate mt-2 -space-y-px rounded-md bg-white shadow-sm">
          {meetingPoints.map((setting, settingIdx) => (
            <label
              key={setting.name}
              htmlFor={`meeting-point-radio-${settingIdx}`} 
              className={
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === meetingPoints.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                  meetingPoint.name == setting.name ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                  'relative flex cursor-pointer border p-4 focus:outline-none'
                )
              }
            >
              <span
                className={classNames(
                  meetingPoint.name == setting.name ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                  'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                )}
                aria-hidden="true"
              >
                <input
                  id={`meeting-point-radio-${settingIdx}`}
                  name="meeting-points-radio" aria-describedby="helper-radio-text"
                  type="radio"
                  value={settingIdx}
                  checked={meetingPoint.name == setting.name}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </span>
              <span className="ml-3 flex flex-col">
                <span
                  className={classNames(
                    meetingPoint.name == setting.name ? 'text-sky-900' : 'text-gray-900',
                    'block text-sm font-medium'
                  )}
                >
                  {setting.name}
                </span>
                <span
                  className={classNames(meetingPoint.name == setting.name ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                >
                  {setting.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

export default MeetingPoints;
