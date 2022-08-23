import React from 'react'
import '.././App.css'
import OrgChart from '@unicef/react-org-chart'

import { tree0, tree1, tree2, tree3, tree4 } from './Tree'

import avatarPersonnel from '../assets/avatar-personnel.svg'

export default class Chart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree0,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  getChild = id => {
    switch (id) {
      case 100:
        return tree1
      case 36:
        return tree2
      case 56:
        return tree3
      case 25:
        return tree4
      default:
        return console.log('no children')
    }
  }

  getParent = d => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 10,
        person: {
          id: 10,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: '',
          totalReports: null,
        },
        hasChild: true,
        hasParent: "false",
        children: [d],
      }
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = config => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  render() {
    const { tree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      
          <React.Fragment>
            
              
            <OrgChart
              tree={tree}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={config => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={d => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={d => {
                this.handleDownload()
              }}
              loadImage={d => {
                return Promise.resolve(avatarPersonnel)
              }}
              loadParent={d => {
                console.log(d);
                const parentData = this.getParent(d)
                console.log(parentData);
                return parentData
              }}
              loadChildren={d => {
                console.log(d);
                const childrenData = this.getChild(d.id)
                return childrenData
              }}
            />
          </React.Fragment>
        
    )
  }
}
