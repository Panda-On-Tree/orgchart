import { SlBadge, SlButton, SlDialog } from '@shoelace-style/shoelace/dist/react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { baseurl } from '../../api/apiConfig'
import "./Report.css"
function Report() {


    const [reportList, setReportList] = useState()
    const [reportDataKeys, setReportDataKeys] = useState()
    const [reportDataArray, setReportDataArray] = useState([])
    const [reportDataObject, setReportDataObject] = useState([])
    const [objectReportDialoge, setObjectReportDialoge] = useState(false);
    const [arrayReportDialoge, setArrayReportDialoge] = useState(false);
    useEffect(()=>{
        getReportList();
    },[])

    const options = {
        tableBodyMaxHeight: "64vh",
        responsive: "standard",
        selectableRowsHideCheckboxes: true

    }
   
    const getReportList = () => {
         axios({
            method:"get",
            url:`${baseurl.base_url}/mhere/get-report-list`,
            headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
          })
          .then((res)=>{
            console.log(res);
            setReportList(res.data.data)
          })
          .catch((err)=>{
            console.log(err);
          })
    }

    const getReport = (report_id, report_return_type) =>{
        const data = {
            report_id : report_id
        }
        axios({
            method:"post",
            url:`${baseurl.base_url}/mhere/get-report-data`,
            headers:{
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            data
          })
          .then((res)=>{
            console.log(res.data);
            if(report_return_type == 'array')
            {
                let obj = res.data.data[0];
                let arr = Object.keys(obj);
                let new_arr = arr.map((item) => {
                    let new_obj = {
                        name: item,
                        label: item.replace("_", " "),
                        options: {
                            filter: true,
                            sort: true,
                        }
                    }
                    return new_obj
                })
                setReportDataKeys(new_arr)
                setReportDataArray(res.data.data);
                return;
            }
            setReportDataObject(res.data.data);
          })
          .catch((err)=>{
            console.log(err);
          })
    }


  return (
    <div>
        {objectReportDialoge? 
        <SlDialog style={{ '--width': '40vw' }} label="Report" open={objectReportDialoge} onSlAfterHide={() => setObjectReportDialoge(false)}>
            {Object.keys(reportDataObject)?.map((key,index)=>{
                const rep = reportDataObject[key]
                return(
                    <div className='report-data-main'>
                        <SlBadge style={{marginTop:"10px"}} variant="warning" pill>
                            {index+1}
                        </SlBadge>
                        <div className='report-data-des'>
                            <h4>{key}</h4>
                            <h5>{rep}</h5>
                        </div>
                    </div>
                )
            })}
      
            <SlButton slot="footer" size='large' variant="primary" onClick={() => setObjectReportDialoge(false)}>
            Close
            </SlButton>
        </SlDialog>
        : null}
        
        {arrayReportDialoge? 
        <SlDialog style={{ '--width': '70vw' }} label="Report" open={arrayReportDialoge} onSlAfterHide={() => setArrayReportDialoge(false)}>
            <div className='report-data-main-arr'>
               {reportDataKeys?
                <MUIDataTable
                title={"Report Table"}
                data={reportDataArray}
                columns={reportDataKeys}
                options={options}
            ></MUIDataTable>:""}
            </div>
            <SlButton slot="footer" size='large' variant="primary" onClick={() => setArrayReportDialoge(false)}>
                Close
            </SlButton>
        </SlDialog>
        :null}
        <div className='report-main'>
        <div className='report-container'>
        {reportList?.map((item)=>{
            return(
                <div className='report-card-main'>
                <div className='report-card-header'>
                    <span>{item.report_name}</span>
                </div>
               <p className='report-card-des'>
               {item.report_description}
               </p>
                <div className='report-card-button-main'>
                    <SlButton variant='primary' onClick={()=>{
                        getReport(item.report_id, item.report_return_type)
                        if(item.report_return_type == 'array'){
                            setArrayReportDialoge(true);
                            return;
                        }
                        else{
                            setObjectReportDialoge(true)
                            return
                        }
                    }} >Execute</SlButton>
                </div>
            </div>
            )
        })}
        </div>
    </div>
    </div>
  )
}

export default Report