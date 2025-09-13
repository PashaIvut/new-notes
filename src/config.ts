import 'dotenv/config'

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUrl: process.env.MONGO_URL!,
}