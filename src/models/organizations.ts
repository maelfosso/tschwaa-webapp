export type Organization = {
  id: number;
  code: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: Date;
}

export type Session = {
  id: number;
  startDate: Date;
  endDate: Date;
  inProgress: true;
  organizationID: number;
}

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;
  email: string;
}

export type MemberOfSession = {
  id: number;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;

  memberId: number;
  firstName: string;
  lastName: string;
  sex: string;
  phone: string;

  membershipId: number;
  joined:  boolean;
  jointAt: Date;

  position: string;
  role:     string;
  status:   string;
}

export interface PlaceOfSession {
  id: number;
  placeType: string;
  sessionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlaceOfSessionOnline extends PlaceOfSession {
  type: string; // telegram, whatsapp, google_meet, zoom
  link: string;
}

export interface PlaceOfSessionGivenVenue extends PlaceOfSession {
  name: string;
  location: string;
}

export interface PlaceOfSessionMemberHome extends PlaceOfSession {
  choice: string;
}
