import { CompanyService } from "../service";
export default {
  Query: {
    async Users(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter, pagination: { limit, offset } } = args;

      const _companyService = new CompanyService();
      const { data, pagination } = await _companyService.getUsers(filter, { limit, offset });
      return { data, meta: { pagination } };
    },
    async Companies(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter } = args;
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanies(filter);
      return { data };
    },
    async Rooms(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter } = args;
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanyRooms(filter);
      return { data };
    },
  },
  CompanyType: {
    async rooms(parent: any, args: any, context: any, info: any): Promise<any> {
      const { id } = parent
      const _companyService = new CompanyService();
      const data = await _companyService.getCompanyRooms({ companyId: id });
      return data;
    },
  },
  UserType: {
    async companies(parent: any, args: any, context: any, info: any): Promise<any> {
      const { companyIds } = parent
      const _companyService = new CompanyService();
      const data = await _companyService.getUserCompanies({ companyIds });
      return data;
    },
  }
};
