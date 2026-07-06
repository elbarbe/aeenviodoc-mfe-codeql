import { AppGlobalInfo } from '../app.appglobalinfo';
import { Util } from './app.utils';

/**
 * « Keeps information about an attribute »
 */
class AttributeCache {
    /** Attribute name */
    public name = '';
    /** Attribute value */
    public value = '';

    constructor(name: string, value: string) {
        this.name = name.toLowerCase();
        this.value = value;
    }
}

/**
 * Information of one instance in the cache
 */
export class InstanceCache {
    /** If the instance exists or not */
    public exist = false;
    /** Instance class name */
    public className = '';
    /** Instance oid */
    public oid: {} = {};
    /** Attribute values */
    public attributes: AttributeCache[] = [];

    constructor(className: string, oid: {}, attributes: string[]) {
        this.className = className;
        this.oid = oid;

        if (attributes) {
            for (const att of attributes) {
                this.attributes.push(new AttributeCache(att, ''));
            }
        }
    }

    /**
     * Returns the value of the attribute
     * @param attributeName Attribute name
     */
    public get(attributeName: string): string {
        let returnValue = '';
        const attLower = attributeName.toLowerCase().replace(new RegExp('[.]', 'g'), '-');
        for (const att of this.attributes) {
            if (att.name.toLowerCase().replace(new RegExp('[.]', 'g'), '-') === attLower) {
                returnValue = att.value;
                break;
            }
        }
        return returnValue;
    }

    /**
     * Return an array containing the names of missing attributes
     * @param attributes Required attributes
     */
    public returnMissingAttributes(attributes: string[]): string[] {

        if (!attributes) {
            return [];
        }
        const missingAtt: string[] = [];
        let found = false;
        for (const reqAtt of attributes) {
            found = false;
            for (const extAtt of this.attributes) {
                if (reqAtt.trim().toLowerCase() === extAtt.name) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                missingAtt.push(reqAtt.trim().toLowerCase());
            }
        }
        return missingAtt;
    }

    /**
     * Add the value of attributes to its collection
     * @param results Query results
     */
    public addResults(results: any): void {
        let attribute: AttributeCache | null = null;
        for (const key of Object.keys(results)) {
            attribute = null;
            for (const att of this.attributes) {
                if (att.name === key.toLowerCase()) {
                    attribute = att;
                    break;
                }
            }
            if (attribute) {
                attribute.value = results[key];
            } else {
                this.attributes.push(new AttributeCache(key, results[key]));
            }
        }
    }
}

/**
 * Pending instance query
 */
class InstancePending {
    /** Instance class name */
    public className = '';
    /** Instance oid */
    public oid: {} = {};
    /** Requested attribute names */
    public attributes: string[] = [];

    constructor(className: string, oid: {}, attributes: string[]) {
        this.className = className;
        this.oid = oid;
        this.attributes = attributes;
    }
}

/**
 * Utility class for dependency rules
 */
export class CacheDependencyRules {

    /* Execution counter */
    public counter = 0;
    /* Pending queries */
    private pendingQueries: InstancePending[] = [];
    /* Instance cache */
    private instanceCache: InstanceCache[] = [];

    constructor(private readonly appGlobalInfo: AppGlobalInfo, private readonly util: Util) {
    }

    /**
     * Adds a query instance to the pending list
     * @param className Class name
     * @param oid instance Oid
     * @param attributes Requested attributes
     */
    public addQueryInstance(className: string, oid: {}, attributes: string): void {
        if (!oid || !className || !attributes) {
            return;
        }
        const attributesLower: string = attributes.toLowerCase();
        let instanceInCache: InstanceCache | null = null;
        const attArray: string[] = this.getUniqueAttr(attributesLower);
        let missAtt: string[] = [];
        const myOid = JSON.parse(JSON.stringify(oid));
        // Check in the cache
        for (const instCache of this.instanceCache) {
            if (className.toLowerCase() === instCache.className.toLowerCase() &&
                JSON.stringify(myOid).toLowerCase() === JSON.stringify(instCache.oid).toLowerCase()) {
                instanceInCache = instCache;
                break;
            }
        }
        // Instance is in the cache, check for all required attributes
        if (instanceInCache) {
            missAtt = instanceInCache.returnMissingAttributes(attArray);
        } else {
            missAtt = attArray;
        }

        // If any attribute is pending, check the pending list
        if (missAtt.length > 0) {
            this.addPendingQuery(className, myOid, missAtt);
        }
    }

    /**
     * Returns an array containing non repeat attribute names
     * @param attributes Attributes
     */
    private getUniqueAttr(attributes: string): string[] {
        const attArray: string[] = [];
        const tempArray = attributes.split(',');

        let found = false;
        for (const reqAtt of tempArray) {
            found = false;
            for (const extAtt of attArray) {
                if (reqAtt.trim().toLowerCase() === extAtt.trim().toLowerCase()) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                attArray.push(reqAtt.trim().toLowerCase());
            }
        }
        return attArray;
    }

