(function(){var t,k,w,n,p,C,q,r,x,e,y,z,u,D,G,H,I,E,W,J,K,L,M,X,N,Y,A,Z,aa,O,ba,ca,da,ea,fa,P,Q,R,S,B,b,T,U,s,ga,ha,ia,ja,f,ka,h,d,m,g,V,F,v;q=C=p=null;d={sock:null,token:null,connected:!1,waiting_result:!1,on_err:null,hist_n:10,wd_success_timeout:null};r="0.05";x="0.000001";e=0;z=y=!1;b={width:Math.min(330,$(document).width()-10),height:320<$(document).height()?170:130,padding:16,dataset:[0,0,0,0,0,0,0,0,0,0],svg:null,xscale:null,yscale:null,updating:!1,resetting:!1};k=0;w=1;n=null;t=[!0,null];D=
/^([0-9]+)?(\.([0-9]{1,8})?)?$/;F=function(){var a,c;c=$("#bet").val().trim().replace(",",".");a=Number(c);return!D.test(c)||isNaN(a)||a<x||a>r?null:e=a};J=function(a){a.preventDefault();if(null!=F())return e*=2,e>r?e=r:D.test(e)||(e=e.toFixed(8)),$("#bet").val(e)};L=function(a){a.preventDefault();if(null!=F()){e/=2;if(e<x||!D.test(e))e=x;return $("#bet").val(e)}};Q=function(a){a.preventDefault();e=r;return $("#bet").val(e)};V=function(a){$("#low").removeClass("orange");$("#high").removeClass("orange");
$("#high").removeClass("bold");$("#low").removeClass("bold");if(null!=a)return $(a?"#high":"#low").addClass("bold")};v=function(a,c,b){if(a.length>=c)return a;null==b&&(b="0");return(Array(c+1).join(b)+a).slice(-1*c)};W=function(a){var c;a=new Date(1E3*a);c=""+(""+a.getFullYear()+"-")+v(a.getMonth()+1,2)+"-"+v(a.getDate(),2);a=""+v(a.getHours(),2)+":"+v(a.getMinutes(),2)+":"+v(a.getSeconds(),2);return""+c+" "+a};ha=function(){return $("#bet").removeClass("animated shake")};ga=function(){$("#inner-num").removeClass("animated flip");
return t[1]=null};u=[];B=null;f=function(a,c,b){var d;null==c&&(c=3E3);null==b&&(b=0);if(a!==u[u.length-1])return u.push(a),d=function(){var b;b=$("#show-alert");b.prepend("<div class='alert alert-red'>"+a+"</div>");return setTimeout(function(){u.pop();return b.children(".alert").first().remove()},c)},b?B=setTimeout(d,b):d()};ka=function(a,c){var b;null==c&&(c=3500);b="<div class='alert alert-blue'>"+a+"</div>";$("#show-alert").prepend(b);return setTimeout(function(){return $("#show-alert").children(".alert").first().remove()},
c)};ea=function(){u.length=0;$(".alert").remove();if(null!=B)return clearTimeout(B),B=null};I=function(a){a.preventDefault();return K(!1)};H=function(a){a.preventDefault();return K(!0)};K=function(a){var c;if(d.waiting_result||y)d.waiting_result?f("Still waiting for the last result",3E3,3E3):f("Still waiting for an action");else if(z=!0,V(a),c=F(),null===c)$("#bet").addClass("animated shake"),setTimeout(ha,1500),O({error:"Bet not placed",result:-1}),$("#high").addClass("orange"),$("#low").addClass("orange");
else return a={type:"bet",high:a,amount:c.toString()},h(a)};O=function(a){var c,l;z=!1;null===a.pattern?($("#low").addClass("orange"),$("#high").addClass("orange")):0<=a.result&&(y=!0);if(null!=a.error)f(a.error);else{ea();$("#nonce").val(a.nonce);$("#num").removeClass("lose");$("#num").removeClass("win");$("#profit").removeClass("lose");$("#profit").removeClass("win");c=a.result;$("#num").text(c);a.win?($("#profit").text("+"+a.profit_display),t[0]&&null===t[1]&&($("#inner-num").addClass("animated flip"),
t[1]=setTimeout(ga,1100)),$("#profit").addClass("win"),$("#num").addClass("win")):($("#num").addClass("lose"),$("#profit").addClass("lose"),$("#profit").text(a.profit_display),t[0]&&$("#inner-num").removeClass("animated flip"));$("#balance").text(a.balance_display);b.dataset[c]++;s();if(10>b.dataset[c])d3.select("#marker-"+c).style("display","none");else if(10===b.dataset[c])d3.select("#marker-"+c).style("display","block");else if(10<b.dataset[c]){for(c=l=0;9>=l;c=l+=1)b.dataset[c]=0,d3.select("#marker-"+
c).style("display","none");setTimeout(s,300)}if(null!==a.pattern)return $("#pattern").text(a.pattern),$("#pattern-action").show(),G()}};G=function(){var a;k=0;w=1;null!==n&&(clearInterval(n),n=null);a=function(){var a;if(!b.updating){a="#rect-"+k;d3.select(a).attr("fill","orange");d3.select(a).transition().duration(300).attr("fill","black");k+=w;if(11===k)return k-=1,w=-1;if(-2===k)return k+=1,w=1}};return setTimeout(function(){return n=setInterval(a,50)},150)};s=function(a){var c;b.updating=!0;b.yscale=
d3.scale.linear().domain([0,d3.max(b.dataset)]).range([b.padding,b.height-b.padding]);b.svg.selectAll("rect").data(b.dataset).transition().duration(125).attr("y",function(a){return b.height-b.padding-b.yscale(a)}).attr("height",function(a){return b.yscale(a)-b.padding});b.svg.selectAll("text").data(b.dataset).text(function(a){return a}).attr("y",function(a){return b.height-b.padding-b.yscale(a)+16});c=function(){clearInterval(n);n=null;return b.updating=!1};return a?c():setTimeout(c,125)};U=function(a){return h({type:"reset",
counter:a})};T=function(a){var c,l;for(c=l=0;9>=l;c=l+=1)b.dataset[c]=0,d3.select("#marker-"+c).style("display","none");return s(a)};Z=function(a){d3.select("#marker-"+a).style("display","none");b.dataset[Number(a)]=0;return s()};A=function(a,c,l){$("#pattern").text("None");$("#pattern-action").hide();b.updating=!0;clearInterval(n);c=function(){y=!1;$("#low").addClass("orange");$("#high").addClass("orange");b.svg.selectAll("rect").attr("fill","black");s(l);if(!a)return T(l)};return l?c():setTimeout(c,
300)};R=function(){return h({type:"pattern-collect"})};S=function(){return h({type:"pattern-continue"})};ja=function(){var a,c;b.xscale=d3.scale.ordinal().domain(d3.range(b.dataset.length)).rangeRoundBands([0,b.width],0.05);b.yscale=d3.scale.linear().domain([0,d3.max(b.dataset)]).range([b.padding,b.height-b.padding]);b.svg=d3.select("#plot").append("svg:svg").attr("width",b.width).attr("height",b.height).attr("class","chart");for(a=c=0;9>=c;a=c+=1)b.svg.append("svg:line").attr("class","line").attr("id",
"marker-"+a).attr("x1",b.xscale(a)+b.xscale.rangeBand()/2).attr("y1",0).attr("x2",b.xscale(a)+b.xscale.rangeBand()/2).attr("y2",b.height-2*b.padding).style("stroke","red").style("stroke-width",b.xscale.rangeBand()+4).style("display","none");b.svg.selectAll("rect").data(b.dataset).enter().append("rect").attr("id",function(a,c){return"rect-"+c}).attr("x",function(a,c){return b.xscale(c)}).attr("width",b.xscale.rangeBand()).attr("fill",function(a){return"black"}).on("mouseenter",function(){return b.updating?
!1:d3.select(this).attr("fill","orange")}).on("mouseleave",function(a){return b.updating?!1:d3.select(this).transition().duration(300).attr("fill","black")});b.svg.selectAll("rect").on("click",function(a,c){d3.event.stopPropagation();d3.select(this).attr("fill","black");return U(c)});b.svg.selectAll("text").data(b.dataset).enter().append("text").text(function(a){return a}).attr("text-anchor","middle").attr("x",function(a,c){return b.xscale(c)+b.xscale.rangeBand()/2}).attr("y",function(a){return b.height-
b.padding-b.yscale(a)+16}).attr("fill","white");a=d3.svg.axis().scale(b.xscale);return b.svg.append("g").attr("class","axis").attr("transform","translate(0, "+(b.height-2*b.padding)+")").call(a)};ia=function(){var a,c,b;Mousetrap.bind("k",S);Mousetrap.bind("t",R);Mousetrap.bind("a",I);Mousetrap.bind("b",H);Mousetrap.bind("x",J);Mousetrap.bind("c",L);Mousetrap.bind("m",Q);b=[];for(a=c=0;9>=c;a=c+=1)b.push(Mousetrap.bind(a.toString(),function(a){a=String.fromCharCode(a.which);U(a);return!1}));return b};
h=function(a){if(!d.waiting_result){if(d.connected)return d.waiting_result=!0,a.token=d.token,d.sock.send(JSON.stringify(a));d.waiting_result=!1;f("Not connected");if(null!=d.on_err)return d.on_err(),d.on_err=null}};P=function(a,c){return h({type:"login",user:a,pwd:c})};Y=function(a){d.token=a.token;$("#jackpot").text(a.jackpot);$(".edge").text(""+a.edge+"%");$(".edge-ex").text(a.edge_example);return $("#jpincr").text(a.jp_incr)};$("#new-useed").click(function(){this.focus();return this.select()});
aa=function(a){if(null!=a.error)$("#reseed").addClass("orange"),f(a.error);else return $("#reseed").hide(),$("#reseeding").show(),$("#sseed").val(a.old_secret),$("#new-sshash").val(a.new_sshash),$("#new-useed").val(a.initial_useed),$("#new-useed").click()};ca=function(a){if(null!=a.error)f(a.error);else return $("#reseeding").hide(),$("#reseed").addClass("orange"),$("#reseed").show(),$("#sseed").val(""),$("#nonce").val("1"),$("#useed").val($("#new-useed").val()),$("#sshash").val($("#new-sshas").val()),
$("#new-sshash").val(""),$("#new-useed").val("")};da=function(a){$("#send-coins").addClass("orange");if(null!=a.error)f(a.error);else return $("#wd-amount").text(a.amount),$("#wd-toaddr").text(a.toaddr),$("#wd-txid").text(a.txid),$("#wd-success").show(),a=function(){d.wd_success_timeout=null;return $("#wd-success").hide()},d.wd_success_timeout&&clearTimeout(d.wd_success_timeout),d.wd_success_timeout=setTimeout(a,12E4)};ba=function(a){if(null!=a.error)f("Signup error: "+a.error),d.on_err();else if(a.created)return P($("#new-user").val(),
$("#new-pwd").val()),$("#new-user").val(""),$("#new-pwd").val(""),g("#signup"),$("#send-signup").addClass("orange")};X=function(a){var c,d;$("#send-login").addClass("orange");if(null!=a.error)f("Login error: "+a.error);else if(a.login){$("#user").val("");$("#pwd").val("");$("#show-login").hide();$("#show-signup").hide();$("#show-account").show();$("#do-logout").show();$("#login-text").text("Logged in");$("#num").text("?");$("#num").removeClass("win");$("#num").removeClass("lose");$("#profit").text("");
C=a.balance;q=a.address;p=a.login;$("#balance-text").text("Bitcoins");$("#balance").text(C);$("#username").text(""+p+" (#"+a.uid+")");$("#addr").val(q);$("#nonce").val(a.nonce);$("#useed").val(a.useed);$("#sshash").val(a.sshash);x=a.min_bet;r=a.max_bet;c=$("#history tbody");c.empty();M(a.hist,!1);a.hist=null;"undefined"!==typeof m&&null!==m&&g("#login");A(!1,0,!0);for(c=d=0;9>=d;c=d+=1)b.dataset[c]=a.game[c],10===a.game[c]&&d3.select("#marker-"+c).style("display","block");s();if(a.hit_pattern)return y=
!0,$("#low").removeClass("orange"),$("#high").removeClass("orange"),$("#pattern").text(a.hit_pattern),$("#pattern-action").show(),G()}};N=function(){C=q=p=null;g(m);$("#balance-text").text("Free play");$("#balance").text("-");$("#login-text").text("No user");$("#show-account").hide();$("#do-logout").hide();$("#show-login").show();$("#show-signup").show();$("#low").addClass("orange");$("#high").addClass("orange");$("#wd-success").hide();$("#addr").val("");$("#reseeding").hide();$("#reseed").addClass("orange");
$("#reseed").show();$("#sseed").val("");$("#new-sshash").val("");$("#new-useed").val("");d.wd_success_timeout&&(clearTimeout(d.wd_success_timeout),d.wd_success_timeout=null);$("#wd-success").hide();$("#wd-amount").text("");$("#wd-toaddr").text("");$("#wd-txid").text("");$("#send-coins").addClass("orange");return A(!1,0)};M=function(a,c){var b,f,e,h,g,k;if(c)for(;$("#history tbody tr").length+a.length>d.hist_n;)$($("#history tbody tr")[0]).remove();b="";g=0;for(k=a.length;g<k;g++)f=a[g],e=$.parseJSON(f),
h="<td class='hist-when'>"+W(e.when)+"</td>",f="<td class='hist-descr'>"+e.descr+"</td>",b+="<tr><td style='text-align: center'>"+e.id+"</td>"+h+f+"</tr>";return $("#history tbody").append(b)};m=null;g=function(a){if(a===m)return $("#wrapper-menu-item").hide(),null!=a&&$(a).toggle(),m=null,Mousetrap.unpause(),!1;null!=m?($(m).hide(),$(a).show()):($("#wrapper-menu-item").toggle(),$(a).toggle(),Mousetrap.pause());m=a;return!0};fa=function(a,c){if(a)return bitcoin.getTransaction(c,function(a){return alert("Thanks! "+
a.amount/bitcoin.BTC_IN_SATOSHI+" BTC was just sent to user "+p+". Now you just need to wait for 1 confirmation.")})};E=function(a,c){var b,d,f,e;e=[];d=0;for(f=a.length;d<f;d++)b=a[d],e.push($(b).keyup(function(a){if(13===a.keyCode)return $(c).click(),a.preventDefault()}));return e};(function(){d.on_open=function(){d.connected=!0;$("#connecting").hide();$("#top-status").show();$("#bottom-status").show();$("#send-login").addClass("orange");$("#low").addClass("orange");$("#high").addClass("orange");
return T()};d.on_close=function(){d.connected=!1;N();$("#top-status").hide();$("#bottom-status").hide();$("#connecting").show();$("#low").removeClass("orange");$("#high").removeClass("orange");return $("#send-login").removeClass("orange")};d.on_message=function(a){a=$.parseJSON(a.data);d.waiting_result=!1;switch(a.type){case "open":Y(a);break;case "bet":O(a);break;case "reset":Z(a.counter);break;case "signup":ba(a);break;case "reseed":aa(a);break;case "userseed":ca(a);break;case "login":X(a);break;
case "logout":N();break;case "pattern-collect":A(!1,a.amount);$("#balance").text(a.balance);break;case "pattern-continue":A(!0);break;case "bet-update":$("#jackpot").text(a.jackpot);null!=a.maxbet&&(r=a.maxbet);break;case "balance":$("#balance").text(a.balance);break;case "address":q=a.address;$("#addr").val(a.address);break;case "withdraw":da(a);break;case "warning":ka(a.warning);break;case "hist":break;case "error":f("Error: "+a.reason);z&&(z=!1,$("#low").addClass("orange"),$("#high").addClass("orange"));
null!=d.on_err&&(d.on_err(),d.on_err=null);break;default:f("Unknown message '"+a.type+"'")}if(null!=a.hist&&a.hist.length)return M(a.hist,!0)};d.sock=new SockReconnect("https://gl.dice.gg/sock",null,null,d.on_message,d.on_open,d.on_close);d.sock.connect();V(null);$("#pattern").text("None");$("#pattern-action").hide();$("#pattern-collect").click(function(a){a.preventDefault();return R()});$("#pattern-continue").click(function(a){a.preventDefault();return S()});ja();$("#low").click(I);$("#high").click(H);
$("#doubleit").click(J);$("#halfit").click(L);$("#maxit").click(Q);ia();$("#show-login").click(function(a){a.preventDefault();if(g("#login"))return $("#user").focus()});$("#send-login").click(function(a){var b;a.preventDefault();b=$("#user").val().trim();a=$("#pwd").val();if(b&&a)return $("#send-login").removeClass("orange"),P(b,a);f("Fill all the fields");$("#user").focus()});$("#show-deposit").click(function(a){a.preventDefault();return null!=p?(30>$("#addr").val().length&&h({type:"address",coin:"BTC"}),
g("#deposit")):g("#deposit-nologin")});$("#show-withdraw").click(function(a){a.preventDefault();return null!=p?g("#withdraw"):g("#deposit-nologin")});$("#show-help").click(function(a){a.preventDefault();return g("#help")});$("#show-signup").click(function(a){a.preventDefault();if(g("#signup"))return $("#new-user").focus()});$("#send-signup").click(function(a){var b,e;a.preventDefault();e=$("#new-user").val().trim();a=$("#new-pwd").val();b=$("#new-pwd-check").val();if(e){if(a&&a===b)return $("#send-signup").removeClass("orange"),
d.on_err=function(){return $("#send-signup").addClass("orange")},a={type:"signup",user:e,pwd:a},h(a);f("Check the passwords")}else f("Username is required")});"undefined"===typeof bitcoin||null===bitcoin?($("#lbl-addr").show(),$("#send-hive").hide()):($("#lbl-addr").hide(),$("#send-hive").show());$("#send-hive").click(function(a){a.preventDefault();if("undefined"!==typeof bitcoin&&null!==bitcoin)return q?bitcoin.sendMoney(q,null,fa):f("No address defined")});$("#show-account").click(function(a){a.preventDefault();
return g("#account")});$("#hide-seed").click(function(a){$("#fair-seed").toggle();return $("#hide-seed").text("none"!==$("#fair-seed").css("display")?"Hide":"Show")});$("#hide-history").click(function(a){$("#history").toggle();return $("#hide-history").text("none"!==$("#history").css("display")?"Hide":"Show")});$("#reseed").click(function(a){a.preventDefault();$("#reseed").removeClass("orange");d.on_err=function(){return $("#reseed").addClass("orange")};return h({type:"reseed"})});$("#send-useed").click(function(a){a.preventDefault();
return(a=$("#new-useed").val().trim())?h({type:"userseed",seed:a}):f("No seed entered")});$("#send-coins").click(function(a){var b;b=$("#wd-amount").val().trim();a=$("#wd-addr").val().trim();if(b&&a)if(1.6E-4>Number(b))f("Amount is below minimum");else return $("#send-coins").removeClass("orange"),h({type:"withdraw",amount:b,toaddr:a});else f("All fields are required")});$("#do-logout").click(function(a){a.preventDefault();return h({type:"logout"})});E(["#user","#pwd"],"#send-login");E(["#new-user",
"#new-pwd","#new-pwd-check"],"#send-signup");E(["#wd-amount"],"#send-coins");setInterval(function(){return $("#num").toggleClass("highlight")},1500);return $("#bet").focus()})()}).call(this);
