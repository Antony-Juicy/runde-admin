/*
    机会模块的下拉选项
*/
import Fetch from '@/utils/fetch'
const chanceSelect = {
    // 返回项目/科目/课程的级联下拉
    getProjectCascader({prop,placeholder}){
        return {
            prop,
            element: "el-cascader",
            placeholder,
            props: {
              checkStrictly: true,
              lazy: true,
              expandTrigger: 'hover',
              lazyLoad:(node, resolve)=> {
                console.log(node,'node')
                const { level } = node;
                if(level == 0){
                  Fetch("chance_product_list").then(res => {
                    let data = JSON.parse(res.msg);
                    let nodes = data.map(item =>({
                      value: item.id,
                      label: item.productName,
                      leaf: level >= 2,
                    }));
                    resolve(nodes);
                  }).catch(err => {
                    resolve([]);
                  })
                }else if(level == 1){
                   Fetch("chance_subject_list",{
                     enquireProductIdOne: node.data.value
                   }).then(res => {
                     let nodes;
                     if(res.msg == "没有相关数据"){
                       nodes = [];
                     }else {
                       let data = res.data.list;
                      nodes = data.map(item =>({
                        value: item.id,
                        label: item.subjectName,
                        leaf: level >= 2,
                      }));
                     }
                    resolve(nodes);
                  }).catch(err => {
                    resolve([]);
                  })
                }else if(level == 2){
                   Fetch("chance_course_list",{
                     subjectIdOne: node.data.value
                   }).then(res => {
                     let nodes;
                     if(res.msg == "没有相关数据"){
                       nodes = [];
                     }else {
                       let data =JSON.parse(res.msg);
                      nodes = data.map(item =>({
                        value: item.id,
                        label: item.courseName,
                        leaf: level >= 2,
                      }));
                     }
                    resolve(nodes);
                  }).catch(err => {
                    resolve([]);
                  })
                }else {
                  resolve([]);
                }
              },
            },
            initWidth: true
          }
    }
    
    
}

export default chanceSelect;