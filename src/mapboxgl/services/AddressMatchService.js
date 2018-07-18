import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {AddressMatchService as CommonAddressMatchService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务。
 * @example
 * new mapboxgl.supermap.AddressMatchService(url,options)
 * .code(function(result){
 *     //doSomething
 * })
 * @param {string} url - 与客户端交互的服务地址。
 * @param {Object} options - 交互时所需可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @extends {mapboxgl.supermap.ServiceBase}
 */
export class AddressMatchService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {Object} params - 正向匹配参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    code(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.code(me.url + '/geocoding', params);
    }

    /**
     * @function mapboxgl.supermap.AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {Object} params -反向匹配参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    decode(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
    }

}

mapboxgl.supermap.AddressMatchService = AddressMatchService;