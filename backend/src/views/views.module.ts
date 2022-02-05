import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { View } from './entities/view.entity';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';

@Module({
  imports: [TypeOrmModule.forFeature([View]), CampaignsModule],
  controllers: [ViewsController],
  providers: [ViewsService],
  exports: [ViewsService],
})
export class ViewsModule {}
