import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './schemas/quote.schema';

describe('QuotesService', () => {
  let quotesService: QuotesService;
  let quoteModel: Model<Quote>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getModelToken(Quote.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    quotesService = module.get<QuotesService>(QuotesService);
    quoteModel = module.get<Model<Quote>>(getModelToken(Quote.name));
  });

  it('debe encontrar una cotización por ID', async () => {
    jest.spyOn(quoteModel, 'findById').mockResolvedValue({ id: '1', quoteNumber: 'QUO12345' } as any);
    const result = await quotesService.getQuoteById('1');
    expect(result).toEqual({ id: '1', quoteNumber: 'QUO12345' });
  });

  it('debe crear una cotización', async () => {
    jest.spyOn(quoteModel, 'create').mockResolvedValue({ id: '1', quoteNumber: 'QUO12345' } as any);
    const result = await quotesService.createQuote('QUO12345', 'customer123', 'Seguro de vida', 'entity123');
    expect(result).toEqual({ id: '1', quoteNumber: 'QUO12345' });
  });
});
