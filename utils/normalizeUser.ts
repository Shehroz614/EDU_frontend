import { RawUser, User } from '@type/user'

/**
 * Transforms the raw user data from the API into a User type.
 * Specifically, it handles the conversion of date strings to Date objects.
 *
 * @param rawUser - The raw user data received from the API.
 * @returns A User object with normalized data.
 */
const normalizeUser = (rawUser: RawUser): User => {
  return {
    ...rawUser,
    signedIn: true,
    date_of_birth: rawUser.date_of_birth
      ? new Date(rawUser.date_of_birth)
      : undefined,
    updatedAt: rawUser.updatedAt ? new Date(rawUser.updatedAt) : undefined,
    createdAt: rawUser.createdAt ? new Date(rawUser.createdAt) : undefined,
    purchased_courses: rawUser?.purchased_courses || [''],
    isAuthor: rawUser?.isAuthor || false,
    isAuthorVerified: rawUser?.isAuthorVerified || false,
    introduction: rawUser?.introduction || null,
    introductoryVideo: rawUser?.introductoryVideo || null,
  }
}

export default normalizeUser
