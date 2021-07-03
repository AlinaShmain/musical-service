import { Test, TestingModule } from '@nestjs/testing';
import { UserPlaylistsController } from './user-playlists.controller';

describe('UserPlaylistsController', () => {
  let controller: UserPlaylistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPlaylistsController],
    }).compile();

    controller = module.get<UserPlaylistsController>(UserPlaylistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
