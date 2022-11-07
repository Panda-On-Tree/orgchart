import React, { useEffect, useState } from 'react'
import '../../App.css'
import OrgChart from '@unicef/react-org-chart'
import avatarPersonnel from '../../assets/part-image.svg'
import axios from 'axios'
import { baseurl } from '../../api/apiConfig'

function ProductChart() {
  const [tree, setTree] = useState()
  const [downloadingChart, setDownloadingChart] = useState(false)
  const [configData, setConfigData] = useState({})
  const [highlightPostNumber, setHighlightPostNumber] = useState([1])
  const [childData, setChildData] = useState()
  var configabc = {}

  useEffect(() => {
    //const token = localStorage.getItem('token');
    
    const data = {
      parent_employee_id: localStorage.getItem('employee_id'),
    }
    axios({
      method: 'get',
      url: `${baseurl.base_url}/mhere/get-part-parent-node`,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      
    })
      .then(function (response) {
        console.log(response.data)
        setTree(response.data.data)
      })
      .catch(function (err) {
        console.log(err)
      })
  }, [])

  async function getChild(d) {
    console.log(d);
    const data = {
      parent_id: d.id,
    }
    return await axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/get-part-child`,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      data,
    }).then((res) => {
      console.log(res.data);
      return res.data.data
    })
  }

  async function getParent(nodeData) {
    console.log(nodeData)
    const child = [nodeData]
    const data = {
      manager_id: nodeData.person.manager_id,
    }
    return await axios({
      method: 'post',
      url: `${baseurl.base_url}/mhere/get-part-parent`,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      data,
    }).then((res) => {
      console.log(res.data)
      const data1 = res.data.data
      data1.children = child
      return data1
    })
  }

  function handleDownload() {
    setDownloadingChart(false)
  }
  function handleOnChangeConfig(config) {
    configabc = config
  }
  function handleLoadConfig() {
    return configabc
  }
  const downloadImageId = 'download-image'
  const downloadPdfId = 'download-pdf'
  if (tree) {
    return (
      <React.Fragment>
        <div className="zoom-buttons">
          <button
            style={{}}
            className="btn btn-outline-primary zoom-button"
            id="zoom-in"
          >
            +
          </button>
          <button className="btn btn-outline-primary zoom-button" id="zoom-out">
            -
          </button>
        </div>
        <div style={{}} className="download-buttons">
          <button
            style={{ padding: '10px 10px' }}
            className="btn btn-outline-primary"
            id="download-image"
          >
            Download as image
          </button>
          <button
            style={{ padding: '10px 10px' }}
            className="btn btn-outline-primary"
            id="download-pdf"
          >
            Download as PDF
          </button>

          {downloadingChart && <div>Downloading chart</div>}
        </div>
        <div id='root'>
        <OrgChart
          tree={tree}
          downloadImageId={downloadImageId}
          downloadPdfId={downloadPdfId}
          onConfigChange={(config) => {
            handleOnChangeConfig(config)
          }}
          loadConfig={(d) => {
            let configuration = handleLoadConfig(d)
            if (configuration) {
              return configuration
            }
          }}
          downlowdedOrgChart={(d) => {
            handleDownload()
          }}
          loadImage={(d) => {
            return Promise.resolve(avatarPersonnel)
          }}
          loadParent={(d) => {
            console.log(d)
            const parentData = getParent(d)
            return parentData
          }}
          loadChildren={(d) => {
            console.log(d)
            const childrenData = getChild(d)
            console.log(childrenData)
            return childrenData
          }}
        />
        </div>
      </React.Fragment>
    )
  }
  return <div></div>
}

export default ProductChart
