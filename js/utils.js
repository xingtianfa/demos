


//判断登录
function checkLogin()
{
	if(!$api.getStorage('token') || $api.getStorage('token') == "" || $api.getStorage('token') == null || $api.getStorage('token') == 'undefined'){
		alert('false')
		//return false;
	}else{
		alert('true')
		//return true;
	}
}

//手机号判断

function checkMobile(str){
	if(str == '' || !(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(str))
	{
		return false;
	}
	else{
		return true;
	}
}
// 设置COOKIE时间
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
// 获取COOKIE
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
　　 	return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/*邮箱验证*/
function checkMail(str){
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式

    if(str == "" || !reg.test(obj.value)){
        return false;
    }else{

        return true;
    }
}

function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
}
