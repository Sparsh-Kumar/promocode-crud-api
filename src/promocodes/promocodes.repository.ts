import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AddPromoDto from './dtos/addpromo.dto';
import UpdatePromoDto from './dtos/updatepromo.dto';
import { Promocode, PromocodeDocument } from './schemas/promocode.schema';
import {
  LooseObject, PromocodeStatus, PromotionType,
} from './types';

@Injectable()
export default class PromocodesRepository {
  constructor(
    @InjectModel(Promocode.name) private readonly _promocodeModel: Model<PromocodeDocument>,
  ) {}

  public async findOne(filters: LooseObject): Promise<PromocodeDocument> | never {
    const promoCode: PromocodeDocument = await this._promocodeModel.findOne(filters);
    if (!promoCode) {
      throw new NotFoundException('Promocode with these values does not exist.');
    }
    return promoCode;
  }

  public async findById(id: string): Promise<PromocodeDocument> {
    const promoCode: PromocodeDocument = await this._promocodeModel.findById(id);
    if (!promoCode) {
      throw new NotFoundException('Promocode with these values does not exist.');
    }
    return promoCode;
  }

  public async updateById(
    _id: string,
    updatePromoDto: UpdatePromoDto,
  ): Promise<PromocodeDocument> | never {
    await this.findById(_id);
    const {
      name,
      discount,
      status,
      type,
      startDate,
      endDate,
    }: {
      name: string,
      discount: number,
      status: PromocodeStatus,
      type: PromotionType,
      startDate: string,
      endDate: string,
    } = updatePromoDto;

    return this._promocodeModel.findOneAndUpdate({
      _id,
    }, {
      $set: {
        name,
        discount,
        status,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    }, {
      upsert: true, new: true, runValidators: true, context: 'query',
    });
  }

  public async countDocuments(filters: LooseObject): Promise<number> {
    return this._promocodeModel.countDocuments(filters);
  }

  public async findAll(
    filters: LooseObject,
    limit = 5,
    skip = 0,
  ): Promise<PromocodeDocument[]> | never {
    return this._promocodeModel.find(filters).limit(limit).skip(skip);
  }

  public async deleteById(_id: string): Promise<void> | never {
    await this.findById(_id);
    return this._promocodeModel.findOneAndDelete({ _id });
  }

  public async create(addPromoDto: AddPromoDto): Promise<PromocodeDocument> | never {
    const {
      name,
      discount,
      status,
      type,
      startDate,
      endDate,
    }: {
      name: string,
      discount: number,
      status: PromocodeStatus,
      type: PromotionType,
      startDate: string,
      endDate: string,
    } = addPromoDto;

    return this._promocodeModel.create({
      name,
      discount,
      status,
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  }
}
