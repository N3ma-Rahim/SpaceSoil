// Game data: crops, weather, missions, constants
const CROPS={
 maize:{n:'Maize',w:30,t:36,d:8,soil:-1,y:4,p:6,col:'#e8c547'},
 sorghum:{n:'Sorghum',w:15,t:42,d:7,soil:-.5,y:3,p:5,col:'#9a3b2e'},
 wheat:{n:'Wheat',w:22,t:32,d:6,soil:-1,y:4,p:4,col:'#d9b45a'},
 soybean:{n:'Soybean',w:24,t:35,d:7,soil:1,y:3,p:8,col:'#6fbf5a'},
 clover:{n:'Cover crop (clover)',w:12,t:36,d:5,soil:2,y:1,p:2,col:'#a66bbf'}};
const WX={normal:{n:'Normal',T:27,rain:0,refill:50},drought:{n:'Drought',T:33,rain:0,refill:15},heat:{n:'Heatwave',T:41,rain:0,refill:25},rain:{n:'Rainy',T:24,rain:1,refill:80}};
const MIS={
 none:{n:'Free play'},
 fresno:{n:'Water Stress – Fresno County, CA',wx:'drought',tank:40,soil:60,goal:'Harvest 4 crops while the tank stays above 0.',chk:s=>s.hv>=4},
 ludhiana:{n:'Heat Stress – Ludhiana, India',wx:'heat',tank:70,soil:60,goal:'Harvest 4 crops during a heatwave. Heat-tolerant crops help.',chk:s=>s.hv>=4},
 gezira:{n:'Soil Health – Gezira, Sudan',wx:'normal',tank:70,soil:40,goal:'Raise average soil health to 70 using rotation and cover crops.',chk:s=>avg(s,'s')>=70}};
const SEASONS=['Spring','Summer','Autumn','Winter'],COLS=6,ROWS=3,CW=120,CH=100,OX=120,OY=190;
