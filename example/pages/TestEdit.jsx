
import React, { useEffect, useRef, useState } from 'react';
import AgGridEditTable from "~/component/AgGridEditTable";
import { FORM_FIELD_TYPE, FormFieldRender } from "antd-dynamic-form-render";

import { Button } from 'antd';

import { DATASOURCE, MODE_DATASOURCE, VALIDATE_MODE } from '../constant';

import { getList } from '../mock';

const {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_INT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_MULTI_SELECT,
  FIELD_TYPE_DATE,
  FIELD_TYPE_RANGE
} = FORM_FIELD_TYPE;

export default () => {

  const [dataSource, setDataSource] = useState([]);
  const [mode, setMode] = useState('view');
  const [validateMode, setValidateMode] = useState('tooltip');
  const defaultData = useRef(null)
  const agGridEditTableRef = useRef(null);

  useEffect(() => {
    defaultData.current = getList(4).list
    setDataSource(defaultData.current)
  }, [])

  const columns =  [
    {
      title: "文本类型",
      dataIndex: "text",
      width: 100,
      editConfig: (text, record, index) => {
        return {
          mode: "view",
          fieldType: FIELD_TYPE_INPUT,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    },
    {
      title: "数字类型",
      dataIndex: "number",
      width: 100,
      editConfig: (text, record, index) => {
        return {
          fieldType: FIELD_TYPE_INT,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    },
    {
      title: "下拉选择类型",
      dataIndex: "select",
      width: 100,
      editConfig: (text, record, index) => {
        return {
          fieldType: FIELD_TYPE_SELECT,
          dataSource: DATASOURCE,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    },
    {
      title: "下拉多选类型",
      dataIndex: "multiSelect",
      width: 160,
      editConfig: (text, record, index) => {
        return {
          fieldType: FIELD_TYPE_MULTI_SELECT,
          dataSource: DATASOURCE,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    },
    {
      title: "日期类型",
      dataIndex: "date",
      width: 120,
      editConfig: (text, record, index) => {
        return {
          fieldType: FIELD_TYPE_DATE,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    },
    {
      title: "日期区间类型",
      dataIndex: "range",
      width: 220,
      editConfig: (text, record, index) => {
        return {
          fieldType: FIELD_TYPE_RANGE,
          rules: [{ required: true, message: "该字段必填" }]
        };
      }
    }
  ];

  const hanleAddRow = () => {
    const row = getList(1).list;
    setDataSource(dataSource.concat(row))
  }

  const hanleReset = () => {
    setDataSource(defaultData.current)
  }

  const hanleSubmit = () => {
    const newDataSource = agGridEditTableRef.current.getDataSource();
    const changeData = agGridEditTableRef.current.getDataSource('change');
    console.log(newDataSource, changeData)
  }

  const generateSelectValidateMode = () => {
    const props = {
      fieldType: FIELD_TYPE_SELECT,
      dataSource: VALIDATE_MODE,
      size: 'small',
      value: validateMode,
      style: { width: '100px' },
      onChange: (val) => {
        setValidateMode(val);
      }

    }
    return (
      <div style={{ display: 'inline-block', marginRight: '10px'}}>
        <span style={{ fontSize: '14px' }}>校验模式：</span>
        <FormFieldRender {...props}/>
      </div>
    )
  }

  const generateSelectMode = () => {
    const props = {
      fieldType: FIELD_TYPE_SELECT,
      dataSource: MODE_DATASOURCE,
      size: 'small',
      value: mode,
      style: { width: '100px' },
      onChange: (val) => {
        setMode(val);
      }

    }
    return (
      <div style={{ display: 'inline-block', marginRight: '10px'}}>
        <span style={{ fontSize: '14px' }}>模式：</span>
        <FormFieldRender {...props}/>
      </div>
    )
  }

  const generateToolbar = () => {
    return (
      <div style={{ margin: '10px 0'}}>
        {generateSelectMode()}
        {generateSelectValidateMode()}
        <Button type="primary" size='small' onClick={hanleAddRow}>新增一行</Button>
        <Button style={{ marginLeft: '10px'}} danger size='small' onClick={hanleReset}>重置</Button>
        <Button style={{ marginLeft: '10px'}} type="primary" size='small' onClick={hanleSubmit}>提交</Button>
      </div>
    )
  }


  const generateTable = () => {
    const props = {
      rowKey: "id",
      onRef: e => agGridEditTableRef.current = e, 
      dataSource,
      loading: false,
      height: 200,
      fieldMode: mode,
      tipMode: validateMode,
      columns: columns,
    };
    return <AgGridEditTable {...props} />;
  };

  return (
    <div className="App">
      {generateToolbar()}
      {generateTable()}
    </div>
  );
}
