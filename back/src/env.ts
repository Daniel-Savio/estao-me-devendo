// Esse arquivo valida minhas variáveis ambiente, para saber se ta tudo certo

import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env) // O parse vai validar a tipagem do meu process.env com o scheema acima