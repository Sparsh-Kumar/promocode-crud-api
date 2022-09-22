import {
  IsEnum, IsNotEmpty, IsNumberString, IsOptional,
} from 'class-validator';
import { PromocodeStatus } from '../types';

export default class GetPromoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(
    PromocodeStatus,
    {
      message: 'Status must be one of ACTIVE, IN_ACTIVE, PENDING_APPROVAL',
    },
  )
    status: PromocodeStatus;

  @IsOptional()
  @IsNotEmpty()
    searchTerm: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
    limit: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
    page: string;
}
