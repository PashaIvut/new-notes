import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  content?: string | null;
  folder?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    default: null
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  }
}, {
  timestamps: true 
});

NoteSchema.index({ folder: 1 });

export const Note = mongoose.model<INote>('Note', NoteSchema);
