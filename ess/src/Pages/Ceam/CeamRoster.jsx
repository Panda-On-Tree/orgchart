import MUIDataTable from 'mui-datatables'
import React, { useState } from 'react'
import * as xlsx from 'xlsx'

function CeamRoster() {
    const [file, setFile] = useState()
    const [col, setCol] = useState()
    const [month, setMonth] =useState('2022-11')
    const options = {
        tableBodyMaxHeight: '64vh',
        responsive: 'standard',
        selectableRowsHideCheckboxes: true,
        filter: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        customToolbar: null,
    }

    const readUploadFile = (e) => {
        e.preventDefault()
        if (e.target.files) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = e.target.result
                const workbook = xlsx.read(data, { type: 'array' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = xlsx.utils.sheet_to_json(worksheet)
                console.log(json)
                console.log(Object.keys(json[0]).sort())
                const columns = Object.keys(json[0]).sort()
                const popped = columns.pop()
                columns.unshift(popped)

                setCol(columns)
                setFile(json)
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    return (
        <div className="ceam-roster-main">
            <div className="ceam-roster-date-main">
                <input
                onChange={(e)=>{
                    setMonth(e.target.value)
                    console.log(e.target.value);
                }}
                    className="month-picker-ceam"
                    type="month"
                    value={month}
                    name=""
                    id=""
                />
            </div>
            <div className="ceam-file-main">
                <input
                    className="file-picker-ceam"
                    type="file"
                    onChange={readUploadFile}
                />
            </div>
           <div className='table-ceam'>
           {file ? (
                <MUIDataTable
                    data={file}
                    columns={col}
                    options={options}
                ></MUIDataTable>
            ) : (
                ''
            )}
           </div>
           <div>
            afhaw
           </div>
        </div>
    )
}

export default CeamRoster
