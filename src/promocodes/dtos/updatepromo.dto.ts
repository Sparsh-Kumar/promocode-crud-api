import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PromocodeStatus, PromotionType } from '../types';

export default class UpdatePromoDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
    name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
    discount: number;

  @IsNotEmpty()
  @IsEnum(
    PromocodeStatus,
    {
      message: 'Status must be one of ACTIVE, IN_ACTIVE, PENDING_APPROVAL',
    },
  )
    status: PromocodeStatus;

  @IsNotEmpty()
  @IsEnum(
    PromotionType,
    {
      message: 'Promotion type must be one of PARTY_SHARE, GIFT_CARD',
    },
  )
    type: PromotionType;

  @IsNotEmpty()
  @IsDateString()
    startDate: string;

  @IsNotEmpty()
  @IsDateString()
    endDate: string;
}
