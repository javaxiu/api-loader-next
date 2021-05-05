/**
 * 由api-loader加载识别*.api.ts的文件
 * 使用文档: https://yuque.antfin-inc.com/recore/docs/api-loader
 */
import * as jsonp from '@ali/api-runtime/lib/request/jsonp';
import * as ajax from '@ali/api-runtime/lib/request/ajax';

interface Guest {
  name: string;
}

export type TUser = {
  /** @mockjs guid */
  workNo: string;
  /** @mockjs name */
  name: string;
  /** @mockjs cname */
  nickName?: string;
  myItem?: TItem; // 与 TIem 双向依赖, 自动 mock 时无论是否有问号, 会强制认为是 optional
  children: TUser[] | Guest; // 自嵌套, 同样当做 optional 处理
};

export type TItem = {
  /** @mockjs guid */
  id: string;
  /** @mockjs name */
  name: string;
  type: 'TypeA' | 'TypeB' | 'Type';
  creator: TUser; // 与 TUser 双向依赖
  /** @mockjs datetime('yyyy-MM-dd HH:mm:ss') */
  created_at: string;
};

export type TListData = {
  currentPage: number;
  /** @length 4 */
  data: TItem[];
  totalCount: number;
};

/**
 * list1 数据接口
 * @kind jsonp
 * @host https://mocks.alibaba-inc.com
 * @baseUrl /mock/api-loader
 * @header {}
 */
declare class ListApi {
  /**
   * 读取表格数据
   * @url /user.json
   * @mock true
   * @param currentPage 当前页码
   * @param keyword 搜索查询参数，注意如果传入的是一个对象，后端收到的是一个 JSON 字符串
   */
  @jsonp.willFetch((config) => {
    console.log('jsonp timeout', config.timeout);
    return config;
  })
  @jsonp.didFetch(data => {
    console.log(data);
    return data;
  })
  getListData(currentPage: number, keyword: string): Promise<TListData>;
}

class ListApiMock{
  getListData() {
    return {currentPage: 1, data: [], totalCount: 10}
  }
}

export default new ListApi();
