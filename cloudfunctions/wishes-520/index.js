const materialHandler = require('./materials');
const donorHandler = require('./donors');
const aidedUserHandler = require('./aided_users');
const aidedDemandHandler = require('./aided_demands');
const taskHandler = require('./tasks');
const statHandler = require('./stat');

const handlers = [materialHandler, donorHandler, aidedUserHandler, aidedDemandHandler, taskHandler, statHandler]
const fnMap = {}

handlers.map((item) => {
  Object.keys(item).map((fnName) => {
    fnMap[fnName] = item[fnName]
  })
})

const DEF_FN = async () => ({ success: false, errMsg: '【type】值非法' });

// 云函数入口函数
exports.main = async (event, context) => {
  const type = event.type;
  let fn = fnMap[type] || DEF_FN;
  return await fn(event, context);
};