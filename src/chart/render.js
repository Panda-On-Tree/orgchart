const d3 = require('d3')
const { wrapText, helpers, covertImageToBase64 } = require('../utils')
const renderLines = require('./renderLines')
const exportOrgChartImage = require('./exportOrgChartImage')
const exportOrgChartPdf = require('./exportOrgChartPdf')
const onClick = require('./onClick')
const iconLink = require('./components/iconLink')
const supervisorIcon = require('./components/supervisorIcon')
const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_HIGHLIGHT = 'org-chart-person-highlight'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'
const PERSON_REPORTS_CLASS_ICON = 'org-chart-person-reports-icon'

function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    onPersonLinkClick,
    loadImage,
    downloadImageId,
    downloadPdfId,
    elemWidth,
    margin,
    onConfigChange,
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)

  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function (d,index) {
    if (sourceNode) {
        console.log(d);
        if(d.parent){
          console.log(d.parent.max_height);
          d.y = d.depth * lineDepthY + d.node_height + d.parent.max_height
        }
        else{
          d.y = d.depth * lineDepthY + d.node_height
        }
      //console.log(d.height + sourceNode.max_height, d.person.name,d.height, sourceNode.max_height,"if");
    } else {
      console.log("inside if");
      d.y = d.depth * lineDepthY
    }
  })
  console.log("-------------------------");

  // Update the nodes
  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter((d) => d.id),
    (d) => d.id
  )

  const parentNode = sourceNode || treeData

  svg.selectAll('#supervisorIcon').remove()

  supervisorIcon({
    svg: svg,
    config,
    treeData,
    x: 70,
    y: -24,
  })

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', CHART_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)
    .on('click', onClick(config))

  // Person Card Shadow
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill-opacity', 0.05)
    .attr('stroke-opacity', 0.025)
    .attr('filter', 'url(#boxShadow)')

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('class', (d) => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('id', (d) => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .style('cursor', helpers.getCursorForNode)

  const namePos = {
    x: nodeWidth / 2,
    y: nodePaddingY * 1.8 + avatarWidth,
  }

  const avatarPos = {
    x: nodeWidth / 2 - avatarWidth / 2,
    y: nodePaddingY / 2,
  }

  // Person's Name
  nodeEnter
    .append('text')
    .attr('class', PERSON_NAME_CLASS + ' unedited')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .attr('dy', '.3em')
    .style('cursor', 'pointer')
    .style('fill', nameColor)
    .style('font-size', 14)
    .text((d) => d.person.name)
  // .on('click', onParentClick(config))

  // Person's Title
  nodeEnter
    .append('text')
    .attr('class', PERSON_TITLE_CLASS + ' unedited')
    .attr('x', nodeWidth / 2)
    .attr('y', namePos.y + nodePaddingY * 2.4)
    .attr('dy', '0.1em')
    .style('font-size', 12)
    .style('cursor', 'pointer')
    .style('fill', titleColor)
    .text((d) => d.person.title)

  const heightForTitle = 60 // getHeightForText(d.person.title)
  const widthForTile = 140
  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodeWidth / 2 + 2)
    .attr('y', namePos.y + nodePaddingY + heightForTitle)
    .attr('dy', '.9em')
    .style('font-size', 16)
    .style('font-weight', 600)
    .style('cursor', 'pointer')
    .style('fill', 'black')
    .text(helpers.getTextForTitle)

  nodeEnter
    .append('svg:image')
    .attr('class', PERSON_REPORTS_CLASS_ICON)
    .attr('x', nodeWidth / 2 - 23)
    .attr('y', namePos.y + nodePaddingY + heightForTitle - 3)
    .attr('display', (d) => (d.hasChild ? '' : 'none'))
    .attr('width', 20)
    .attr('height', 20)
    .style('cursor', 'pointer')
    .attr('src', '')
    .attr(
      'xlink:href',
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpb25pY29uIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPlBlb3BsZTwvdGl0bGU+PHBhdGggZD0iTTQwMiAxNjhjLTIuOTMgNDAuNjctMzMuMSA3Mi02NiA3MnMtNjMuMTItMzEuMzItNjYtNzJjLTMtNDIuMzEgMjYuMzctNzIgNjYtNzJzNjkgMzAuNDYgNjYgNzJ6IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIi8+PHBhdGggZD0iTTMzNiAzMDRjLTY1LjE3IDAtMTI3Ljg0IDMyLjM3LTE0My41NCA5NS40MS0yLjA4IDguMzQgMy4xNSAxNi41OSAxMS43MiAxNi41OWgyNjMuNjVjOC41NyAwIDEzLjc3LTguMjUgMTEuNzItMTYuNTlDNDYzLjg1IDMzNS4zNiA0MDEuMTggMzA0IDMzNiAzMDR6IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjMyIi8+PHBhdGggZD0iTTIwMCAxODUuOTRjLTIuMzQgMzIuNDgtMjYuNzIgNTguMDYtNTMgNTguMDZzLTUwLjctMjUuNTctNTMtNTguMDZDOTEuNjEgMTUyLjE1IDExNS4zNCAxMjggMTQ3IDEyOHM1NS4zOSAyNC43NyA1MyA1Ny45NHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiLz48cGF0aCBkPSJNMjA2IDMwNmMtMTguMDUtOC4yNy0zNy45My0xMS40NS01OS0xMS40NS01MiAwLTEwMi4xIDI1Ljg1LTExNC42NSA3Ni4yLTEuNjUgNi42NiAyLjUzIDEzLjI1IDkuMzcgMTMuMjVIMTU0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iMzIiLz48L3N2Zz4='
    )
  // Person's Avatar
  nodeEnter
    .append('image')
    .attr('id', (d) => `image-${d.id}`)
    .attr('width', avatarWidth)
    .attr('height', avatarWidth)
    .attr('x', avatarPos.x)
    .attr('y', avatarPos.y)
    .attr('stroke', borderColor)
    .attr('s', (d) => {
      d.person.hasImage
        ? d.person.avatar
        : loadImage(d).then((res) => {
            covertImageToBase64(res, function (dataUrl) {
              d3.select(`#image-${d.id}`).attr('href', dataUrl)
              d.person.avatar = dataUrl
            })
            d.person.hasImage = true
            return d.person.avatar
          })
    })
    .attr('src', (d) => d.person.avatar)
    .attr('href', (d) => d.person.avatar)
    .attr('clip-path', 'url(#avatarClip)')

  // Person's Link
  const nodeLink = nodeEnter
    .append('a')
    .attr('class', PERSON_LINK_CLASS)
    .attr('display', (d) => (d.person.link ? '' : 'none'))
    .attr('xlink:href', (d) => d.person.link)
    .on('click', (datum) => {
      d3.event.stopPropagation()
      // TODO: fire link click handler
      if (onPersonLinkClick) {
        onPersonLinkClick(datum, d3.event)
      }
    })

  iconLink({
    svg: nodeLink,
    x: nodeWidth - 20,
    y: 8,
  })

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, (d) => d.target.id)

  // Wrap the title texts
  const wrapWidth = 124
  svg.selectAll('text.unedited.' + PERSON_NAME_CLASS).call(wrapText, wrapWidth)
  svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth)

  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodeLeftX = -70
  var nodeRightX = 70
  var nodeY = 200
  nodes.map((d) => {
    nodeLeftX = d.x < nodeLeftX ? d.x : nodeLeftX
    nodeRightX = d.x > nodeRightX ? d.x : nodeRightX
    nodeY = d.y > nodeY ? d.y : nodeY
  })

  config.nodeRightX = nodeRightX
  config.nodeY = nodeY
  config.nodeLeftX = nodeLeftX * -1

  d3.select(downloadImageId).on('click', function () {
    exportOrgChartImage(config)
  })

  d3.select(downloadPdfId).on('click', function () {
    exportOrgChartPdf(config)
  })
  onConfigChange(config)
}
module.exports = render
