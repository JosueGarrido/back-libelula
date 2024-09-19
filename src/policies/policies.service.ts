import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy, PolicyDocument } from './schemas/policy.schema';

@Injectable()
export class PoliciesService {
  constructor(@InjectModel(Policy.name) private policyModel: Model<PolicyDocument>) {}

  async createPolicy(policyNumber: string, customerId: string, details: string, entityId: string): Promise<Policy> {
    const policy = new this.policyModel({ policyNumber, customerId, details, entityId });
    return policy.save();
  }

  async getPolicyById(id: string): Promise<Policy> {
    return this.policyModel.findById(id).exec();
  }

  async updatePolicy(id: string, updates: Partial<Policy>): Promise<Policy> {
    return this.policyModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deletePolicy(id: string): Promise<Policy> {
    return this.policyModel.findByIdAndDelete(id).exec();
  }
}
