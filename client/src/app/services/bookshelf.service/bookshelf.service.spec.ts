import { TestBed } from '@angular/core/testing';

import { BookshelfService } from './bookshelf.service';

describe('BookshelfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookshelfService = TestBed.get(BookshelfService);
    expect(service).toBeTruthy();
  });
});
