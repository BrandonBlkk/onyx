const validateLoginUser = (input = {}) => {
    const { email, password } = input ?? {}

    if (!email || !password) {
        return { error: 'Email, and password are required' }
    }

    return {
        value: {
            email: email.trim().toLowerCase(),
            password,
        },
    }
}

const validateForgetPassword = (input = {}) => {
    const { email } = input ?? {}

    if (!email) {
        return { error: 'Email is required' }
    }

    return {
        value: {
            email: email.trim().toLowerCase(),
        },
    }
}

const validateResetPassword = (input = {}) => {
    const password = typeof input?.password === 'string' ? input.password : ''

    const rules = [
        {
            valid: password.trim().length > 0,
            message: 'Please enter a password',
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

    return { value: { password } }
}

export { validateForgetPassword, validateLoginUser, validateResetPassword }
