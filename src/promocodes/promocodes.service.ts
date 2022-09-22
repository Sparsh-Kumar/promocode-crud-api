/* eslint-disable prefer-regex-literals */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import AddPromoDto from './dtos/addpromo.dto';
import GetPromoDto from './dtos/getpromo.dto';
import UpdatePromoDto from './dtos/updatepromo.dto';
import PromocodesRepository from './promocodes.repository';
import { PromocodeDocument } from './schemas/promocode.schema';
import { LooseObject, PaginationDetails, PromocodeStatus } from './types';

@Injectable()
export default class PromocodesService {
  constructor(
    private readonly _promocodeRepository: PromocodesRepository,
  ) {}

  public async getAll(getPromoDto: GetPromoDto): Promise<{
    promocodes: PromocodeDocument[],
    pagination: PaginationDetails
  }> | never {
    const {
      status,
      searchTerm,
      limit,
      page,
    }: {
      status: PromocodeStatus,
      searchTerm: string,
      limit: string,
      page: string,
    } = getPromoDto;

    const pageValue: number = (page ? +page : 1);
    const limitValue: number = (limit ? +limit : 5);
    const termValue: string = searchTerm || '';

    if ((pageValue < 0) || (limitValue < 0)) {
      throw new BadRequestException('Page and Limit cannot be negative.');
    }

    const startIndex: number = ((pageValue - 1) * limitValue);
    const endIndex: number = (pageValue * limitValue);

    const paginationDetail: PaginationDetails = {};

    if (startIndex > 0) {
      paginationDetail.previous = {
        page: pageValue - 1,
        limit: limitValue,
      };
    }

    paginationDetail.current = {
      page: pageValue,
      limit: limitValue,
    };

    const totalDocuments: number = await this._promocodeRepository.countDocuments({
      status,
      name: {
        $regex: termValue,
        $options: 'i',
      },
    });

    paginationDetail.totalDocs = totalDocuments;

    if (endIndex < totalDocuments) {
      paginationDetail.next = {
        page: pageValue + 1,
        limit: limitValue,
      };
    }

    const Query: LooseObject = {
      name: {
        $regex: termValue,
        $options: 'i',
      },
    };

    if (status) {
      Query.status = status;
    }

    const promocodes: PromocodeDocument[] = await this._promocodeRepository.findAll(
      Query,
      limitValue,
      startIndex,
    );

    return {
      promocodes,
      pagination: paginationDetail,
    };
  }

  public async getOne(_id: string): Promise<PromocodeDocument> | never {
    return this._promocodeRepository.findById(_id);
  }

  public async add(addPromoDto: AddPromoDto): Promise<PromocodeDocument> | never {
    const {
      name,
      startDate,
      endDate,
    }: {
      name: string,
      startDate: string,
      endDate: string,
    } = addPromoDto;

    if (
      new Date(endDate).getTime() < new Date(startDate).getTime()
    ) {
      throw new BadRequestException('startDate must be less than endDate.');
    }

    const promocodeExists: PromocodeDocument[] | void = await this._promocodeRepository.findAll({
      name,
    });
    if (promocodeExists.length) {
      throw new BadRequestException('Promocode with this name already exists.');
    }

    return this._promocodeRepository.create(addPromoDto);
  }

  public async update(
    _id: string,
    updatePromoDto: UpdatePromoDto,
  ): Promise<PromocodeDocument> | never {
    return this._promocodeRepository.updateById(_id, updatePromoDto);
  }

  public async deletePromocode(_id: string): Promise<void> | never {
    return this._promocodeRepository.deleteById(_id);
  }
}
