import { CollideModule } from './collide.module';

describe('CollideModule', () => {
  let collideModule: CollideModule;

  beforeEach(() => {
    collideModule = new CollideModule();
  });

  it('should create an instance', () => {
    expect(collideModule).toBeTruthy();
  });
});
