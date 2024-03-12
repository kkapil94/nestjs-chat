import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageSchemaDocument = HydratedDocument<MessageSchemaClass>;

enum By {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class MessageSchemaClass {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: () => By })
  by: By;

  @Prop({ type: Types.ObjectId, ref: 'Job' })
  Job: Types.ObjectId;
}

const MessageSchema = SchemaFactory.createForClass(MessageSchemaClass);
const MESSAGE_MODEL = MessageSchemaClass.name;
