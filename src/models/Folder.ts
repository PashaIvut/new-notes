import mongoose, { Schema, Document } from 'mongoose';

export interface IFolder extends Document {
  id: mongoose.Types.ObjectId;
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  }
}, {
  timestamps: true // автоматически добавляет createdAt и updatedAt
});

// Индекс для быстрого поиска по родительской папке
FolderSchema.index({ parent: 1 });

export const Folder = mongoose.model<IFolder>('Folder', FolderSchema);
