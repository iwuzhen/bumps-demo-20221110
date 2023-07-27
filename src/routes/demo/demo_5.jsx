import { useState } from 'react'
import './demo_5.css'
import { ResponsiveBump } from '@nivo/bump'
import { useEffect } from 'react';
import colormap  from 'colormap';
import Select from 'react-select'
import SourceData from './data/demo5_data1.json'


const countryMap =  {"OA":"非洲知识产权组织","CS":"塞黑","SU":"前苏联","DD":"民主德国", "AF":"阿富汗","AL":"阿尔巴尼亚","DZ":"阿尔及利亚","AS":"美属萨摩亚","AD":"安道尔","AO":"安哥拉","AI":"安圭拉","AQ":"南极洲","AG":"安提瓜和巴布达","AR":"阿根廷","AM":"亚美尼亚","AW":"阿鲁巴","AU":"澳大利亚","AT":"奥地利","AZ":"阿塞拜疆","BS":"巴哈马","BH":"巴林","BD":"孟加拉国","BB":"巴巴多斯","BY":"白俄罗斯","BE":"比利时","BZ":"伯利兹","BJ":"贝宁","BM":"百慕大","BT":"不丹","BO":"玻利维亚","BA":"波黑","BW":"博茨瓦纳","BV":"布韦岛","BR":"巴西","IO":"英属印度洋领地","VG":"英属维尔京群岛","BN":"文莱","BG":"保加利亚","BF":"布基纳法索","MM":"缅甸","BI":"布隆迪","CV":"佛得角","KH":"柬埔寨","CM":"喀麦隆","CA":"加拿大","KY":"开曼群岛","CF":"中非","TD":"乍得","CL":"智利","CN":"中国","CX":"圣诞岛","CC":"科科斯（基林）群岛","CO":"哥伦比亚","KM":"科摩罗","CD":"刚果民主共和国","CG":"刚果共和国","CK":"库克群岛","CR":"哥斯达黎加","CI":"科特迪瓦","HR":"克罗地亚","CU":"古巴","CW":"库拉索","CY":"塞浦路斯","CZ":"捷克","DK":"丹麦","DJ":"吉布提","DM":"多米尼克","DO":"多米尼加","EC":"厄瓜多尔","EG":"埃及","SV":"萨尔瓦多","GQ":"赤道几内亚","ER":"厄立特里亚","EE":"爱沙尼亚","ET":"埃塞俄比亚","FK":"福克兰群岛","FO":"法罗群岛","FJ":"斐济","FI":"芬兰","FR":"法国","FX":"法国本土","GF":"法属圭亚那","PF":"法属波利尼西亚","TF":"法属南部和南极领地","GA":"加蓬","GM":"冈比亚","PS":"巴勒斯坦","GE":"格鲁吉亚","DE":"德国","GH":"加纳","GI":"直布罗陀","GR":"希腊","GL":"格陵兰","GD":"格林纳达","GP":"瓜德罗普","GU":"关岛","GT":"危地马拉","GG":"根西","GN":"几内亚","GW":"几内亚比绍","GY":"圭亚那","HT":"海地","HM":"赫德岛和麦克唐纳群岛","VA":"梵蒂冈","HN":"洪都拉斯","HK":"中国香港","HU":"匈牙利","IS":"冰岛","IN":"印度","ID":"印度尼西亚","IR":"伊朗","IQ":"伊拉克","IE":"爱尔兰","IM":"马恩岛","IL":"以色列","IT":"意大利","JM":"牙买加","JP":"日本","JE":"泽西","JO":"约旦","KZ":"哈萨克斯坦","KE":"肯尼亚","KI":"基里巴斯","KP":"朝鲜","KR":"韩国","XK":"科索沃","KW":"科威特","KG":"吉尔吉斯斯坦","LA":"老挝","LV":"拉脱维亚","LB":"黎巴嫩","LS":"莱索托","LR":"利比里亚","LY":"利比亚","LI":"列支敦士登","LT":"立陶宛","LU":"卢森堡","MO":"中国澳门","MK":"北马其顿","MG":"马达加斯加","MW":"马拉维","MY":"马来西亚","MV":"马尔代夫","ML":"马里","MT":"马耳他","MH":"马绍尔群岛","MQ":"马提尼克","MR":"毛里塔尼亚","MU":"毛里求斯","YT":"马约特","MX":"墨西哥","FM":"密克罗尼西亚联邦","MD":"摩尔多瓦","MC":"摩纳哥","MN":"蒙古","ME":"黑山","MS":"蒙特塞拉特","MA":"摩洛哥","MZ":"莫桑比克","NA":"纳米比亚","NR":"瑙鲁","NP":"尼泊尔","NL":"荷兰","NC":"新喀里多尼亚","NZ":"新西兰","NI":"尼加拉瓜","NE":"尼日尔","NG":"尼日利亚","NU":"纽埃","NF":"诺福克岛","MP":"北马里亚纳群岛","NO":"挪威","OM":"阿曼","PK":"巴基斯坦","PW":"帕劳","PA":"巴拿马","PG":"巴布亚新几内亚","PY":"巴拉圭","PE":"秘鲁","PH":"菲律宾","PN":"皮特凯恩群岛","PL":"波兰","PT":"葡萄牙","PR":"波多黎各","QA":"卡塔尔","RE":"留尼汪","RO":"罗马尼亚","TW":"中国台湾","RU":"俄罗斯","RW":"卢旺达","BL":"圣巴泰勒米","SH":"圣赫勒拿、阿森松和特里斯坦-达库尼亚","KN":"圣基茨和尼维斯","LC":"圣卢西亚","MF":"法属圣马丁","VC":"圣文森特和格林纳丁斯","WS":"萨摩亚","SM":"圣马力诺","ST":"圣多美和普林西比","SA":"沙特阿拉伯","SN":"塞内加尔","RS":"塞尔维亚","SC":"塞舌尔","SL":"塞拉利昂","SG":"新加坡","SX":"荷属圣马丁","SK":"斯洛伐克","SI":"斯洛文尼亚","SB":"所罗门群岛","SO":"索马里","ZA":"南非","GS":"南乔治亚和南桑威奇群岛","SS":"南苏丹","ES":"西班牙","LK":"斯里兰卡","SD":"苏丹","SR":"苏里南","PM":"圣皮埃尔和密克隆","SZ":"斯威士兰","SE":"瑞典","CH":"瑞士","SY":"叙利亚","TJ":"塔吉克斯坦","TZ":"坦桑尼亚","TH":"泰国","TL":"东帝汶","TG":"多哥","TK":"托克劳","TO":"汤加","TT":"特立尼达和多巴哥","TN":"突尼斯","TR":"土耳其","TM":"土库曼斯坦","TV":"图瓦卢","UG":"乌干达","UA":"乌克兰","AE":"阿联酋","GB":"英国","US":"美国","UM":"美国本土外小岛屿","UY":"乌拉圭","UZ":"乌兹别克斯坦","VU":"瓦努阿图","VE":"委内瑞拉","VN":"越南","VI":"美属维尔京群岛","WF":"瓦利斯和富图纳","EH":"西撒哈拉","UN":"联合国","EU":"欧洲联盟","YE":"也门","ZM":"赞比亚","ZW":"津巴布韦","WI":"西印度群岛联邦","EN":"独立国家联合体","YG":"南斯拉夫","UR":"苏联","DH":"达荷美","VL":"上沃尔特","TC":"捷克斯洛伐克","AN":"荷属安的列斯",}

