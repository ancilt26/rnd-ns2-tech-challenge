import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {

  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  async getUsers(filter: { username?: string }, pagination: { page: number; pageSize: number }): Promise<any> {
    const { page, pageSize } = pagination;
    const result = await this._userRepo.select(filter);

    return {
      data: result.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
      pagination: {
        totalOfRecord: result.length,
        totalOfPage: Math.ceil(result.length / pageSize),
        page,
        pageSize
      }
    }
  }

  async createUser(username: string) {
    const user = await this._userRepo.createUser(username)
    return user
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
