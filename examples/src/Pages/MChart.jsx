import React, { useEffect, useState } from 'react'
import '.././App.css'
import OrgChart from '@unicef/react-org-chart'

import { tree0, tree1, tree2, tree3, tree4 } from './Tree'

import avatarPersonnel from '../assets/avatar-personnel.svg'
import axios from 'axios'

function MChart() {

    const [tree, setTree] = useState();
    const [downloadingChart, setDownloadingChart] = useState(false);
    const [configData, setConfigData] = useState({});
    const [highlightPostNumber, setHighlightPostNumber] = useState([1]);
    const [childData, setChildData] = useState();
    var configabc = {};

    useEffect(() => {
        const data={
            parent_employee_id:"53051"
        }
        axios({
            method: "post",
            url: "http://192.168.1.7:8080/v1/api/mhere/get-parent-node",
            headers: {
                "Content-Type": "application/json",
            },
            data
        })
            .then(function (response) {
                console.log(response.data);
                setTree(response.data);

            })
            .catch(function (err) {
                console.log(err);
            })
    }, [])


    async function getChild(id) {
        const data = {
            "parent_employee_id": id
        }
        const abc = await axios({
            method: "post",
            url: "http://192.168.1.7:8080/v1/api/mhere/get-child",
            headers: {
                "Content-Type": "application/json",
            },
            data
        })
        const data1 = abc.data;
        console.log(data1);
        return(data1)
    }

    async function getParent(data) {
        const abc = await axios({
            method: "post",
            url: "http://192.168.1.7:8080/v1/api/mhere/get-parent",
            headers: {
                "Content-Type": "application/json",
            },
            data
        })
        const data1 = abc.data;
        data1.hasChild = data1.hasChild == "true" ? true: false;
        data1.hasParent = data1.hasParent == "true" ? true: false;
        console.log(abc.data);
        return(data1)
    }

    function handleDownload() {
        setDownloadingChart(false);
    }
    function handleOnChangeConfig(config) {
        configabc = config;
    }
    function handleLoadConfig() {
        return configabc;
    }
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'
    if (tree) {
        return (

            <React.Fragment>
                <OrgChart
                    tree={tree}
                    downloadImageId={downloadImageId}
                    downloadPdfId={downloadPdfId}
                    onConfigChange={config => {
                        handleOnChangeConfig(config)
                    }}

                    loadConfig={d => {
                        let configuration = handleLoadConfig(d)
                        if (configuration) {
                            return configuration
                        }
                    }}
                    downlowdedOrgChart={d => {
                        handleDownload()
                    }}
                    loadImage={d => {
                        return Promise.resolve(avatarPersonnel)
                    }}
                    loadParent={d => {
                        console.log(d);
                        const parentData = getParent(d)
                        console.log(parentData);
                        return parentData
                    }}

                    loadChildren={d => {
                        console.log(d);
                        const childrenData = getChild(d.id)
                        console.log(childrenData);
                        return childrenData
                    }}
                />
            </React.Fragment>

        )
    }
    return (<div></div>);
}

export default MChart