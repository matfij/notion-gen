/* tslint:disable */
/* eslint-disable */
/**
 * generator
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface CreateProjectParams
 */
export interface CreateProjectParams {
    /**
     * 
     * @type {string}
     * @memberof CreateProjectParams
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof CreateProjectParams
     */
    'notionId': string;
    /**
     * 
     * @type {string}
     * @memberof CreateProjectParams
     */
    'notionName': string;
    /**
     * 
     * @type {string}
     * @memberof CreateProjectParams
     */
    'notionAccessCode': string;
}
/**
 * 
 * @export
 * @interface GenerateParams
 */
export interface GenerateParams {
    /**
     * 
     * @type {string}
     * @memberof GenerateParams
     */
    'projectId': string;
}
/**
 * 
 * @export
 * @interface Project
 */
export interface Project {
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    'notionId': string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    'notionName': string;
    /**
     * 
     * @type {string}
     * @memberof Project
     */
    'notionAccessCode': string;
    /**
     * 
     * @type {number}
     * @memberof Project
     */
    'createdAt'?: number;
}

/**
 * GeneratorApi - axios parameter creator
 * @export
 */
export const GeneratorApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateProjectParams} createProjectParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createProject: async (createProjectParams: CreateProjectParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'createProjectParams' is not null or undefined
            assertParamExists('createProject', 'createProjectParams', createProjectParams)
            const localVarPath = `/generator/createProject`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(createProjectParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {GenerateParams} generateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generate: async (generateParams: GenerateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'generateParams' is not null or undefined
            assertParamExists('generate', 'generateParams', generateParams)
            const localVarPath = `/generator/generate`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(generateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GeneratorApi - functional programming interface
 * @export
 */
export const GeneratorApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GeneratorApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CreateProjectParams} createProjectParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createProject(createProjectParams: CreateProjectParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Project>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createProject(createProjectParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {GenerateParams} generateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async generate(generateParams: GenerateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.generate(generateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GeneratorApi - factory interface
 * @export
 */
export const GeneratorApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GeneratorApiFp(configuration)
    return {
        /**
         * 
         * @param {CreateProjectParams} createProjectParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createProject(createProjectParams: CreateProjectParams, options?: any): AxiosPromise<Project> {
            return localVarFp.createProject(createProjectParams, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {GenerateParams} generateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generate(generateParams: GenerateParams, options?: any): AxiosPromise<string> {
            return localVarFp.generate(generateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GeneratorApi - object-oriented interface
 * @export
 * @class GeneratorApi
 * @extends {BaseAPI}
 */
export class GeneratorApi extends BaseAPI {
    /**
     * 
     * @param {CreateProjectParams} createProjectParams 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneratorApi
     */
    public createProject(createProjectParams: CreateProjectParams, options?: AxiosRequestConfig) {
        return GeneratorApiFp(this.configuration).createProject(createProjectParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {GenerateParams} generateParams 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GeneratorApi
     */
    public generate(generateParams: GenerateParams, options?: AxiosRequestConfig) {
        return GeneratorApiFp(this.configuration).generate(generateParams, options).then((request) => request(this.axios, this.basePath));
    }
}


