import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';
import { LogicError, RequestError, QueryResponse } from './answerRequestInformation';

/**
 * « Abstract class for wrapper classes »
 */
export abstract class AbstractServices {

    constructor(
        protected readonly appGlobalInfo: AppGlobalInfo,
        protected readonly util: Util,
        protected readonly className: string) {
    }

    /**
     * Call to filter query in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param filter Filter
     */
    public queryByFilter(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        filter: { name: string, variables: any[] }): Promise<QueryResponse> {
        const queryByFilter = this.util.getQueryRequest(displaySetItems, [filter], orderCriteria, instancesPerPage);
        queryByFilter.pageNumber = pageNumber;
        return new Promise<QueryResponse>((resolve, reject) => {
            this.util.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/GetPopulationDynamic`,
                queryByFilter).then((response: any) => {
                const possibleError = new LogicError(response);
                if (possibleError.IsError()) {
                    reject(possibleError);
                } else {
                    resolve(new QueryResponse(response));
                }
            }).catch((errorResponse: any) => {
                reject( new RequestError(errorResponse));
            });
        });
    }

    /**
     * Call to related query in the backend
     * @param displaySetItems Attributes
     * @param orderCriteria Oreder criteria name
     * @param instancesPerPage Elements per page
     * @param pageNumber Page number
     * @param oidRelated Oid of related instance
     * @param roleName Role name
     */
    protected queryByRelated(
        displaySetItems: string, orderCriteria: string, instancesPerPage: number, pageNumber: number,
        oidRelated: any, roleName: string): Promise<QueryResponse> {
        const filterByRelated = this.util.getFilterByRelated(roleName, oidRelated);
        const queryRequest = this.util.getQueryRequest(displaySetItems, [filterByRelated], orderCriteria, instancesPerPage);
        queryRequest.pageNumber = pageNumber;
        return new Promise<QueryResponse>((resolve, reject) => {
            this.util.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/GetPopulationDynamic`,
                queryRequest).then((response: any) => {
                const possibleError = new LogicError(response);
                if (possibleError.IsError()) {
                    reject(possibleError);
                } else {
                    resolve(new QueryResponse(response));
                }
            }).catch((errorResponse: any) => {
                reject( new RequestError(errorResponse));
            });
        });
    }

    /**
     * Call to service in the backend
     * @param serviceName Service name
     * @param request Request containing inbound arguments in JSON format
     */
    protected callService(serviceName: string, request: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.util.callHttpPost(
                `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${this.className}Api/${serviceName}`,
                request).then((response: any) => {
                const possibleError = new LogicError(response);
                if (possibleError.IsError()) {
                    reject(possibleError);
                } else {
                    resolve(response);
                }
            }).catch((errorResponse: any) => {
                reject( new RequestError(errorResponse));
            });
        });
    }
}
