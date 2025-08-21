export default function Root() {
    return (
      <>
          <h1>demo view</h1>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-1">整体按迭代次数的知识复杂度</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-2">世界知识复杂度排名</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-3">经济复杂度(ECI country ranking)</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-4">知识复杂度 - (过滤学科)</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-5">专利国家复杂度</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-6">专利国家复杂度-20230816 修正</a></button>
          <button style={{marginRight:'20px'}}><a href="/demo/demo-7">OpenAlex 100个学校的知识复杂度的随年趋势图-20250821</a></button>
          {/* <button style={{marginRight:'20px'}}><a href="/demo/demo-3">世界知识复杂度排名+中美湾区</a></button> */}
          
          <h1>page view</h1>
          <button style={{marginRight:'20px'}}><a href="/page/paper">知识复杂度(论文)</a></button>
          <button style={{marginRight:'20px'}}><a href="/page/patent">知识复杂度(专利)</a></button>
          <button style={{marginRight:'20px'}}><a href="/page/github-eci">知识复杂度(github)</a></button>
      </>
    );
  }

