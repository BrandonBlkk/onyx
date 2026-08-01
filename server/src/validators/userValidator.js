const validateUpdateUser = (input = {}) => {
    const { fullname } = input ?? {}
    const updateFields = {}

    if (fullname !== undefined) {
        const trimmedFullname = fullname.trim()

        if (!trimmedFullname) {
            return { error: 'Fullname is required' }
        }

        updateFields.fullname = trimmedFullname
    }

    if (!Object.keys(updateFields).length) {
        return { error: 'No profile changes provided' }
    }

    return { value: updateFields }
}

const validateUpdatePreferences = (preferences) => {
    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) {
        return { error: 'Preferences are required' }
    }

    const updateFields = {}

    if (preferences.theme !== undefined) {
        updateFields.theme = preferences.theme
    }

    if (preferences.language !== undefined) {
        updateFields.language = preferences.language
    }

    const pageSize = preferences.pageSize ?? preferences.page_size
    if (pageSize !== undefined) {
        updateFields.page_size = pageSize === 'letter' ? 'us_letter' : pageSize
    }

    const autoSave = preferences.autoSave ?? preferences.auto_save
    if (autoSave !== undefined) {
        updateFields.auto_save = autoSave
    }

    const writingTips = preferences.writingTips ?? preferences.showTips ?? preferences.show_tips
    if (writingTips !== undefined) {
        updateFields.show_tips = writingTips
    }

    if (!Object.keys(updateFields).length) {
        return { error: 'No preference changes provided' }
    }

    return { value: updateFields }
}

export { validateUpdatePreferences, validateUpdateUser }
