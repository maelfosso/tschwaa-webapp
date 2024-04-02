import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchApiResponse } from "api/axios";
import { ORGS } from "api/organizations";
import { PLACES, SESSIONS, changePlaceOfSession, getPlaceOfSession, updatePlaceOfSession } from "api/session";
import { classNames } from "lib/utils";
import { PlaceOfSession, PlaceOfSessionGivenVenue, PlaceOfSessionMemberHome, PlaceOfSessionOnline } from "models/organizations";
import { useEffect, useState } from "react";

interface MeetingPlaceDetailsProps {
  state: {
    placeDetails: PlaceOfSession,
    setPlaceDetails: React.Dispatch<React.SetStateAction<PlaceOfSession>>
  }
}


const MeetingPlaceOnline = ({ state }: MeetingPlaceDetailsProps) => {
  const { placeDetails, setPlaceDetails } = state;

  useEffect(() => {
    setPlaceDetails({
      ...placeDetails,
      placeType: MEETING_PLACES.ONLINE.type
    } as PlaceOfSessionOnline)
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setPlaceDetails({
      ...placeDetails,
      type: "whatsapp",
      link: event.target.value
    } as PlaceOfSessionOnline)
  }

  return (
    <div>
      <div className="block text-sm font-medium leading-6 text-gray-900">More about it</div>
      <div className="mt-2 relative flex flex-col gap-2 cursor-pointer border p-4 focus:outline-none rounded-md bg-white shadow-sm">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Link of meeting
        </label>
        <div>
          <input
            type="url"
            name="link"
            id="link"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Google Meet, Zoom, etc..."
            aria-describedby="link-description"
            onChange={handleChange}
            value={(placeDetails as PlaceOfSessionOnline).link}
          />
        </div>
        <p className="text-sm text-gray-500" id="email-description">
          Kindly, provide the link (Google Meet, Zoom, etc...) where to the meeting will be
        </p>
      </div>
    </div>
  )
}

const MeetingPlaceGivenVenue = ({ state }: MeetingPlaceDetailsProps) => {
  const { placeDetails, setPlaceDetails } = state;

  useEffect(() => {
    console.log('mount - given venue: ', placeDetails);
    setPlaceDetails({
      ...placeDetails,
      placeType: MEETING_PLACES.GIVEN_VENUE.type
    } as PlaceOfSessionGivenVenue)
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setPlaceDetails({
      ...placeDetails,
      name: event.target.value
    } as PlaceOfSession)
  }

  return (
    <div>
      <div className="block text-sm font-medium leading-6 text-gray-900">More about it</div>
      <div className="mt-2 relative flex flex-col gap-2 cursor-pointer border p-4 focus:outline-none rounded-md bg-white shadow-sm">
        <label htmlFor="name-given-venue" className="block text-sm font-medium leading-6 text-gray-900">
          Kindly, indicate the place on the map and name it
        </label>
        <div className="">
          <input
            type="text"
            name="name"
            id="name-given-venue"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""
            aria-describedby="name-given-venu"
            onChange={handleChange}
            value={(placeDetails as PlaceOfSessionGivenVenue).location}
          />
        </div>
        <p className="text-sm text-gray-500">
          Kindly, select on the map the place of the meeting. It will be used to guide members.
        </p>
      </div>
    </div>
  )
}

const MEETING_PLACES_MEMBER_HOME = {
  RECEIVER: { type: "receiver", name: "The one who receive", description: "We will be at the home who will receive us the day of the meeting" },
  SPECIFIED: { type: "specified", name: "Will be specify", description: "We will specify it when the times comes, the day of the meeting" },
}
const MeetingPlaceMemberHome = ({ state }: MeetingPlaceDetailsProps) => {
  const { placeDetails, setPlaceDetails } = state;
  const [choice, setChoice] = useState(MEETING_PLACES_MEMBER_HOME.RECEIVER);

  useEffect(() => {
    setPlaceDetails({
      ...placeDetails,
      placeType: MEETING_PLACES.MEMBER_HOME.type,
      choice: (placeDetails as PlaceOfSessionMemberHome).choice ?? MEETING_PLACES_MEMBER_HOME.RECEIVER.type
    } as PlaceOfSessionMemberHome)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoice(Object.values(MEETING_PLACES_MEMBER_HOME)[+event.target.value]);
    setPlaceDetails({
      ...placeDetails,
      choice: Object.values(MEETING_PLACES_MEMBER_HOME)[+event.target.value].type
    } as PlaceOfSessionMemberHome)
  }

  return (
    <div>
      <div className="block text-sm font-medium leading-6 text-gray-900">Where exactly?</div>
      <div className="isolate mt-2 -space-y-px rounded-md bg-white shadow-sm">
        {Object.values(MEETING_PLACES_MEMBER_HOME).map((setting, settingIdx) => (
          <label
            key={setting.type}
            htmlFor={`meeting-place-member-home-${settingIdx}`} 
            className={
              classNames(
                settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                settingIdx === Object.values(MEETING_PLACES_MEMBER_HOME).length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                choice.type == setting.type ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                'relative flex cursor-pointer border p-4 focus:outline-none'
              )
            }
          >
            <span
              className={classNames(
                choice.type == setting.type ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
              )}
              aria-hidden="true"
            >
              <input
                id={`meeting-place-member-home-${settingIdx}`}
                name="meeting-place-member-home-radio" aria-describedby="helper-radio-text"
                type="radio"
                value={settingIdx}
                checked={choice.type == setting.type}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </span>
            <span className="ml-3 flex flex-col">
              <span
                className={classNames(
                  choice.type == setting.type ? 'text-sky-900' : 'text-gray-900',
                  'block text-sm font-medium'
                )}
              >
                {setting.name}
              </span>
              <span
                className={classNames(choice.type == setting.type ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
              >
                {setting.description}
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

interface Props {
  orgId: number;
  sessionId: number;
}

const MEETING_PLACES = {
  ONLINE: { type: "online", name: 'Online', description: 'This project would be available to anyone who has the link' },
  GIVEN_VENUE: { type: "given_venue", name: 'Given venue', description: 'Only members of this project would be able to access' },
  MEMBER_HOME: { type: "member_home", name: 'Member\'s house', description: 'You are the only one able to access this project' },
}

const MeetingPoints = ({ orgId, sessionId }: Props) => {

  const [selectedPlaceOfSession, setSelectedPlaceOfSession] = useState(MEETING_PLACES.ONLINE);
  const [placeDetails, setPlaceDetails] = useState<PlaceOfSession>({
    id: -1,
    placeType: MEETING_PLACES.ONLINE.type,
    sessionId: sessionId
  })

  const { data: currentPlaceOfSession } = useQuery(getPlaceOfSession(orgId, sessionId))

  useEffect(() => {
    setSelectedPlaceOfSession(
      Object.values(MEETING_PLACES).find((p) => p.type === currentPlaceOfSession?.placeType)
      || MEETING_PLACES.ONLINE
    )
  }, [currentPlaceOfSession])

  useEffect(() => {
    console.log('placedetails: ', placeDetails);
    // mutatePlaceOfSession(placeDetails);
  }, [placeDetails])

  const { mutate: mutatePlaceOfSession } = useMutation(changePlaceOfSession(orgId, sessionId, {
    onSuccess: (response: PlaceOfSession) => {
      // setSelectedPlaceOfSession(response);
      console.log('response: ', response);
    },
    onError: (error: Error) => {
      console.log("update place error: ", error);
    }
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmp = Object.values(MEETING_PLACES)[+event.target.value];

    setSelectedPlaceOfSession(tmp);
  }

  const renderPlaceDetails = () => {
    switch(selectedPlaceOfSession.type) {
      case MEETING_PLACES.ONLINE.type:
        return <MeetingPlaceOnline state={{placeDetails, setPlaceDetails}}/>;
      case MEETING_PLACES.GIVEN_VENUE.type:
        return <MeetingPlaceGivenVenue state={{placeDetails, setPlaceDetails}} />;
      case MEETING_PLACES.MEMBER_HOME.type:
        return <MeetingPlaceMemberHome state={{placeDetails, setPlaceDetails}} />;
    }
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
      
      <div className="mb-4">
        <div className="block text-sm font-medium leading-6 text-gray-900">We meet</div>
        <div className="isolate mt-2 -space-y-px rounded-md bg-white shadow-sm">
          {Object.values(MEETING_PLACES).map((setting, settingIdx) => (
            <label
              key={setting.name}
              htmlFor={`meeting-point-radio-${settingIdx}`} 
              className={
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === Object.values(MEETING_PLACES).length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                  selectedPlaceOfSession.name == setting.name ? 'z-10 border-sky-200 bg-sky-50' : 'border-gray-200',
                  'relative flex cursor-pointer border p-4 focus:outline-none'
                )
              }
            >
              <span
                className={classNames(
                  selectedPlaceOfSession.name == setting.name ? 'bg-sky-600 border-transparent' : 'bg-white border-gray-300',
                  'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
                )}
                aria-hidden="true"
              >
                <input
                  id={`meeting-point-radio-${settingIdx}`}
                  name="meeting-points-radio" aria-describedby="helper-radio-text"
                  type="radio"
                  value={settingIdx}
                  checked={selectedPlaceOfSession.name == setting.name}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </span>
              <span className="ml-3 flex flex-col">
                <span
                  className={classNames(
                    selectedPlaceOfSession.name == setting.name ? 'text-sky-900' : 'text-gray-900',
                    'block text-sm font-medium'
                  )}
                >
                  {setting.name}
                </span>
                <span
                  className={classNames(selectedPlaceOfSession.name == setting.name ? 'text-sky-700' : 'text-gray-500', 'block text-sm')}
                >
                  {setting.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      { renderPlaceDetails() }
    </>
  )
}

export default MeetingPoints;
