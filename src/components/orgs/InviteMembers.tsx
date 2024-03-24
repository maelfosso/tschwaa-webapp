import { CheckCircleIcon, ExclamationCircleIcon, PhoneIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useMutation } from "@tanstack/react-query";
import { SendMultipleWhatsappInvitationResponse, sendMultipleWhatsappInvitation } from "api/organizations";
import WithFlowbite from "components/common/WithFlowbite";
import { Member } from "models/organizations";
import { useEffect, useState } from "react";

interface InvitationResultItem {
  phone: string;
  invited: boolean;
  error?: string;
}

const phoneRegex = new RegExp('^[0-9]+$');

const InviteMembers = ({ orgId }: { orgId: number }) => {

  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>('');
  const [phones, setPhoneNumbers] = useState<string[]>([])
  const [phonesInvited, setPhoneNumberInvited] = useState<InvitationResultItem[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    return () => {
      setPhoneNumberInvited([]);
      setPhoneNumbers([]);
    }
  }, []);

  const { mutate: mutateSendInvitation } = useMutation(sendMultipleWhatsappInvitation(orgId, false, {
    onSuccess: (data: SendMultipleWhatsappInvitationResponse) => {
      setPhoneNumberInvited(data);
    },
    onError: (error: Error) => {
      console.log("sendMultipleWhatsappInvitation error: ", error);
    }
  }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const membersToInvite = phones.map((phone:string) => {
      return {
        id: 0,
        firstName: "",
        lastName: "",
        sex: "male",
        phone,
        email: ""
      } as Member
    });
    mutateSendInvitation(membersToInvite);
  }

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!phoneRegex.test(event.target.value)) {
      setError('phone number should have only space');
    } else {
      setCurrentPhoneNumber(event.target.value);
      
      if (error) {
        setError('');
      }
    }
  }

  const handleAddPhoneNumberClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setPhoneNumbers([...phones, currentPhoneNumber]);
    setCurrentPhoneNumber('');
  }

  const handleRemovePhoneNumberClick = (toDelete: string) => {
    setPhoneNumbers(phones.filter(p => p != toDelete))
  }

  const renderPrefixIcon = (phone: string) => {
    const currentPhone = phonesInvited.find(i => i.phone === phone);
    if (currentPhone) {
      if (currentPhone.invited) {
        return <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />;
      } else {
        return <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />;
      }
    }

    return <XMarkIcon className="h-6 w-6" aria-hidden="true" />;
  }

  const renderErrorMessage = (phone: string) => {
    const currentPhone = phonesInvited.find(i => i.phone === phone);
    if (currentPhone) {
      return !currentPhone.invited && currentPhone.error && (
        <div className="ml-7 text-sm text-red-500">{ currentPhone.error }</div>
      )
    }
    return <></>
  }

  return (
    <form
      className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-gray-900">Invite new members</h2>
              <p className="text-sm text-gray-500">Kindly, enter the phone number one by one and press Enter at each time</p>
            </div>
            <div className="flex h-7 items-center">
              <button
                type="button"
                className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                data-drawer-hide="invite-members-drawer"
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-4 py-6 sm:px-6 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Phone number
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="6 90 09 90 00"
                value={currentPhoneNumber}
                onChange={handlePhoneNumberChange}
              />
              { error && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div> }
            </div>
            <button
              type="button"
              className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={handleAddPhoneNumberClick}
            >
              <PlusIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              add
              <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                ⌘K
              </kbd>
            </button>
          </div>
          { error && <p className="mt-2 text-sm text-red-600" id="email-error">
            { error }
          </p> }
        </div>

        <div className="space-y-6 px-4 sm:px-6 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {phones.map((phone) => (
              <li key={phone} className="px-4 py-2 sm:px-0">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleRemovePhoneNumberClick(phone)}>
                    <span className="sr-only">Close panel</span>
                    { renderPrefixIcon(phone) }
                  </button>
                  {phone}
                </div>
                { renderErrorMessage(phone) }
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            data-drawer-hide="invite-members-drawer"
          >
            { phonesInvited.length > 0 ? `Close` : `Cancel` }
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Invite
          </button>
        </div>
      </div>
    </form>
  )
}

export default InviteMembers;
