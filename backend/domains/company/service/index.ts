import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {

  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  async getUsers(filter: { username?: string }, pagination: { limit: number; offset: number }): Promise<any> {
    const { offset, limit } = pagination;
    const result = await this._userRepo.select(filter);

    return {
      data: result.slice(offset, offset + limit), 
      pagination: {
        totalOfRecord: result.length,
        totalOfPage: Math.ceil(result.length / limit),
        page: Math.floor(offset / limit) + 1,
        pageSize: limit
      }
    }
  }

  async getUserCompanies(filter: { companyIds: number[] }): Promise<any> {
    return await this._companyRepo.select(undefined, [{ fieldName: 'id', data: filter.companyIds }]);
  }

  async getCompanies(filter: { name?: string }): Promise<any> {
    return await this._companyRepo.select(filter);
  }

  async getCompanyRooms(filter: { name?: string, companyId?: number }): Promise<any> {
    return await this._roomRepo.select(filter);
  }

}
