const FULL_NAME_PATTERN = /^[\p{L}\p{M} .'\u2019-]+$/u
const EMAIL_LOCAL_PATTERN = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i
const EMAIL_DOMAIN_PART_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i

const hasValidEmailFormat = (email) => {
    const emailParts = email.split('@')
    const [localPart, domain = ''] = emailParts
    const domainParts = domain.split('.')

    return (
        email.length <= 254 &&
        emailParts.length === 2 &&
        localPart.length > 0 &&
        localPart.length <= 64 &&
        EMAIL_LOCAL_PATTERN.test(localPart) &&
        !localPart.startsWith('.') &&
        !localPart.endsWith('.') &&
        !localPart.includes('..') &&
        domain.length <= 253 &&
        domainParts.length >= 2 &&
        domainParts.every((part) => EMAIL_DOMAIN_PART_PATTERN.test(part)) &&
        domainParts.at(-1).length >= 2
    )
}

const validateCreateUser = (input = {}) => {
    const fullname = typeof input?.fullname === 'string' ? input.fullname : ''
    const email = typeof input?.email === 'string' ? input.email : ''
    const password = typeof input?.password === 'string' ? input.password : ''
    const normalizedFullname = fullname.trim().replace(/\s+/g, ' ')
    const normalizedEmail = email.trim().toLowerCase()

    const rules = [
        {
            valid: normalizedFullname.length > 0,
            message: 'Please enter your full name',
        },
        {
            valid: normalizedEmail.length > 0,
            message: 'Please enter your email address',
        },
        {
            valid: password.trim().length > 0,
            message: 'Please enter a password',
        },
        {
            valid: normalizedFullname.length >= 2,
            message: 'Full name must be at least 2 characters long',
        },
        {
            valid: normalizedFullname.length <= 80,
            message: 'Full name must be 80 characters or fewer',
        },
        {
            valid: FULL_NAME_PATTERN.test(normalizedFullname),
            message: 'Full name can only contain letters, spaces, apostrophes, periods, and hyphens',
        },
        {
            valid: hasValidEmailFormat(normalizedEmail),
            message: 'Please enter a valid email address, such as name@example.com',
        },
        {
            valid: [...password].length >= 8,
            message: 'Password must be at least 8 characters long',
        },
        {
            valid: Buffer.byteLength(password, 'utf8') <= 72,
            message: 'Password must be 72 bytes or fewer',
        },
        {
            valid: /[a-z]/.test(password),
            message: 'Password must include a lowercase letter',
        },
        {
            valid: /[A-Z]/.test(password),
            message: 'Password must include an uppercase letter',
        },
        {
            valid: /[0-9]/.test(password),
            message: 'Password must include a number',
        },
        {
            valid: /[^A-Za-z0-9\s]/.test(password),
            message: 'Password must include a special character',
        },
    ]

    const failedRule = rules.find(({ valid }) => !valid)

    if (failedRule) {
        return { error: failedRule.message }
    }

    return {
        value: {
            fullname: normalizedFullname,
            email: normalizedEmail,
            password,
        },
    }
}

export default validateCreateUser
