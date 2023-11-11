import DataLoader from 'dataloader'
import { CompanyService } from '../service/index'

function getUniqueCompanyIds(companyIds: Array<number[]>): number[] {
    const uniqueCompanyIdSet = companyIds.reduce((acc: Set<number>, curr: number[]) => {
        curr.forEach(val => acc.add(val))
        return acc
    }, new Set())
    return Array.from(uniqueCompanyIdSet)
}

function getLookup(data: { id: number; name: string }[]) {
    return data.reduce((acc: { [key: number]: { id: number; name: string } }, curr: { id: number; name: string }) => {
        acc[curr.id] = curr
        return acc
    }, {})
}

export const companyLoader = new DataLoader(async (companyIds: Array<number[]>) => {
    const _companyService = new CompanyService();
    const uniqueCompanyIds = getUniqueCompanyIds(companyIds)
    const data = await _companyService.getUserCompanies({ companyIds: uniqueCompanyIds })
    const lookup = getLookup(data)
    const result = companyIds.map((ids: number[]) => ids.map(id => lookup[id])
    )
    return result
})