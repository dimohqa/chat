import { Module } from '@nestjs/common';
import { DialogGateway } from './dialog.gateway';
import { DialogService } from './dialog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogSchema } from '../../schemas/dialog.schema';
import { Dialog } from '../../schemas/dialog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dialog.name,
        schema: DialogSchema,
      },
    ]),
  ],
  providers: [DialogGateway, DialogService],
})
export class DialogModule {}
