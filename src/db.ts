import mongoose from 'mongoose'
import { config } from './config'
import './models/Folder' 
import './models/Note'

export async function connectDB() {
  await mongoose.connect(config.mongoUrl)
  mongoose.connection.on('err', (err) => console.error('[mongo]', err))
  console.log('[mongo] connected')
}

export { Folder } from './models/Folder'
export { Note } from './models/Note'