const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const $ = db.command.aggregate

async function getCount(collectionName) {
	let count = 0
	try {
		const countResult = await db.collection(collectionName).count()
		count = countResult.total
		
	  } catch (e) {}
	return count
}

async function getMasterialCount() {
	let count = 0
	try {
		const countResult = await db.collection('materials').aggregate()
		.group({
			_id: null,
			total: $.sum('$count')
		})
		.end();
		if (countResult && countResult.list && countResult.list.length) {
			count = countResult.list[0].total;
		}
		
	  } catch (e) {}
	return count
}

async function getTaskCount(finished) {
	let res = { total: 0, unhandled: 0, unfinish: 0, finished: 0 }
	try {
		const param = finished ? { status : 2 }: {};
		const countResult = await db.collection('tasks').where(param).count()
		res = countResult.total
	  } catch (e) {}
	return res
}

// 数据统计
exports.getStats = async(event, context) => {
	const res = {}
	res.aided_user = await getCount('aided_users');
	res.aided_demand = await getCount('aided_demands');
	res.donor = await getCount('donors');
	res.material = await getMasterialCount();
	res.task_finished = await getTaskCount(true);
	res.task_total = await getTaskCount(false);
	return res;
}