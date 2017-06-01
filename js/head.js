// JavaScript Document
function Check(theform)
{ 
 if (theform.query.value=="")
 {
alert("请输入关键词！")
theform.query.focus();
return (false);
 }
 
}
function IsValid( oField )
{
 re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
 $sMsg = "请您不要在参数中输入特殊字符和SQL关键字！"
 if ( re.test(oField.value) )
 {
alert( $sMsg );
oField.value = '';
oField.focus();
return false;
 }
}

document.write("<table width=\"990\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"><tr><td height=\"108\" align=\"center\" bgcolor=\"eaeaea\" ><table width=\"990\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");
document.write("<tr><td width=\"688\" rowspan=\"2\" align=\"left\" style=\"padding-left:10px\"><a href=\"http://www.zjgsu.edu.cn\"><img src=\"http://www.zjgsu.edu.cn/images/logo.gif\" width=\"358\" height=\"81\" border=\"0\"  class=\"filter\"/></a></td>");
// 头部
document.write("<td width=\"115\" height=\"45\" align=\"left\" style=\"padding-top:5px\"><a href=\"http://www.zjgsu.edu.cn/news/\" class=\"title\">新闻网</a> / <a href=\"http://www.zjgsu.edu.cn/english/\" class=\"title\" target=\"_blank\">ENGLISH</a> </td>");
document.write("<td width=\"200\" align=\"left\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><form name=\"searchform\" action=\"/search/search.htm\" method=\"get\"><tr><td width=\"70%\" style=\"padding-top:5px\"><input name=\"query\" type=\"text\" style=\"height:19px;width:98%;padding-top:3px;color:#999\" value=\"请输入检索关键字\" onblur=\"IsValid(this);\" onFocus=\"this.value='';\"/><td width=\"30%\" align=\"left\" style=\"padding-top:3px\"><input type=\"image\" name=\"imageField\" src=\"http://www.zjgsu.edu.cn/images/search.gif\" /></td></tr></form></table></td></tr>");
document.write("<tr><td colspan=\"2\" align=\"left\" valign=\"top\" style=\"padding-top:0px\"><a href=\"/Channel_44/\" class=\"title\" >学生</a> 　|　 <a href=\"/Channel_47/\" class=\"title\" >教职工</a> 　|　 <a href=\"http://xyh.zjgsu.edu.cn/\" class=\"title\" target=\"_blank\">校友</a> 　|　 <a href=\"/Channel_49/\" class=\"title\" >考生及访客</a></td></tr></table></td></tr>");
// 导航
document.write("<tr><td align=\"center\" background=\"./images/bgnav.gif\">");
document.write("<div  id=\"menu\"><ul id=\"jsddm\">");
document.write("<li><a href=\"/\"><img src=\"./images/nav_0.gif\" width=\"95\" height=\"65\" border=\"0\" /></a>	</li>");

// 校情总揽
document.write("<li><a href=\"#\"><img src=\"./images/nav_1.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"/Channel_1/\">学校概况</a></li><li><a href=\"/Channel_86/\">学校章程</a></li><li><a href=\"/Channel_2/\">机构设置</a></li><li><a href=\"/Channel_3/\">现任领导</a></li><li><a href=\"/Channel_4/\">历史沿革</a></li><li><a href=\"/Channel_5/\">历任领导</a></li><li><a href=\"/Channel_6/\">大事记</a></li><li><a href=\"/Channel_7/\">校园风光</a></li><li><a href=\"/Channel_80/\">校  训</a></li><li><a href=\"/Channel_89/\">年度月历</a></li></ul></li>");

