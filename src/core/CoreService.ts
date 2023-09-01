import { Injectable } from '@nestjs/common';
import { ParamsInterface } from 'src/interfaces/params.interface';

@Injectable()
export class CoreService {
  constructor(public model: any) {}
  async get(params: ParamsInterface) {
    return await this.model.get(params);
  }

  async getRaw(params: ParamsInterface) {
    return await this.model.getRaw(params);
  }

  async getSingle(params: ParamsInterface) {
    return await this.model.getSingle(params);
  }

  async create(data, get_id = false, table = null) {
    if (this.tryParseJSONObject(data.data)) data = JSON.parse(data.data);
    return await this.model.insert(data, get_id, table);
  }

  async createRaw(data, get_id = false, table = null) {
    if (this.tryParseJSONObject(data.data)) data = JSON.parse(data.data);
    return await this.model.insertRaw(
      Object.keys(data),
      Object.values(data),
      get_id,
      table,
    );
  }

  async createMany(data, get_id = false, table = null) {
    const toUpdate = [];
    return await Promise.all(
      await data.map(async (element) => {
        const has = await this.model.get({
          where: {
            userId: element.userId,
            consentId: element.consentId,
          },
        });
        if (has.length > 0) {
          await this.model.update({
            where: {
              id: has[0].id,
            },
            data: {
              value: element.value,
            },
          });
        } else {
          toUpdate.push(element);
        }
      }),
    ).then(async () => {
      if (toUpdate.length === 0) {
        return {
          status: true,
          data: 'Data already existed and were updated!',
        };
      }

      console.log(' to update - ', toUpdate);

      const inserted = await this.model.insertMany(toUpdate, get_id, table);
      return {
        status: true,
        data: inserted,
      };
    });
  }

  async update(data) {
    return await this.model.update(data);
  }

  async delete(param) {
    return await this.model.delete(param.id);
  }

  async softDelete(param) {
    return await this.model.softDelete(param.id);
  }

  tryParseJSONObject(jsonString) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {}

    return false;
  }
}
