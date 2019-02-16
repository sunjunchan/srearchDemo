var person = [
    { name: '刘小华', src: '1.jpg', sex: 'male', des: '漂亮的女孩子' },
    { name: '王花', src: '2.jpg', sex: 'male', des: '漂亮的程序员' },
    { name: '陈军', src: '3.jpg', sex: 'female', des: '我是一个学霸' },
    { name: '王华', src: '4.jpg', sex: 'female', des: '我喜欢游泳' },
    { name: '陈思思', src: '5.jpg', sex: 'male', des: '我喜欢看电影' },
    { name: '马学习', src: '6.jpg', sex: 'female', des: '我爸我妈爱学习' },
    { name: '马美丽', src: '7.jpg', sex: 'male', des: '我妈是美丽的妈妈' },
    { name: '张三', src: '8.jpg', sex: 'female', des: '漂亮的女孩子' },
    { name: '李四', src: '9.jpg', sex: 'female', des: '漂亮的男孩子' },
    { name: '马漂亮', src: '10.jpg', sex: 'male', des: '漂亮的女孩子' }
];
var listUl = document.getElementById('list');
var oInp = document.getElementById('inp');
var sUl = document.getElementById('sex');
render(person); 
//渲染dom结构
function render(list) {
    var str = '';
    list.forEach(function (ele, index) {
             str += '<li><img src="./img/' + ele.src +'" alt="">\
                <span class="name">'+ ele.name +'</span>\
                <span class="des">'+ ele.des +'</span></li>';
            });
            listUl.innerHTML = str;
}
oInp.oninput = function(){
    state.text = this.value;
    // render(filterText(text,person));
    render(addFn(filterFn,person));
}
function filterText(val,arr){
    var fArr = arr.filter(function(ele,index){
        if(ele.name.indexOf(val) !== -1) {
            return true;
        }
    });
    console.log(fArr)
    return fArr;
}
sUl.addEventListener('click',function(e){
    if(e.target.tagName == 'LI'){
        state.sex = e.target.getAttribute('sex');
        document.getElementsByClassName('active')[0].className = '';
        e.target.className = 'active';
        // render(filterSex(sex,person));
        render(addFn(filterFn,person));
    }
})
function filterSex(sex,arr){
    if(sex == 'all'){
        return arr;
    }else{
         return arr.filter(function(ele,index){
            if(sex == ele.sex){
                return true;
            }
        })
    }
}

//组合筛选  lastArr 上一次返回的数组 lastArr = person
//筛选条件：实现筛选条件的函数
var filterFn = {
    text:filterText,
    sex:filterSex
}
//筛选的条件 ：筛选的值 state.sex state.sex
var state = {
    text:'',
    sex:'all'
}
//组合筛选
function addFn(obj,arr){
    var lastArr = arr;
    for(var prop in obj){
        //filterText(text,arr)/tilterSex(sex,arr)
        //filterText(text,arr)/tilterSex
        lastArr = obj[prop](state[prop],lastArr);
    }
    return lastArr;
}
