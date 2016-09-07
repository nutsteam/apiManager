export const formToData = (form)=>{
    let formArray = $(form).serializeArray();
        
    console.log(formArray);
    
    let data = {};
    
    formArray.forEach((item)=>{
        if(data[item.name]){
            data[item.name] += ','+item.value 
        }else{
            data[item.name] = item.value;
        }
    });
    
    return data;
}

export const getUrlParam = (name)=>{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

export const objectToFormdata = (o)=>{
    let formData = new FormData();
    for(let k in  o){
        formData.append(k, o[k]);
    }

    return formData;
}

export const dateFormat = (date, fmt)=>{
    let o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const createTime = (str)=>{
    let strArray = str.split(' ')
    let dateArray = strArray[0].split('-')
    let timeArray = strArray[1].split(':')
    let yyyy = parseInt(dateArray[0])
    let MM = parseInt(dateArray[1]) - 1
    let dd = parseInt(dateArray[2])
    let HH = parseInt(timeArray[0])
    let mm = parseInt(timeArray[1])
    let ss = parseInt(timeArray[2])

    return new Date(yyyy, MM, dd, HH, mm, ss)
}

export const stringDateFormat = (str, fmt)=>{
    let date = createTime(str)
    return dateFormat(date, fmt)
}