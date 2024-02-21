import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMemberToSession, getMembersOfSession, removeMembersFromSession, updateAllMembersOfSession } from "api/session";
import { MemberOfSession } from "models/organizations";
import { classNames } from "lib/utils";
import InviteMembers from "components/orgs/InviteMembers";
import { Drawer } from "flowbite";

const MembersSelection = () => {
  const { orgId: _orgId, sessionId: _sessionId } = useParams();
  const orgId = +(_orgId ?? "");
  const sessionId = +(_sessionId ?? "");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [members, setMembers] = useState<MemberOfSession[]>([]);
  const [currentMember, setCurrentMember] = useState<MemberOfSession>()
  const [selectedMembers, setSelectedMembers] = useState<MemberOfSession[]>([])

  const $inviteMembersEl = document.getElementById('invite-members-drawer');
  const inviteMembersOptions = {
    // placement: 'right',
    // backdrop: true,
    // bodyScrolling: false,
    // edge: false,
    // edgeOffset: '',
    // backdropClasses:
    //     'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
      console.log('drawer is hidden');
      navigate({
        pathname,
        search: `step=2`
      })
    },
    onShow: () => {
      console.log('drawer is shown');
    },
    onToggle: () => {
      console.log('drawer has been toggled');
    },
  };
  const instanceOptions = {
    id: 'invite-members-drawer',
    override: true
  };
  const inviteMembersDrawer = new Drawer($inviteMembersEl, inviteMembersOptions, instanceOptions);

  useEffect(() => {
    setSelectedMembers(members.filter(d => d.id && d.sessionId)); // select only those having MoS information
  }, [members]);

  useLayoutEffect(() => {
    const isIndeterminate = selectedMembers.length > 0 && selectedMembers.length < members.length
    setChecked(selectedMembers.length === members.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [members.length, selectedMembers]);

  const {data: membersOfSession } =
    useQuery(getMembersOfSession(orgId, sessionId));

  useEffect(() => {
    setMembers(membersOfSession || [])
  }, [membersOfSession]);

  const { mutate: mutateUpdateAllMembersOfSession } = useMutation(updateAllMembersOfSession(orgId, sessionId, {
    onSuccess: (response: MemberOfSession[]) => {
      console.log("update members success: ", response);
      const nextMembers = [...members].map((member) => {
        const found = response.find(
          m => m.membershipId === member.membershipId
        );

        if (found) {
          return {
            ...member,
            id: found.id,
            sessionId: found.sessionId
          }
        } else {
          return {
            ...member,
            id: NaN,
            sessionId: NaN
          }
        }
      });
      setMembers(nextMembers);
    },
    onError: (error: Error) => {
      console.log("update members error: ", error);
    }
  }))

  const { mutate: mutateAddMemberToSession } = useMutation(addMemberToSession(orgId, sessionId, {
    onSuccess: (response: number) => {
      console.log("add members success: ", response);
      if (!currentMember) {
        return;
      }

      // member.id = response;
      const nextMembers = [...members];
      const selectedMember = nextMembers.find(
        m => m.membershipId === currentMember.membershipId
      );
      if (selectedMember) {
        selectedMember.id = response;
        selectedMember.sessionId = +sessionId;
      }
      setMembers(nextMembers);
    },
    onError: (error: Error) => {
      console.log("add members error: ", error);
    }
  }))

  const { mutate: mutateRemoveMemberFromSession } = useMutation(removeMembersFromSession(orgId, sessionId, {
    onSuccess: (response: MemberOfSession[]) => {
      console.log("remove members success: ", response);
      if (!currentMember) {
        return;
      }

      const nextMembers = [...members];
      const selectedMember = nextMembers.find(
        m => m.membershipId === currentMember.membershipId
      );
      if (selectedMember) {
        selectedMember.id = NaN;
        selectedMember.sessionId = NaN;
      }
      setMembers(nextMembers);
    },
    onError: (error: Error) => {
      console.log("remove members error: ", error);
    }
  }))

  const handleToggleAll = async () => {
    console.log('toggleAll', checked, indeterminate);
    // TODO: replace the toggle all checkbox by a loading spinner : we sent the request

    const concernedMembers = checked || indeterminate ? [] : members
    mutateUpdateAllMembersOfSession({
      membershipIds: concernedMembers.map(m => m.membershipId)
    });

    // if (response) {
    //   const nextMembers = [...members].map((member) => {
    //     const found = response.find(
    //       m => m.membershipId === member.membershipId
    //     );

    //     if (found) {
    //       return {
    //         ...member,
    //         id: found.id,
    //         sessionId: found.sessionId
    //       }
    //     } else {
    //       return {
    //         ...member,
    //         id: NaN,
    //         sessionId: NaN
    //       }
    //     }
    //   });
    //   setMembers(nextMembers);
    // }
  }

  const handleAddMemberToSession = async (member: MemberOfSession) => {
    if (!currentMember) {
      return;
    }

    mutateAddMemberToSession({
      membershipId: currentMember.membershipId
    })
    // if (response) {
    //   member.id = response;
    //   const nextMembers = [...members];
    //   let selectedMember = nextMembers.find(
    //     m => m.membershipId === member.membershipId
    //   );
    //   if (selectedMember) {
    //     selectedMember.id = response;
    //     selectedMember.sessionId = +sessionId;
    //   }
    //   setMembers(nextMembers);
    // }
  }

  const handleRemoveMemberFromSession = async (member: MemberOfSession) => {
    if (!currentMember) {
      return;
    }

    mutateRemoveMemberFromSession({
      membershipId: currentMember.id
    })
    // console.log('handleRemoveMemberFromSession: ', member.id, response);
    // if (response) {
    //   const nextMembers = [...members];
    //   let selectedMember = nextMembers.find(
    //     m => m.membershipId === member.membershipId
    //   );
    //   if (selectedMember) {
    //     selectedMember.id = NaN;
    //     selectedMember.sessionId = NaN;
    //   }
    //   setMembers(nextMembers);

    //   // TODO display Notification Success
    // } {
    //   // TODO display Notification Error
    // }
  }

  const handleToggleMember = (checked: boolean, member: MemberOfSession) => {
    console.log('toggleMember: ', checked, member);

    setCurrentMember(member);
    if (checked) {
      handleAddMemberToSession(member);
    } else {
      handleRemoveMemberFromSession(member)
    }
  }

  const handleInviteMembersClick = () => {
    console.log('handle add invite click');
    inviteMembersDrawer.show();
  }

  return (
    <>
      <div className="mb-8 pt-3 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-lg font-semibold leading-6 text-gray-900">Members</h2>
          <p className="mt-2 text-base text-gray-700">
            Select the members you want in this session or Invite new members to join your organization.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleInviteMembersClick()}
          >
            Invite members
          </button>
        </div>
      </div>
      <div className="flow-root overflow-y-auto">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      ref={checkbox}
                      checked={checked}
                      onChange={handleToggleAll}
                    />
                  </th>
                  <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                    First name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {members.map((member) => (
                  <tr key={member.phone} className={selectedMembers.includes(member) ? 'bg-gray-50' : undefined}>
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {selectedMembers.includes(member) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={member.phone}
                        checked={selectedMembers.includes(member)}
                        onChange={(e) => handleToggleMember(e.target.checked, member)}
                      />
                    </td>
                    <td
                      className={classNames(
                        'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                        selectedMembers.includes(member) ? 'text-indigo-600' : 'text-gray-900'
                      )}
                    >
                      {member.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.phone}</td>
                    {/* <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {member.firstName}</span>
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <InviteMembers
        orgId={orgId}
      />
    </>
  )
}

export default MembersSelection;
