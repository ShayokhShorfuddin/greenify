const errorMap = new Map<string, string>([
  [
    "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
    "You already have an account. Login instead.",
  ],
  ["INVALID_EMAIL_OR_PASSWORD", "Invalid email or password."],
]);

export default function getAuthErrorMessage(errorCode: string): string {
  if (errorMap.has(errorCode)) {
    return errorMap.get(errorCode) as string;
  }

  // Since we don't have a specific message for this error code, there must be something wrong. Better-auth library must have changed their error codes or it might just be an edge case. To ensure a good user experience, we will log it to Sentry (Not Winston) for fast investigation and resolution.
  // TODO: call sentry here
  return "We have encountered a strange error. Please try again later.";
}
