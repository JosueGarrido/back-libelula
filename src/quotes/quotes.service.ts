import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote, QuoteDocument } from './schemas/quote.schema';

@Injectable()
export class QuotesService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>) {}

  async createQuote(quoteNumber: string, customerId: string, policyDetails: string, entityId: string): Promise<Quote> {
    const quote = new this.quoteModel({ quoteNumber, customerId, policyDetails, entityId });
    return quote.save();
  }

  async getQuoteById(id: string): Promise<Quote> {
    return this.quoteModel.findById(id).exec();
  }

  async updateQuote(id: string, updates: Partial<Quote>): Promise<Quote> {
    return this.quoteModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteQuote(id: string): Promise<Quote> {
    return this.quoteModel.findByIdAndDelete(id).exec();
  }
}
