import React from 'react';
import { Form, Input, Checkbox, Select, Button, DatePicker } from 'antd'
import Utils from './../../utils'

const { Item } = Form

const FilterForm = ({ formList, searchResult}) => {
    const [order_search] = Form.useForm()
    const initFormList = () => {
        const formItemList = []
        formList.forEach(item => {
            let label = item.label
            let field = item.field
            let initialValue = item.initialValue
            let placeholder = item.placeholder
            let width = item.width
            let list = item.list
            if (item.type === "订单时间") {
                const begin_time = <Item key="start" label="订单时间" name='start_time'>
                    <DatePicker placeholder="开始时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
                </Item>
                formItemList.push(begin_time)
                const end_time = <Item key="end" label="~" colon={false} name='end_time'>
                    <DatePicker placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
                </Item>
                formItemList.push(end_time)
            } else if (item.type === "INPUT") {
                const INPUT = <Item key={field} label={label} name={field}>
                    {
                        field !== "user_pwd" 
                        ? <Input type="text" placeholder={placeholder} />
                        : <Input type="password" placeholder={placeholder} />
                    }
                </Item>
                formItemList.push(INPUT)
            } else if (item.type === "SELECT") {
                const SELECT = <Item key={field} label={label} name={field} initialValue={initialValue}>
                    <Select placeholder={placeholder} style={{ width: width }}>
                        {
                            Utils.getOptionList(list)
                        }
                    </Select>
                </Item>
                formItemList.push(SELECT)
            } else if (item.type === "CHECHBOX") {
                const CHECKBOX = <Item valuePropName='checkbox' name={field}>
                    <Checkbox>{label}</Checkbox>
                </Item>
                formItemList.push(CHECKBOX)
            } else if (item.type === "DATE") {
                const DATE = <Item key={field} label={label} name={field}>
                    <DatePicker placeholder={placeholder} showTime format="YYYY-MM-DD HH:mm:ss" />
                </Item>
                formItemList.push(DATE)
            }
        })
        return formItemList
    }

    const resetOrdersearch = () => {
        order_search.resetFields()
    }

    return (
        <Form form={order_search} layout='inline' onFinish={searchResult}>
            {
                initFormList()
            }
            <Item>
                <Button type='primary' htmlType='submit' style={{marginRight: "10px" }}>查询</Button>
                <Button onClick={resetOrdersearch}>重置</Button>
            </Item>
        </Form>
    );
};

export default FilterForm;