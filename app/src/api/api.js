import axios from 'axios';

const url = 'http://192.168.1.102:1883/api';

export function getAllFinances () {
	return new Promise((rs, rj) => {
		axios.get(`${url}/finance/all`).then(res => {
			rs(res);
		}).catch(err => {
			rj(err);
		});
	});
}

export function addBill (bill) {
	return new Promise((rs, rj) => {
		axios.post(`${url}/bill/add`, bill).then(res => {
			rs(res);
		}).catch(err => {
			rj(err);
		});
	});
}

export function getBillList () {
	return new Promise((rs, rj) => {
		axios.get(`${url}/bill/list`).then(res => {
			rs(res);
		}).catch(err => {
			rj(err);
		});
	});
}