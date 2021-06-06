//区分生产环境还是开发环境
const url = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:8080" :
	"https://www.zgfujian.cn/index.php/";

/**
 * 获取openid
 */
export const getUserOpenid = url + "/user/getUserOpenid";
/**
 * 注册用户信息
 */
export const regUserInfo = url + "/user/regUser";
/**
 * 获取记账类型列表
 */
export const getKeepCountType = url + "/type/getTypeList";

/**
 * 添加账单
 */
export const addBillRecords = url + "/bill/addBillRecords";

/**
 * 获取账单列表
 */
export const getBillList=url+"/bill/getBillList";
