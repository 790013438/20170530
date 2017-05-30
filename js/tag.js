//if(!MiniSite.Cookie.get("QQ_Index_IP_1HrCache")){MiniSite.Home.print();}
function k(o){ return (typeof o == "object")?o:document.getElementById(o);}
function getNames(obj,name,tij){var plist = k(obj).getElementsByTagName(tij);var rlist = new Array();for(i=0;i<plist.length;i++){if(plist[i].getAttribute("name") == name){rlist[rlist.length] = plist[i];}}return rlist;}

function register0410(item,page) 
{try{var type = window.event.srcElement.tagName;if (type == "A" || type == "IMG" ) {call_0410(type,item, page);}return true;}catch(e){}}


function fod(obj,name)
		{
			var p = obj.parentNode.getElementsByTagName("td");
			var p1 = getNames(name,"f","div"); // document.getElementById(name).getElementsByTagName("div");
			for(i=0;i<p1.length;i++)
			{
				if(obj==p[i])
				{
					p[i].className = "m"+[i];
					p1[i].className = "dis";
				}
				else
				{
					p[i].className = "n"+[i];
					p1[i].className = "undis";
				}
			}
		}