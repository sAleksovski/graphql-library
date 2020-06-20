import { LibraryItem } from 'modules/common';
import { ChildEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ChildEntity('BOARD_GAME')
export class BoardGame extends LibraryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  boardGameGeekUrl: string;
}
