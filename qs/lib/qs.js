var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var myneb = new Neb();
myneb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));
var account, tx, txhash;
var dappaddress="n1tWyi3GLw9gsswmxnjS5zF2BhYmRA2WNLr";
function createResultDiv(titleText)	//创建结果区
{
	var maindiv=document.getElementById("main");	//获取主块
	var resultDiv=document.getElementById('resultarea');	//获取并删除之前的转换结果div
	if(resultDiv!=null)
	{
		maindiv.removeChild(resultDiv);
	}
	resultDiv=document.createElement("div");	//创建元素
	resultDiv.setAttribute("id","resultarea");
	maindiv.appendChild(resultDiv);				//追加到主块
	resultTitle=document.createElement("h1");
	// var node=document.createTextNode(titleText+"的情书");
	var node=document.createTextNode("情书细节");

	resultTitle.appendChild(node);
	resultDiv.appendChild(resultTitle);
}
function addNewResult(result,resultNumber=0,resultBoxRows=10)	//添加监听结果
{
	var resultDiv=document.getElementById('resultarea');
	var newresultDiv=document.createElement("div");
	var copyButton=document.createElement("button");
	
	newresult=document.createElement("textarea");
	newresult.value=result;
	newresult.setAttribute("id","resultBox"+resultNumber);
	newresult.setAttribute("class","resultBox");
	newresult.setAttribute("rows",resultBoxRows);
	
	var node=document.createTextNode("点击复制以下内容");
	copyButton.appendChild(node);
	copyButton.setAttribute("data-clipboard-target","#resultBox"+resultNumber);
	copyButton.setAttribute("class","btn");
	
	newresultDiv.appendChild(copyButton);
	newresultDiv.appendChild(newresult);
	resultDiv.appendChild(newresultDiv);
}
function getnewmes(username)
{
	createResultDiv(username);
	var dapp_address=dappaddress;
	var dapp_function="getnewmes";
	if(username)
	{
		var dapp_arguments=username;
	}
	else{
		var dapp_arguments=document.getElementById('username').value;
	}
	myneb.api.call({
					from:dapp_address,
                    to: dapp_address,
                    value: 0,
                    contract: {
						function: dapp_function,
						args: "[\""+dapp_arguments+"\"]"
					},
					   gasPrice: 1000000,
						gasLimit: 2000000,
                }).then(function(tx) {
					// addNewResult(JSON.parse(tx.result).trim());
					addNewResult(JSON.parse(tx.result).maintext.trim());

				})
}

function send_i_love_u()
{
		var arguments =  "[\"" + document.getElementById('username').value + "\",\"" + document.getElementById('maintext').value + "\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappaddress,
                "value" : "0",
                "contract" : {
                    "function" : "send_i_love_u",
                    "args" : arguments
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
}
function delllll()
{
	var arguments =  "[\"" + document.getElementById('username').value + "\"]";
        window.postMessage({
            "target": "contentscript",
            "data":{
                "to" : dappaddress,
                "value" : "0",
                "contract" : {
                    "function" : "del",
                    "args" : arguments
                }
            },
            "method": "neb_sendTransaction"
        }, "*");
}
function del(username)
{
	createResultDiv(username);
	var dapp_address=dappaddress;
	var dapp_function="del";
	if(username)
	{
		var dapp_arguments=username;
	}
	else{
		var dapp_arguments=document.getElementById('username').value;
	}
	myneb.api.call({
					from:dapp_address,
                    to: dapp_address,
                    value: 0,
                    contract: {
						function: dapp_function,
						args: "[\""+dapp_arguments+"\"]"
					},
					   gasPrice: 1000000,
						gasLimit: 2000000,
                }).then(function(tx) {
					// addNewResult(JSON.parse(tx.result).trim());
					addNewResult((tx.result).trim());

				})
}
