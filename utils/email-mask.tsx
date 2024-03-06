const EmailMask = (email: string) => {
  const [name, domain] = email.split("@")
  const maskEmail = name?.slice(0, 4) + "****"
  const maskedEmail = maskEmail + "@" + domain
  return maskedEmail
}

export default EmailMask
