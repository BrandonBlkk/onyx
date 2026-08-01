const validateFavoriteState = (input = {}) => {
    const { favorite } = input ?? {}

    if (typeof favorite !== 'boolean') {
        return { error: 'Favorite state is required' }
    }

    return { value: { favorite } }
}

export { validateFavoriteState }
