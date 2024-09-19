import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoliciesService } from './policies.service';
import { PoliciesController } from './policies.controller';
import { Policy, PolicySchema } from './schemas/policy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }]),
  ],
  providers: [PoliciesService],
  controllers: [PoliciesController],
  exports: [PoliciesService]
})
export class PoliciesModule {}
