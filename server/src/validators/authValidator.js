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

export { validateForgetPassword, validateLoginUser }
