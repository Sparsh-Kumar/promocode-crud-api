import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe,
} from '@nestjs/common';
import AddPromoDto from './dtos/addpromo.dto';
import GetPromoDto from './dtos/getpromo.dto';
import UpdatePromoDto from './dtos/updatepromo.dto';
import PromocodesService from './promocodes.service';
import { PromocodeDocument } from './schemas/promocode.schema';
import { PaginationDetails } from './types';

@Controller('promocodes')
export default class PromocodesController {
  constructor(
    private readonly _promocodesService: PromocodesService,
  ) {}

  @Get()
  public async getPromocodes(
    @Query(ValidationPipe) getPromoDto: GetPromoDto,
  ): Promise<{ promocodes: PromocodeDocument[], pagination: PaginationDetails }> | never {
    return this._promocodesService.getAll(getPromoDto);
  }

  @Get(':id')
  public async getPromocode(
    @Param('id') id: string,
  ): Promise<PromocodeDocument> | never {
    return this._promocodesService.getOne(id);
  }

  @Delete(':id')
  public async deletePromocode(
    @Param('id') _id: string,
  ): Promise<void> | never {
    return this._promocodesService.deletePromocode(_id);
  }

  @Patch(':id')
  public async updatePromocode(
    @Param('id') _id: string,
      @Body() updatePromoDto: UpdatePromoDto,
  ): Promise<PromocodeDocument> | never {
    return this._promocodesService.update(_id, updatePromoDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async add(@Body() addPromoDto: AddPromoDto): Promise<PromocodeDocument> | never {
    return this._promocodesService.add(addPromoDto);
  }
}
