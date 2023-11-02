import { CompanyRepo } from "../../../repo/company.repo";
import { RoomRepo } from "../../../repo/room.repo";
import { UserRepo } from "../../../repo/user.repo";

export class CompanyService {

  protected _companyRepo = new CompanyRepo();
  protected _roomRepo = new RoomRepo();
  protected _userRepo = new UserRepo();

  async getUsers(filter: { username?: string}): Promise<any> {
    return await this._userRepo.select(filter);
  }

  async getUserCompanies(filter: { companyIds: number[]}): Promise<any> {
    return await this._companyRepo.select(undefined, [{ fieldName:'id', data: filter.companyIds }]);
  }

  async getCompanies(filter: { name?: string}): Promise<any> {
    return await this._companyRepo.select(filter);
  }

  async getCompanyRooms(filter: { name?: string, companyId?: number}): Promise<any> {    
    return await this._roomRepo.select(filter);
  }

}
