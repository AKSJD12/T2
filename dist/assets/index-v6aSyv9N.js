import{_ as X,a as B,r as m,c as S,b as e,w as o,d as s,o as V,e as _,g as d,t as k,k as Y,f as Z,q as $,E as w,s as ee}from"./index-C_AB8DFW.js";const le={class:"books"},te={class:"card-header"},oe={class:"pagination"},ae=["src"],ne={class:"dialog-footer"},se={__name:"index",setup(re){const i=B({name:"",author:"",category:""}),T=m([{id:1,name:"三体",author:"刘慈欣",category:"小说",price:68,stock:100,status:"在售",description:"科幻小说代表作",cover:"https://example.com/cover1.jpg"},{id:2,name:"活着",author:"余华",category:"文学",price:45,stock:50,status:"在售",description:"当代文学经典",cover:"https://example.com/cover2.jpg"}]),b=m(1),v=m(10),j=m(100),g=m(!1),y=m("添加图书"),h=m(null),a=B({name:"",author:"",category:"",price:0,stock:0,description:"",cover:""}),q={name:[{required:!0,message:"请输入图书名称",trigger:"blur"}],author:[{required:!0,message:"请输入作者",trigger:"blur"}],category:[{required:!0,message:"请选择分类",trigger:"change"}],price:[{required:!0,message:"请输入价格",trigger:"blur"}],stock:[{required:!0,message:"请输入库存",trigger:"blur"}]},E=()=>{console.log("搜索条件：",i)},F=()=>{Object.assign(i,{name:"",author:"",category:""})},D=n=>{v.value=n},N=n=>{b.value=n},O=()=>{y.value="添加图书",Object.assign(a,{name:"",author:"",category:"",price:0,stock:0,description:"",cover:""}),g.value=!0},I=n=>{y.value="编辑图书",Object.assign(a,n),g.value=!0},M=n=>{$.confirm(`确定要删除图书《${n.name}》吗？`,"警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{w.success("删除成功")}).catch(()=>{})},P=n=>{const l=n.status==="在售"?"下架":"上架";$.confirm(`确定要${l}图书《${n.name}》吗？`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{n.status=n.status==="在售"?"已下架":"在售",w.success(`${l}成功`)}).catch(()=>{})},R=()=>{h.value.validate(n=>{n&&(g.value=!1,w.success("保存成功"))})},A=n=>!1;return(n,l)=>{const p=s("el-button"),f=s("el-input"),r=s("el-form-item"),u=s("el-option"),C=s("el-select"),x=s("el-form"),c=s("el-table-column"),L=s("el-tag"),G=s("el-table"),H=s("el-pagination"),J=s("el-card"),U=s("el-input-number"),K=s("el-icon"),Q=s("el-upload"),W=s("el-dialog");return V(),S("div",le,[e(J,null,{header:o(()=>[_("div",te,[l[14]||(l[14]=_("span",null,"图书管理",-1)),e(p,{type:"primary",onClick:O},{default:o(()=>l[13]||(l[13]=[d("添加图书")])),_:1})])]),default:o(()=>[e(x,{inline:!0,model:i,class:"search-form"},{default:o(()=>[e(r,{label:"图书名称"},{default:o(()=>[e(f,{modelValue:i.name,"onUpdate:modelValue":l[0]||(l[0]=t=>i.name=t),placeholder:"请输入图书名称"},null,8,["modelValue"])]),_:1}),e(r,{label:"作者"},{default:o(()=>[e(f,{modelValue:i.author,"onUpdate:modelValue":l[1]||(l[1]=t=>i.author=t),placeholder:"请输入作者"},null,8,["modelValue"])]),_:1}),e(r,{label:"分类"},{default:o(()=>[e(C,{modelValue:i.category,"onUpdate:modelValue":l[2]||(l[2]=t=>i.category=t),placeholder:"请选择分类"},{default:o(()=>[e(u,{label:"小说",value:"小说"}),e(u,{label:"文学",value:"文学"}),e(u,{label:"计算机",value:"计算机"}),e(u,{label:"历史",value:"历史"}),e(u,{label:"经济",value:"经济"})]),_:1},8,["modelValue"])]),_:1}),e(r,null,{default:o(()=>[e(p,{type:"primary",onClick:E},{default:o(()=>l[15]||(l[15]=[d("搜索")])),_:1}),e(p,{onClick:F},{default:o(()=>l[16]||(l[16]=[d("重置")])),_:1})]),_:1})]),_:1},8,["model"]),e(G,{data:T.value,style:{width:"100%"}},{default:o(()=>[e(c,{prop:"id",label:"ID",width:"80"}),e(c,{prop:"name",label:"图书名称"}),e(c,{prop:"author",label:"作者"}),e(c,{prop:"category",label:"分类"}),e(c,{prop:"price",label:"价格",width:"100"},{default:o(t=>[d(" ¥ "+k(t.row.price),1)]),_:1}),e(c,{prop:"stock",label:"库存",width:"100"}),e(c,{prop:"status",label:"状态",width:"100"},{default:o(t=>[e(L,{type:t.row.status==="在售"?"success":"info"},{default:o(()=>[d(k(t.row.status),1)]),_:2},1032,["type"])]),_:1}),e(c,{label:"操作",width:"250"},{default:o(t=>[e(p,{size:"small",onClick:z=>I(t.row)},{default:o(()=>l[17]||(l[17]=[d("编辑")])),_:2},1032,["onClick"]),e(p,{size:"small",type:"danger",onClick:z=>M(t.row)},{default:o(()=>l[18]||(l[18]=[d(" 删除 ")])),_:2},1032,["onClick"]),e(p,{size:"small",type:t.row.status==="在售"?"warning":"success",onClick:z=>P(t.row)},{default:o(()=>[d(k(t.row.status==="在售"?"下架":"上架"),1)]),_:2},1032,["type","onClick"])]),_:1})]),_:1},8,["data"]),_("div",oe,[e(H,{"current-page":b.value,"onUpdate:currentPage":l[3]||(l[3]=t=>b.value=t),"page-size":v.value,"onUpdate:pageSize":l[4]||(l[4]=t=>v.value=t),"page-sizes":[10,20,50,100],layout:"total, sizes, prev, pager, next, jumper",total:j.value,onSizeChange:D,onCurrentChange:N},null,8,["current-page","page-size","total"])])]),_:1}),e(W,{title:y.value,modelValue:g.value,"onUpdate:modelValue":l[12]||(l[12]=t=>g.value=t),width:"500px"},{footer:o(()=>[_("span",ne,[e(p,{onClick:l[11]||(l[11]=t=>g.value=!1)},{default:o(()=>l[19]||(l[19]=[d("取消")])),_:1}),e(p,{type:"primary",onClick:R},{default:o(()=>l[20]||(l[20]=[d("确定")])),_:1})])]),default:o(()=>[e(x,{model:a,rules:q,ref_key:"bookFormRef",ref:h,"label-width":"100px"},{default:o(()=>[e(r,{label:"图书名称",prop:"name"},{default:o(()=>[e(f,{modelValue:a.name,"onUpdate:modelValue":l[5]||(l[5]=t=>a.name=t)},null,8,["modelValue"])]),_:1}),e(r,{label:"作者",prop:"author"},{default:o(()=>[e(f,{modelValue:a.author,"onUpdate:modelValue":l[6]||(l[6]=t=>a.author=t)},null,8,["modelValue"])]),_:1}),e(r,{label:"分类",prop:"category"},{default:o(()=>[e(C,{modelValue:a.category,"onUpdate:modelValue":l[7]||(l[7]=t=>a.category=t),placeholder:"请选择分类",style:{width:"100%"}},{default:o(()=>[e(u,{label:"小说",value:"小说"}),e(u,{label:"文学",value:"文学"}),e(u,{label:"计算机",value:"计算机"}),e(u,{label:"历史",value:"历史"}),e(u,{label:"经济",value:"经济"})]),_:1},8,["modelValue"])]),_:1}),e(r,{label:"价格",prop:"price"},{default:o(()=>[e(U,{modelValue:a.price,"onUpdate:modelValue":l[8]||(l[8]=t=>a.price=t),precision:2,step:.1,min:0,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),e(r,{label:"库存",prop:"stock"},{default:o(()=>[e(U,{modelValue:a.stock,"onUpdate:modelValue":l[9]||(l[9]=t=>a.stock=t),min:0,style:{width:"100%"}},null,8,["modelValue"])]),_:1}),e(r,{label:"描述",prop:"description"},{default:o(()=>[e(f,{type:"textarea",modelValue:a.description,"onUpdate:modelValue":l[10]||(l[10]=t=>a.description=t),rows:3},null,8,["modelValue"])]),_:1}),e(r,{label:"封面",prop:"cover"},{default:o(()=>[e(Q,{class:"cover-uploader",action:"#","show-file-list":!1,"before-upload":A},{default:o(()=>[a.cover?(V(),S("img",{key:0,src:a.cover,class:"cover"},null,8,ae)):(V(),Y(K,{key:1,class:"cover-uploader-icon"},{default:o(()=>[e(Z(ee))]),_:1}))]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["title","modelValue"])])}}},de=X(se,[["__scopeId","data-v-5be6d1b6"]]);export{de as default};
