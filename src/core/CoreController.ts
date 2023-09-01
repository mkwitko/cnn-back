import { Get, Post, Query, Request } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

export class CoreController {
  public debug = false;
  public convertToJson = true;

  constructor(protected service: any) {}
  /* 
  This code refers to the parent controller, responsible for 'automatically' creating the routes to all child controllers and automatically generating the query to the database from any parameter passed trought body.
  */

  private async getQuery(query, isRaw = false) {
    const params: ParamsInterface = {};
    Object.keys(query).forEach((e) => {
      if (this.isJson(query[e])) {
        params.where = {
          [e]: {
            in: JSON.parse(query[e]),
          },
        };
      } else {
        params.where = { ...params.where, [e]: query[e] };
      }
    });
    const where = isRaw ? this.whereRaw() : await this.where();

    params.where = { ...params.where, ...where };

    if (isRaw) {
      if (this.orderByRaw()) params.order_by = this.orderByRaw();
      if (this.includeRaw()) params.include = this.includeRaw();
      if (this.selectRaw()) params.select = this.selectRaw();
    } else {
      if (this.orderBy()) params.order_by = this.orderBy();
      if (this.include().include) params.include = this.include().include;
      if (Object.entries(this.select()).length > 0)
        params.select = this.select();
    }

    return params;
  }

  @Get()
  async get(@Query() query) {
    console.log(query);
    const params: ParamsInterface = await this.getQuery(query);

    const result = await this.service.get(params);
    return {
      status: Array.isArray(result)
        ? result.length > 0
        : Object.keys(result).length > 0,
      data: result,
    };
  }

  @Get('/raw')
  async getRaw(@Query() query) {
    const isRaw = true;
    const params: ParamsInterface = await this.getQuery(query, isRaw);
    const result = await this.service.getRaw(params);
    return {
      status: Array.isArray(result)
        ? result.length > 0
        : Object.keys(result).length > 0,
      data: result,
    };
  }

  @Post()
  async post(@Request() req): Promise<any> {
    const { status, data } = await this.service.create(this.reqBody(req));
    return {
      status,
      data,
    };
  }

  @Post('/many')
  async postMany(@Request() req): Promise<any> {
    const { status, data } = await this.service.createMany(req.body[0]);

    return {
      status,
      data,
    };
  }

  @Post('/update')
  async update(@Request() req) {
    const { status, data } = await this.service.update(this.reqBody(req));

    return {
      status,
      data,
    };
  }

  @Post('/delete')
  async delete(@Request() req) {
    const { status, data } = await this.service.delete(this.reqBody(req));
    return {
      status,
      data,
    };
  }

  @Post('/softDelete')
  async softDelete(@Request() req) {
    const { status, data } = await this.service.softDelete(this.reqBody(req));
    return {
      status,
      data,
    };
  }

  select(): any {
    return {};
  }

  async where(): Promise<any> {
    return [];
  }

  include(): any {
    return [];
  }

  orderBy(): any {
    return [];
  }

  selectRaw(): any {
    return {};
  }

  whereRaw(): any {
    return [];
  }

  includeRaw(): any {
    return [];
  }

  orderByRaw(): any {
    return [];
  }

  reqQuery(query) {
    let params: any = {};
    Object.keys(query).forEach((e) => {
      params = { ...params, [e]: query[e] };
    });
    return params;
  }

  reqBody(req) {
    let params: any = {};
    Object.keys(req.body).forEach((e) => {
      const param = this.isJson(req.body[e])
        ? JSON.parse(req.body[e])
        : req.body[e];

      params = { ...params, [e]: param };
    });

    return params;
  }

  private isJson(jsonString) {
    if (!this.convertToJson) {
      return false;
    }
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {}
  }
}
