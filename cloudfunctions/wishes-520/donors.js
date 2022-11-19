const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 集合名称
const COLLECTION_NAME = 'donors';

// 添加捐助人
exports.addDonor = async (event, context) => {
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

// 删除捐助人
exports.delDonor = async (event, context) => {
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

// 更新捐助人
exports.updateDonor = async (event, context) => {
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
// 获取所有捐赠捐助人
exports.getAllDonors = async (event, context) => {
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

// 根据id查询捐助人
exports.getDonorById = async(event, context) => {
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

// 自定义条件查询捐助人
exports.getDonorByCondition = async(event, context) => {
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

