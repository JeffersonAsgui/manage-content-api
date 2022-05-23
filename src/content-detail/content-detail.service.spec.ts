import { Test, TestingModule } from '@nestjs/testing';
import { ContentDetailService } from './content-detail.service';

describe('ContentDetailService', () => {
  let service: ContentDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDetailService],
    }).compile();

    service = module.get<ContentDetailService>(ContentDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
