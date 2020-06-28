import React, { Component } from 'react';
import { Table } from 'antd'

class ETable extends Component {

    handleRowClick = (record, index) => {
        let { rowSelection, updateRowClick, selectedRows, setSelectedRows, selectedRowKeys, setSelectedRowKeys, selectedIds, setSelectedIds } = this.props
        if(rowSelection.type==="checkbox"){
            if(selectedRowKeys===null){
                selectedIds = [record.id]
                selectedRows = [record]
                selectedRowKeys = [index]
            }else{
                const flag = selectedIds.indexOf(record.id)
                if(flag===-1){
                    selectedIds.push(record.id)
                    selectedRows.push(record)
                    selectedRowKeys.push(index)
                }else{
                    selectedIds.splice(flag, 1)
                    selectedRows.splice(flag, 1)
                    selectedRowKeys.splice(flag, 1)
                }
            }
            updateRowClick(setSelectedRows, setSelectedRowKeys, selectedRows, selectedRowKeys, setSelectedIds, selectedIds)
        }else{
            updateRowClick(setSelectedRows, setSelectedRowKeys, record, [index])
        }
    }

    tableInit = () => {
        let row_selection = this.props.rowSelection
        const { selectedRowKeys } = this.props
        const { handleRowClick } = this
        let rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys,
        }
        if(row_selection === false || row_selection === undefined){
            row_selection = false;
        }else if(row_selection.type==='checkbox'){
            rowSelection.type = 'checkbox';
        }else{
            rowSelection.type = 'radio';
        }
        return <Table bordered {...this.props} rowSelection={ row_selection ? rowSelection : null} 
            onRow={(record, index) => {
                return {
                    onClick: () => { handleRowClick(record, index) }
                }
            }}
        />
    }

    render() {
        return (
            <div>
                {
                    this.tableInit()
                }
            </div>
        );
    }
}

export default ETable;