let sourceArray = []
let selectOpt = []

for (let [key,rountItem] of Object.entries(SourceData)){
  rountItem = rountItem.map(item=>{
    item[0] = item[0] + ` ${countryMap[item[0]]}`
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

function initColor(dataLength){
  colors = colormap({
    colormap: 'rainbow',
    // colormap: 'rainbow-soft',
    nshades: dataLength,
    format: 'rgbaString',
    alpha: 0.9
  }).reverse()


  let countryEmphasize = ['南非','韩国','中国','新加坡','西班牙','波兰','伊朗','瑞典', '土耳其',"中国台湾","丹麦","俄罗斯"]
  let indexEmphasize = []
  for (let item of data){
    if (countryEmphasize.includes(item.id.split(' ')[1])){
      indexEmphasize.push(item.data[0].y-1)
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
        <p>Data Source:</p> 
        <Select 
          options={selectOpt}
          defaultValue={round}
          className ="select"
          onChange={changeDataLimit}
          placeholder="选择最大等级"
        /></div>
        
      <p style={{textAlign:"left"}}>
      IPC Level 3 复杂度， 产品总数为 4485
            </p>
        <div className="bumps" style={{height: `${height}rem`,}}>
          <ResponsiveBump
            data={data}
            xOuterPadding={0}
            yOuterPadding={0.4}
            // colors={{ scheme: 'set3' }}
            colors={colors}
            lineWidth={3}
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
            margin={{ top: 40, right: 200, bottom: 40, left: 200 }}
            axisRight={null}
        />
        </div>
      </>
  )
}

export default App
