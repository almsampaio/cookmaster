class RecipeValidation {
    static async execute(request, response, next) {
        const { name, ingredients, preparation } = request.body;

        if (!name || !ingredients || !preparation) {
            return response.status(400).json({ message: 'Invalid entries. Try again.' });
        }

        return next();
    }
}

module.exports = RecipeValidation;
