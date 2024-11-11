import { env } from "$env/dynamic/private"
import { checkIfUserMatchesInDatabase } from "$lib/server/db"
import { fail } from "@sveltejs/kit"

export const actions = {
  login: async ({ request }) => {
    if (!checkFeatureFlags("login")) {
      return fail(500)
    }
    const data = await request.formData()
    console.log(data)
    const { email, password } = data
    if (await checkIfUserMatchesInDatabase(email, password)) {
      return { success: true }
    }
    return fail(400)
  }
}

function checkFeatureFlags(flag: "login" | "pricing") {
  if (flag === "login" && env.FEATURE_FLAG_LOGIN === "true") {
    console.log("But are you logged in?")
    return true
  }
  if (flag === "pricing" && env.FEATURE_FLAG_PRICING === "true") {
    console.log("But did you pay for that?")
    return true
  }
  return false
}
