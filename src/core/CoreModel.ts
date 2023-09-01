export class CoreModel {
  table = '';
  stringifyFields = [];
  zeroInFrontFields = [];
  numberFields = [];
  dataFields: string[] = [];
  arrayNumberfy = false;
  protected filter: any = {};

  constructor(protected db: any) {}

  async get(params, table = null, precision = true) {
    console.log(this.filtering(params, precision));
    return await this.db[table ? table : this.table].findMany(
      this.filtering(params, precision),
    );
  }

  async getRaw(params) {
    let sql = '';
    if (params.select && params.select.query) {
      sql += `${params.select.query}`;
    } else {
      sql += `SELECT *`;
    }
    sql += ` FROM ${this.table}`;
    if (params.include && params.include.query) {
      sql += ` ${params.include.query}`;
    }
    if (params.where) {
      Object.keys(params.where).forEach((e, i) => {
        if (this.isObject(params.where[e])) {
          Object.keys(params.where[e]).forEach((e2, i2) => {
            if (e2 === 'in') {
              sql += ` ${i2 === 0 ? 'WHERE' : 'AND'} ${e} ${e2} (${params.where[
                e
              ][e2].map((e3) => {
                if (typeof e3 === 'string') {
                  return `'${e3}'`;
                }
                return e3;
              })})`;
            }
          });
        } else {
          if (typeof params.where[e] === 'string') {
            sql += ` ${i === 0 ? 'WHERE' : 'AND'} ${e} = '${params.where[e]}'`;
          } else {
            sql += ` ${i === 0 ? 'WHERE' : 'AND'} ${e} = ${params.where[e]}`;
          }
        }
      });
    }
    if (params.orderBy) {
    }

    const result = await this.db.$queryRawUnsafe(sql);
    return result;
  }

  async getSingle(params, table = null) {
    return await this.db[table ? table : this.table].findFirst(
      this.filtering(params),
    );
  }

  async insert(data, getId = false, table = null): Promise<any> {
    const created = await this.db[table ? table : this.table].create(
      this.filtering({ data }),
    );
    return getId ? this.get_id() : created;
  }

  async insertMany(data, getId = false, table = null): Promise<any> {
    const created = await this.db[table ? table : this.table].createMany(
      this.filtering({ data }),
    );
    return getId ? this.get_id() : created;
  }

  async insertRaw(keys, values, getId = false, table = null) {
    return await this.db.$transaction(async (prisma) => {
      const insert = await prisma.$queryRawUnsafe(`
         INSERT INTO ${table ? table : this.table} (${keys})
         VALUES (${values.map((e) => {
           if (typeof e === 'string') {
             return `'${e}'`;
           }
           return e;
         })})
         SELECT @@IDENTITY AS id
         `);
      return getId ? this.get_id() : insert;
    });
  }

  async update(params, table = null): Promise<any> {
    return await this.db[table ? table : this.table].update(
      this.filtering(params),
    );
  }

  async delete(id, table = null): Promise<any> {
    return await this.db[table ? table : this.table].delete({
      where: {
        id: +id,
      },
    });
  }

  async softDelete(id, table = null): Promise<any> {
    return await this.db[table ? table : this.table].update({
      where: {
        id: +id,
      },
      data: {
        status: 0,
        deleted: new Date(),
      },
    });
  }

  async get_id(table = null): Promise<any> {
    const lastInsertedIds = await this.db.$queryRaw`
      SELECT IDENT_CURRENT(${table ? table : this.table}) AS lastInsertedId;
    `;
    return lastInsertedIds;
  }

  filtering(params, precision = true) {
    this.filter = {};
    if (params.count) {
      this.filter.count = this.count(params);
    } else if (params.select) {
      this.filter.select = this.select(params);
    }

    if (params.include) {
      this.filter.include = params.include;
    }

    if (params.data) {
      this.filter.data = params.data;
    }

    this.dataFields.forEach((e) => {
      console.log(e);
      if (params[e]) {
        this.filter.data = { ...params.data, [e]: params[e] };
      }
    });

    this.id(params);
    this.limit(params);
    this.order_by(params);
    this.where(params);
    this.group_by(params);

    const select = this.filter.select;
    delete this.filter['select'];
    this.filter = precision ? this.fix_precision(this.filter) : this.filter;
    this.filter.select = select;

    return this.filter;
  }

  protected count(params) {
    return params.count;
  }

  protected select(params) {
    return params.select;
  }

  protected id(params) {
    if (params.id && !params.sequency) {
      this.filter.where = { id: params.id };
    }
    if (params.sequency && !params.id) {
      this.filter.where = { ...this.filter.where, sequency: params.sequency };
    }

    if (params.id && params.sequency) {
      this.filter.where = {
        id_sequency: {
          id: params.id,
          sequency: params.sequency,
        },
      };
    }
  }

  protected where(params) {
    if (params.where) {
      this.filter.where = { ...this.filter.where, ...params.where };
    }
  }

  protected limit(params) {
    if (params.limit) {
      this.filter.take = params.limit;
    }

    if (params.offset) {
      this.filter.skip = params.offset;
    }
  }

  protected order_by(params) {
    if (params.order_by) {
      this.filter.orderBy = params.order_by;
    } else {
      // this.filter.orderBy = [{ created: 'asc' }, { id: 'asc' }];
    }
  }

  protected group_by(params) {
    if (params.group_by) {
      this.filter.groupBy = params.group_by;
    }
  }

  private isObject(obj) {
    return typeof obj == 'object' && obj != null;
  }

  private fix_precision(filter) {
    Object.keys(filter).forEach((key) => {
      this.mapping(key, filter[key], filter);
    });
    return filter;
  }

  private mapping(key, values, filter, oldValue?) {
    if (this.isObject(values)) {
      Object.keys(values).forEach((key) => {
        this.mapping(key, values[key], filter, values);
      });
    } else {
      this.pipe(key, values, oldValue);
    }
  }

  private pipe(key, value, oldValue) {
    if (value != null) {
      if (this.stringifyFields.includes(key) && typeof value != 'string') {
        value = value.toString().trim();
      }
      if (typeof value != 'number') {
        if (
          this.numberFields.includes(key) ||
          (/^\d+$/.test(key) && this.arrayNumberfy)
        ) {
          value = +value;
        }
      }
      if (this.zeroInFrontFields.includes(key) && value.length == 1) {
        value = '0' + value;
      }
    }
    return oldValue ? (oldValue[key] = value) : (key = value);
  }
}
