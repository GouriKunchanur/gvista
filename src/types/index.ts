export type SupportedLanguage = 'Kannada' | 'English' | 'Hindi';

export type UserRole = 'anchor' | 'organizer' | 'admin';

export type ProfileStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected';
export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export type EnquiryStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';

export interface UserProfile {
  uid: string;
  role: UserRole;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'suspended';
}

export interface AnchorProfile {
  id: string;
  userId: string;
  displayName: string;
  profilePhoto: string;
  bio: string;
  languages: SupportedLanguage[];
  location: string;
  experienceYears: number;
  eventTypes: string[];
  skills: string[];
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  whatsapp?: string;
  email: string;
  videoUrls: string[];
  availability: 'available' | 'busy' | 'selective';
  verificationStatus: VerificationStatus;
  profileStatus: ProfileStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizerProfile {
  id: string;
  userId: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  organizationType: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enquiry {
  id: string;
  organizerId: string;
  organizerName?: string;
  anchorId: string;
  anchorName?: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  languageRequired: SupportedLanguage;
  expectedAudienceSize?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}
