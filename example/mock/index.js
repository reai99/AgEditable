import Mock from 'mockjs';
import moment from 'moment';

export const getRowData = () => {
  return { 
    'id': '@guid',
    'text': '@name',
    'number|0-200': 0,
    'select|1': ['1', '2'],
    'multiSelect': ['1', '2'],
    'date': moment().valueOf(),
    'range': [moment().valueOf(), moment().add(1, 'months').valueOf()],
  };
}

export const getList = (len = 5) => {
  const listKey = `list|${len}`;

  return Mock.mock({
    code: '0',
    message: 'success',
    [listKey]: [getRowData()],
  })
}