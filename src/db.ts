import mongoose from 'mongoose'
import { config } from './config'

export async function connectDB() {
  await mongoose.connect(config.mongoUrl)
  mongoose.connection.on('err', (err) => console.error('[mongo]', err))
  console.log('[mongo] connected')
}