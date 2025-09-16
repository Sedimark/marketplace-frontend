import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

/**
 * Submits user data from the onboarding form to the /protected endpoint.
 *
 * @async
 * @param {Object} userData - The user data to submit.
 * @param {string} userData.alternate_name - Username(alt name).
 * @param {string} userData.first_name - First name of the user.
 * @param {string} userData.last_name - Last name of the user.
 * @param {string} userData.company_name - Company name.
 * @param {string} userData.website - User's website URL.
 * @param {string} userData.image_url - URL to the user's image/avatar.
 * @returns {Object} - The response JSON or an error object.
 */
export async function submitUserData (userData) {
  const url = `${settings.webserverUrl}/protected`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + settings.webserverToken // Added as ENV, change if necessary.
    },
    body: JSON.stringify(userData)
  }

  try {
    const response = await fetchData(url, options).then(res => res.json())
    return response
  } catch (error) {
    console.log('Error on submitUserData!')
    console.log(error)
    return { error: 'Unnable to access profile server!' }
  }
}

/**
 * Gets the profile data of a user, given its server URL.
 *
 * @async
 * @param {string} profileUrl - URL of the endpoint to get profile data from.
 * @returns {Object} - The response JSON or an error object.
 */
export async function getUserData (profileUrl = `${settings.webserverUrl}/profile`) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetchData(profileUrl, options).then(res => res.json())
    return response
  } catch (error) {
    console.log('Error on getUserData!')
    console.log(error)
    return { error }
  }
}
