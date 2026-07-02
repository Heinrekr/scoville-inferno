import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(), // OlzHAs@GmAIl.com => olzhas@gmail.com
        password: vine.string(),
    })
)

export const registerValidator = vine.compile(
    vine.object({
        email: vine
            .string()
            .trim()
            .email()
            .normalizeEmail()
            .unique(async (db, value) => {
                // value => email с клиента
                const matchedUser = await db.from('users').select('id').where('email', value).first()
                return !matchedUser // true => email is unique, false => email is not unique
            }),
        password: vine
            .string()
            .trim()
            .minLength(8)
            .maxLength(128) // Защита от DoS-атак слишком длинными строками при хэшировании
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) // Требуем как минимум: 1 строчную, 1 заглавную, 1 цифру и 1 спецсимвол
            .confirmed(),
        fullName: vine.string().trim(),
    }),

)