    /**
     * Add a pending query
     * @param className Class name
     * @param myOid Oid
     * @param attributes Attributes
     */
    private addPendingQuery(className: string, myOid: any, attributes: string[]): void {
        let instanceInPending: InstancePending | null = null;
        for (const pendQuery of this.pendingQueries) {
            if (className.toLowerCase() === pendQuery.className.toLowerCase() &&
                JSON.stringify(myOid).toLowerCase() === JSON.stringify(pendQuery.oid).toLowerCase()) {
                instanceInPending = pendQuery;
                break;
            }
        }
        // If not found, add to the pending list
        if (instanceInPending) {
            // Add the missing attributes to the list
            const pendingAtt = attributes.filter((i) => {
                return instanceInPending && instanceInPending.attributes.indexOf(i) < 0;
            });
            if (pendingAtt.length > 0) {
                instanceInPending.attributes = instanceInPending.attributes.concat(pendingAtt);
            }
        } else {
            this.pendingQueries.push(new InstancePending(className, myOid, attributes));
        }
    }

    /**
     * Clears all cache information
     */
    public clear(): void {
        this.pendingQueries = [];
        this.instanceCache = [];
    }

    /**
     * Launch all pending queries, wail for all of them and add results to the instance cache
     */
    public searchAll(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (this.pendingQueries.length > 0) {
                const promiseArr: Array<Promise<void>> = [];
                for (const pendingQuery of this.pendingQueries) {
                    promiseArr.push(this.getInstanceByOID(pendingQuery));
                }
                this.pendingQueries = [];
                Promise.all(promiseArr).then((results: any[]) => {
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Add the results to the instance cache
     * @param query Solved query
     * @param results Query results
     */
    private addToCache(query: InstancePending, results: any): void {
        if (!results) {
            return;
        }
        let instanceInCache: InstanceCache |  null = null;

        // Check in the cache
        for (const instCache of this.instanceCache) {
            if (query.className.toLowerCase() === instCache.className.toLowerCase() &&
                JSON.stringify(query.oid).toLowerCase() === JSON.stringify(instCache.oid).toLowerCase()) {
                instanceInCache = instCache;
                break;
            }
        }
        // Instance is not in the cache, add a new one
        if (!instanceInCache) {
            instanceInCache = new InstanceCache(query.className, query.oid, []);
            for (const att of query.attributes) {
                instanceInCache.attributes.push(new AttributeCache(att, ''));
            }
            this.instanceCache.push(instanceInCache);
        }
        instanceInCache.exist = true;

        instanceInCache.addResults(results);
    }

    /**
     * Launch a query instance by Oid
     * @param url URL to be used
     * @param data Request data
     */
    private getInstanceByOID(instance: InstancePending): Promise<void> {
        const url = `${this.appGlobalInfo.APPCONSTANTS.BASE_URL}/api/${instance.className}Api/Get${instance.className}Dynamic`;
        const request = {
            jsonOID: JSON.stringify(instance.oid),
            displaySetItems: instance.attributes.join()
        };
        if (typeof instance.oid === 'string') {
            request.jsonOID = instance.oid;
        }
        return new Promise<void>((resolve, reject) => {
            this.util.callHttpPost(url, request).then((res) => {
                this.addToCache(instance, (Object.keys(res.properties).length === 0 &&
                                            res.properties.constructor === Object ? null : res.properties));
                resolve();
            }).catch((msg) => {
                resolve();
            });
        });
    }

    /**
     * Returns the value of one attribute from the cache
     * @param className Class name
     * @param oid Instance Oid
     * @param attributeName Attribute name
     */
    public getValue(className: string, oid: {}, attributeName: string): string {
        let returnValue = '';
        const instanceInCache = this.getInstance(className, oid);
        // Instance is in the cache
        if (instanceInCache) {
            const attLower = attributeName.toLowerCase();
            returnValue = instanceInCache.get(attLower);
        }
        return returnValue;
    }

    /**
     * Returns the instance from he cache
     * @param className Class name
     * @param oid Instance oid
     */
    public getInstance(className: string, oid: {}): InstanceCache{
        let instanceInCache!: InstanceCache;
        // Check in the cache
        if (className && oid) {
            for (const inst of this.instanceCache) {
                if (className.toLowerCase() === inst.className.toLowerCase() &&
                    JSON.stringify(oid).toLowerCase() === JSON.stringify(inst.oid).toLowerCase()) {
                    instanceInCache = inst;
                    break;
                }
            }
        }

        return instanceInCache;
    }

    /**
     * Returns the value of several attributes in a single text
     * @param className Class name
     * @param oid Instance oid
     * @param attributes Attribute names
     * @param attDataTypes Attribute data types. Optional
     */
    public getText(className: string, oid: {}, attributes: string, attDataTypes: string[] = []): string {
        let textValue = '';

        const attArray: string[] = attributes.split(',');
        let i = 0;
        for (const att of attArray) {
            if (textValue.length > 0) {
                textValue += ' ';
            }
            if (attDataTypes && attDataTypes.length > i) {
                textValue += this.util.applyDefaultFormat(this.getValue(className, oid, att), attDataTypes[i]);
            } else {
                textValue += this.util.valueToString(this.getValue(className, oid, att));
            }
            i++;
        }

        return textValue;
    }


    /**
     * Returns in the instance exists or not
     * @param className Class name
     * @param oid Instance Oid
     */
    public existInstance(className: string, oid: {}): boolean {
        let returnValue = false;
        const instanceInCache = this.getInstance(className, oid);
        // Instance is in the cache
        if (instanceInCache) {
            returnValue = instanceInCache.exist;
        }
        return returnValue;
    }

    /**
     * Returns true if the execution limit has not been reached
     */
    public checkCounter(): boolean {
        if (this.counter > 200) {
            return false;
        }
        return true;
    }
}
