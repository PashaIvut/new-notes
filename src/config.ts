export const config = {
  port: Number(process.env.PORT ?? 4001),
  mongoUrl: process.env.MONGO_URL!,
}