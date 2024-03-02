
const expectedFieldNames = ['username', 'email', 'password', 'oldPassword'];
const expectedFieldCamps = ['username', 'email', 'password'];
const expectedFieldNamesPost = ['title', 'text', 'category'];
export const validateFieldNames = (req, res, next) => {
    const fieldNames = Object.keys(req.body);

    const hasUnexpectedFields = fieldNames.some(fieldName => !expectedFieldNames.includes(fieldName));

    if (hasUnexpectedFields) {
        return res.status(400).json({
            msg: 'Nombres de campos inválidos.', expectedFieldNames
        });
    }

    next();
};

export const validateFieldsRegister = (req, res, next) => {
    const fieldNames = Object.keys(req.body);

    const hasUnexpectedFields = fieldNames.some(fieldName => !expectedFieldCamps.includes(fieldName));

    if (hasUnexpectedFields) {
        return res.status(400).json({
            msg: 'Nombres de campos inválidos.', expectedFieldCamps
        });
    }

    next();
};

export const validateFieldsPost = (req, res, next) => {
    const fieldNames = Object.keys(req.body);

    const hasUnexpectedFields = fieldNames.some(fieldName => !expectedFieldNamesPost.includes(fieldName));

    if (hasUnexpectedFields) {
        return res.status(400).json({
            msg: 'Nombres de campos inválidos.', expectedFieldNamesPost
        });
    }

    next();
}