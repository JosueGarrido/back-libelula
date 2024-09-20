import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Quote } from './schemas/quote.schema';
import { Model, Document } from 'mongoose';

type QuoteDocument = Quote & Document;

describe('QuotesService', () => {
  let quotesService: QuotesService;
  let quoteModel: Model<QuoteDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getModelToken(Quote.name),
          useValue: {
            
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: '1',
                quoteNumber: 'QUO123',
                customerId: 'customer123',
                policyDetails: 'Detalles de la póliza',
                entityId: 'entity123',
              }),
            }),
            
            new: jest.fn().mockImplementation((dto) => ({
              ...dto,
              save: jest.fn().mockResolvedValue(dto),
            })),
          },
        },
      ],
    }).compile();

    quotesService = module.get<QuotesService>(QuotesService);
    quoteModel = module.get<Model<QuoteDocument>>(getModelToken(Quote.name));
  });

  it('debe encontrar una cotización por ID', async () => {
    const result = await quotesService.getQuoteById('1');
    expect(result).toEqual({
      _id: '1',
      quoteNumber: 'QUO123',
      customerId: 'customer123',
      policyDetails: 'Detalles de la póliza',
      entityId: 'entity123',
    });
    expect(quoteModel.findById).toHaveBeenCalledWith('1');
  });
});
