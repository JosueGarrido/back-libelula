import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

describe('QuotesController', () => {
  let quotesController: QuotesController;
  let quotesService: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        {
          provide: QuotesService,
          useValue: {
            getQuoteById: jest.fn().mockResolvedValue({ id: '1', quoteNumber: 'QUO12345', policyDetails: 'Seguro de vida' }),
            createQuote: jest.fn().mockResolvedValue({ id: '1', quoteNumber: 'QUO12345', policyDetails: 'Seguro de vida' }),
          },
        },
      ],
    }).compile();

    quotesController = module.get<QuotesController>(QuotesController);
    quotesService = module.get<QuotesService>(QuotesService);
  });

  it('debe retornar una cotización por ID', async () => {
    const result = await quotesController.getQuoteById('1');
    expect(result).toEqual({ id: '1', quoteNumber: 'QUO12345', policyDetails: 'Seguro de vida' });
  });

  it('debe crear una cotización', async () => {
    const result = await quotesController.createQuote({
      quoteNumber: 'QUO12345',
      customerId: 'customer123',
      policyDetails: 'Seguro de vida',
      entityId: 'entity123',
    });
    expect(result).toEqual({ id: '1', quoteNumber: 'QUO12345', policyDetails: 'Seguro de vida' });
  });
});
