import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async createCustomer(name: string, email: string, phone: string, entityId: string): Promise<Customer> {
    const customer = new this.customerModel({ name, email, phone, entityId });
    return customer.save();
  }

  async getCustomerById(id: string): Promise<Customer> {
    return this.customerModel.findById(id).exec();
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    return this.customerModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteCustomer(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
