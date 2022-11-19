const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 集合名称
const COLLECTION_NAME = 'tasks';

// 添加任务
exports.addTask = async (event, context) => {
	const {
		data
	  } = event
	  try {
		const param = data || {};
		param.createTime = new Date();
		param.updateTime = new Date();
		await db.collection(COLLECTION_NAME).add({
			data: param
		  })
		return {
		  success: true,
		  data: event.data
		};
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	  }
}

// 删除任务
exports.delTask = async (event, context) => {
	const {
		id,
	  } = event
	  try {
		await db.collection(COLLECTION_NAME).doc(id).remove()
		return {
		  success: true,
		  data: event.data
		};
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	  }
}

// 更新任务
exports.updateTask = async (event, context) => {
	const {
		id,
		data
	  } = event
	  try {
		const param = data || {};
		param.updateTime = new Date();
		await db.collection(COLLECTION_NAME).doc(id).update({
			data: param
		  })
		return {
		  success: true,
		  data: event.data
		};
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	  }
}

const MAX_LIMIT = 100
// 获取所有捐赠任务
exports.getAllTasks = async (event, context) => {
	let {
		page = 0,
		pageSize =  MAX_LIMIT
	} = event;
	pageSize = Math.min(pageSize, MAX_LIMIT);
	try {
		const countResult = await db.collection(COLLECTION_NAME).count()
		const total = countResult.total
		const res = await db.collection(COLLECTION_NAME).orderBy('createTime', 'desc').skip(page * pageSize).limit(pageSize).get();
		return {
		  success: true,
		  total: total,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 根据id查询任务
exports.getTaskById = async(event, context) => {
	const { id } = event;
	try {
		const res = await db.collection(COLLECTION_NAME).doc(id).get();
		return {
		  success: true,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 自定义条件查询任务
exports.getTaskByCondition = async(event, context) => {
	let {
		cond,
		page = 0,
		pageSize =  MAX_LIMIT
	} = event;
	pageSize = Math.min(pageSize, MAX_LIMIT);
	try {
		const res = await db.collection(COLLECTION_NAME).where(cond).skip(page * pageSize).limit(pageSize).get();
		return {
		  success: true,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 获取未领取的任务
exports.getUnhandledTasks = async (event, context) => {
	let {
		page = 0,
		pageSize =  MAX_LIMIT
	} = event;
	pageSize = Math.min(pageSize, MAX_LIMIT);
	try {
		const countResult = await db.collection(COLLECTION_NAME).where({ status: 0 }).count()
		const total = countResult.total
		const res = await db.collection(COLLECTION_NAME).where({ status: 0 }).skip(page * pageSize).limit(pageSize).get();
		return {
		  success: true,
		  total: total,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 领取任务
exports.receiveTask = async (event, context) => {
	const { task_id } = event;
	const { OPENID } = cloud.getWXContext()
	try {
		let success = true
		let code = 0
		let msg = ''
		const res = await db.collection(COLLECTION_NAME).doc(task_id).get();
		if (res && res.data) {
			const task = res.data
			if (task.status == 0) {
				// 未分配
				await db.collection(COLLECTION_NAME).doc(task_id).update({
					data: { handler_id: OPENID, status: 1}
				});
			} else {
				code = 1
				msg = '任务已被领取'
			}
		} else {
			code = 1
			msg = '任务不存在'
		}
		return {
		  success,
		  data: {
			  code,
			  msg
		  },
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 获取我的未完成的任务
exports.getMyUnhandledTasks = async (event, context) => {
	let {
		page = 0,
		pageSize =  MAX_LIMIT
	} = event;
	pageSize = Math.max(pageSize, MAX_LIMIT);
	const { OPENID } = cloud.getWXContext()
	try {
		const param = { status: 1, handler_id: OPENID };
		const countResult = await db.collection(COLLECTION_NAME).where(param).count()
		const total = countResult.total
		const res = await db.collection(COLLECTION_NAME).where(param).skip(page * pageSize).limit(pageSize).get();
		return {
		  success: true,
		  total: total,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

// 获取我的已完成的任务
exports.getMyHandledTasks = async (event, context) => {
	let {
		page = 0,
		pageSize =  MAX_LIMIT
	} = event;
	pageSize = Math.max(pageSize, MAX_LIMIT);
	const { OPENID } = cloud.getWXContext()
	try {
		const param = { status: 2, handler_id: OPENID };
		const countResult = await db.collection(COLLECTION_NAME).where(param).count()
		const total = countResult.total
		const res = await db.collection(COLLECTION_NAME).where(param).skip(page * pageSize).limit(pageSize).get();
		return {
		  success: true,
		  total: total,
		  data: res,
		}
	  } catch (e) {
		return {
		  success: false,
		  errMsg: e
		};
	}
}

