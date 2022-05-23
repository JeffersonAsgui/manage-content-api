import { Test, TestingModule } from '@nestjs/testing';
import { ContentDetailResolver } from './content-detail.resolver';

describe('ContentDetailResolver', () => {
  let resolver: ContentDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDetailResolver],
    }).compile();

    resolver = module.get<ContentDetailResolver>(ContentDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
