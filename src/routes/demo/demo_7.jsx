import { useState } from 'react'
import './demo_7.css'
import { ResponsiveBump } from '@nivo/bump'
import { useEffect } from 'react';
import colormap  from 'colormap';
import Select from 'react-select'
import SourceData from './data/demo7_data1.json'


let sourceArray = []
let selectOpt = []

for (let [key,rountItem] of Object.entries(SourceData)){
  rountItem = rountItem.map(item=>{
    item[0] = item[0] 
    return item
  })
  selectOpt.push({value:sourceArray.length, label:key})
  sourceArray.push(rountItem)
}

function handleData(source){

  return source.slice(1).map(items=>{
    return {
      id: items[0],
      data: items.slice(1).map((subItem,index)=>{
        return {
          x: source[0][index+1],
          y: subItem
        }
      })
    }
  })
}

const defaultIndex = 0

let data = handleData(sourceArray[defaultIndex])

var colors
// const colors = ["#4c4774","#4a4876","#494a78","#474b7a","#464c7c","#444e7f","#424f81","#415183","#3f5285","#3e5387","#3c5589","#3b568b","#39578d","#37598f","#365a92","#345c94","#335d96","#315e98","#2f609a","#2e619c","#2c629e","#2b64a0","#2965a2","#2867a5","#2668a7","#2469a9","#236bab","#216cad","#206daf","#1e6fb1","#1c70b3","#1b71b5","#1973b7","#1874ba","#1676bc","#1477be","#1378c0","#117ac2","#107bc4","#0e7cc6","#0d7ec8","#0b7fca","#0981cd","#0882cf","#0683d1","#0585d3","#0386d5","#0886d1","#0e87cd","#1387c9","#1887c5","#1d87c1","#2388bd","#2888b9","#2d88b5","#3389b1","#3889ad","#3d89a9","#4289a5","#488aa1","#4d8a9d","#528a99","#588b95","#5d8b91","#628b8d","#678b89","#6d8c85","#728c81","#778c7d","#7d8d79","#828d75","#878d71","#8c8d6d","#928e69","#978e65","#9c8e61","#a18e5d","#a78f59","#ac8f55","#b18f51","#b7904d","#bc9049","#c19045","#c69041","#cc913d","#d19139","#d69135","#dc9231","#e1922d","#e69229","#eb9225","#f19321","#f6931d","#f5921d","#f4911e","#f3911e","#f2901f","#f18f1f","#ef8e20","#ee8e20","#ed8d21","#ec8c21","#eb8b22","#ea8b22","#e98a23","#e88923","#e78823","#e68824","#e48724","#e38625","#e28525","#e18526","#e08426","#df8327","#de8227","#dd8128","#dc8128","#db8029","#d97f29","#d87e29","#d77e2a","#d67d2a","#d57c2b","#d47b2b","#d37b2c","#d27a2c","#d1792d","#d0782d","#ce782e","#cd772e","#cc762f","#cb752f","#ca7530","#c97430","#c87330","#c77231","#c67131","#c57132","#c37032","#c26f33","#c16e33","#c06e34","#bf6d34","#be6c35","#bd6b35","#bc6b36","#bb6a36","#ba6936","#b86837","#b76837","#b66738","#b56638","#b46539","#b36439","#b2643a","#b1633a","#b0623b","#af613b","#ad613c","#ac603c","#ab5f3c","#aa5e3d","#a95e3d","#a85d3e","#a75c3e","#a65b3f","#a55b3f","#a45a40","#a25940","#a15841","#a05841","#9f5742","#9e5642","#a05941","#a15b40","#a35e3f","#a5603e","#a7633d","#a8663c","#aa683b","#ac6b3a","#ad6e39","#af7038","#b17337","#b27536","#b47835","#b67b34","#b87d32","#b98031","#bb8230","#bd852f","#be882e","#c08a2d","#c28d2c","#c3902b","#c5922a","#c79529","#c99728","#ca9a27","#cc9d26","#ce9f25","#cfa224","#d1a423","#d3a722","#d4aa21","#d6ac20","#d8af1f","#dab11e","#dbb41d","#ddb71c","#dfb91b","#e0bc1a","#e2bf19","#e4c118","#e5c417","#e7c615","#e9c914","#ebcc13","#ecce12","#eed111","#f0d310","#f1d60f","#f3d90e","#f5db0d","#f6de0c","#f8e10b","#fae30a","#fce609","#fde808",]
const countryEmphasize = ['韩国','中国台湾','中国','卢森堡',]

function initColor(dataLength){
  colors = colormap({
    colormap: 'rainbow',
    // colormap: 'rainbow-soft',
    nshades: dataLength,
    format: 'rgbaString',
    alpha: 0.8
  }).reverse()

  let indexEmphasize = []
  for (let i in data){
    let item = data[i]
    console.log(item)
    if (countryEmphasize.includes(item.id.split(' ')[1])){
      indexEmphasize.push(i)
    }
  }
  let emphasizeColor = ["#1608D4","#9708D4","#D40816","#F59000", "#F5161F", "#D400BF", "#8E0CEB","#1800D4", "#1162FA","#D4360B","#EB7001","#D4930B"]
  for (let i in indexEmphasize){
    let index = indexEmphasize[i]
    // colors[index] = colors[index].replace(/[^,]+(?=\))/, 1);
    colors[index] = emphasizeColor[i]
  }
  return colors
}


// `height: ${40/data.length}rem;`

function App() {
  const [round, setRound] = useState(selectOpt[defaultIndex])
  const [height, setHeight] = useState(data.length)
  const [colors, setColors] = useState(initColor(data.length))
  // console.log("round", round, selectOpt.slice(-1)[0])
  // setColors()
  
  useEffect(()=>{
    console.log(round,selectOpt)
  })
  const changeDataLimit = (val)=>{
    setRound(val)
    data = handleData(sourceArray[val.value])
    console.log("data",data)
    setColors(initColor(data.length))
    setHeight(data.length)
  }
  return (
      <>
      <div style={{display: "flex"}}> 
        <p>Discipline:</p> 
        <Select 
          options={selectOpt}
          defaultValue={round}
          className ="select"
          onChange={changeDataLimit}
          placeholder="选择最大等级"
        /></div>
        
      <p style={{textAlign:"left"}}>
      OpenAlex 100个学校的知识复杂度的随年趋势图-20250821
            </p>
        <div className="bumps" style={{height: `${height}rem`, width: '80rem'}}>
          <ResponsiveBump
            data={data}
            xOuterPadding={0}
            yOuterPadding={0.4}
            // colors={{ scheme: 'set3' }}
            colors={colors}
            lineWidth={(series)=>{
              console.log('series', series)
              if (countryEmphasize.includes(series.id.split(' ')[1])){
                return 6
              }
              return 2
            }}
            activeLineWidth={5}
            inactiveLineWidth={4}
            opacity={0.7}
            enableGridY={false}
            enableGridX={false}
            inactiveOpacity={0.15}
            startLabel={true}
            startLabelPadding={40}
            startLabelTextColor={{ theme: 'labels.text.fill' }}
            endLabel={obj=> `${String(obj.data.slice(-1)[0].y).padEnd(4, ' ')}  ${obj.id}`}
            endLabelPadding={14}
            endLabelTextColor={{ theme: 'labels.text.fill' }}
            pointSize={6}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ from: 'serie.color', modifiers: [] }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                // legend: 'ranking',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            animate={false}
            margin={{ top: 40, right: 300, bottom: 40, left: 300 }}
            axisRight={null}
        />
        </div>
      </>
  )
}

export default App
