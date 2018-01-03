import test from 'ava';
import 'babel-register';

import FinanceApi from '../../../../backend/src/api/finance';

test('Test all finances', async t => {
    let all = await FinanceApi.getAllFinance();
    t.is(all.length > 0, true);
})