import { IsString } from 'class-validator';

export class CreatPostDto {
  @IsString()
  readonly title: string;
}
