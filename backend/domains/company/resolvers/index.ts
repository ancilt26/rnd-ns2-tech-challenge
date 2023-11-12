import { CompanyService } from "../service";
export default {
  Query: {
    async Users(parent: any, args: any, context: any, info: any): Promise<any> {
      const { filter, pagination: { page, pageSize } } = args;

      const _companyService = new CompanyService();
      const { data, pagination } = await _companyService.getUsers(filter, { page, pageSize });
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
  Mutation: {
    createUser: async (parent: any, args: any, context: any, info: any) => {
      const _companyService = new CompanyService()
      return _companyService.createUser(args.username)
    }
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
      const data = await context.loaders.companyLoader.load(companyIds)
      return data;
    },
  }
};
