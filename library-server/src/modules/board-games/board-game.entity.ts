import { LibraryItem } from 'modules/common';
import { ChildEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ChildEntity('BOARD_GAME')
export class BoardGame extends LibraryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  minPlayers: number;

  @Column()
  maxPlayers: number;

  @Column()
  minPlayTime: number;

  @Column()
  maxPlayTime: number;

  @Column()
  boardGameAtlasId: string;

  @Column()
  boardGameAtlasUrl: string;

  @Column()
  officialUrl: string;

  @Column()
  rulesUrl: string;
}