// 人才培养
document.write("<li><a href=\"#\"><img src=\"./images/nav_2.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"http://www.zjgsu.edu.cn/Channel_51/\" >师资队伍</a></li><li><a href=\"http://jww.zjgsu.edu.cn/\" target=\"_blank\">本科生教育</a></li><li><a href=\"http://yjs.zjgsu.edu.cn\" target=\"_blank\">研究生教育</a></li><li><a href=\"http://jxjy.zjgsu.edu.cn/\" target=\"_blank\">继续教育</a></li><li><a href=\"http://sie.zjgsu.edu.cn/\" target=\"_blank\">国际学生教育</a></li></ul></li>");

// 科学研究
document.write("<li><a href=\"#\"><img src=\"./images/nav_3.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"/Channel_13/\">重点学科</a></li><li><a href=\"/Channel_14/\">科研平台</a></li><li><a href=\"/Channel_15/\">科研成果</a></li><li><a href=\"http://kyc.zjgsu.edu.cn/kyc_new/index.jsp\" target=\"_blank\">科研动态</a></li><li><a href=\"http://zzs.zjgsu.edu.cn/\" target=\"_blank\">学术刊物</a></li></ul></li>");

// 招生就业
document.write("<li><a href=\"#\"><img src=\"./images/nav_4.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"http://zhaoban.zjgsu.edu.cn/indexzb.asp\" target=\"_blank\">本科生招生</a></li><li><a href=\"http://yjszs.zjgsu.edu.cn/\" target=\"_blank\">研究生招生</a></li><li><a href=\"http://zs.zjgsu.edu.cn/\" target=\"_blank\">继续教育招生</a></li><li><a href=\"http://sie.zjgsu.edu.cn/\" target=\"_blank\">国际学生招生</a></li><li><a href=\"http://jyw.zjgsu.edu.cn/\" target=\"_blank\">本科生就业</a></li><li><a href=\"http://jyw.zjgsu.edu.cn/\" target=\"_blank\">研究生就业</a></li></ul></li>");
// 国际交流
document.write("<li><a href=\"#\"><img src=\"./images/nav_5.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"/Channel_24/\">国际交流概况</a></li><li><a href=\"/Channel_25/\">中外合作办学</a></li><li><a href=\"/Channel_26/\">校际合作</a></li><li><a href=\"/Channel_27/\">外宾来访</a></li></ul></li>");

// 校园文化
document.write("<li><a href=\"#\"><img src=\"./images/nav_6.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"http://bjbk.zjgsu.edu.cn/\" target=\"_blank\">百家百科讲坛</a></li><li><a href=\"http://international.zjsu.edu.cn/hyjz.asp\" target=\"_blank\">五洲讲坛</a></li><li><a href=\"http://youth.zjgsu.edu.cn\" target=\"_blank\">商大青年</a></li><li><a href=\"http://zhdas.zjgsu.edu.cn/.g?$$$layoutTemplate=hdfs://localhost:9000/10000/AT0b&menuId=M08&lm=ST_I\" target=\"_blank\">校史馆</a></li><li><a href=\"http://www.zsbwg.org/\" target=\"_blank\">浙商博物馆</a></li><li><a href=\"http://120.26.82.151:8080/zhexiaoshang/\" target=\"_blank\">浙小商工作室</a></li><li><a href=\"http://mictheory.zjsu.edu.cn:8000/\" target=\"_blank\">商大微理论</a></li><li><a href=\"http://sg.zjgsu.edu.cn/gandong/\" target=\"_blank\">寻找身边的感动</a></li></ul></li>");

// 信息服务
document.write("<li><a href=\"#\"><img src=\"./images/nav_7.gif\" width=\"125\" height=\"65\"/></a><ul><li><a href=\"/Channel_32/\">常用电话</a></li><li><a href=\"/Channel_33/\">班车时刻表</a></li><li><a href=\"/Channel_34/\">校历与作息</a></li><li><a href=\"/Channel_35/\">每周安排</a></li><li><a href=\"/Channel_68/\">校标校歌</a></li><li><a href=\"/Channel_36/\">学校地图</a></li><li><a href=\"/Channel_79/\">服务指南</a></li><li><a href=\"http://124.160.64.249:8080/EducationManager/\" target=\"_blank\">收费管理平台</a></li><li><a href=\"http://www.zjedu.gov.cn\" target=\"_blank\">浙江省教育厅</a></li><li><a href=\"/Channel_76/\">浙江省主要高校</a></li><li><a href=\"/Channel_77/\">全国财经类院校</a></li></ul></li>");

document.write("</ul></div><div class=\"clear\"> </div>	</td></tr>");
document.write("<tr><td height=\"20\" background=\"http://www.zjgsu.edu.cn/images/bgbanner_top.gif\"></td></tr></table>");
