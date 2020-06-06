import { ChildEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { LoanableItem } from 'modules/common';

@ChildEntity('BOARD_GAME')
export class BoardGame extends LoanableItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  boardGameGeekUrl: string;
}
