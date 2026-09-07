const fs=require('fs'),path=require('path');
const {pathToFileURL}=require('url');
const deps='C:/Users/adam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const {chromium}=require(path.join(deps,'playwright'));
const {PDFDocument}=require(path.join(deps,'pdf-lib'));
const sharp=require(path.join(deps,'sharp'));
const root=path.resolve(__dirname,'../..'),out=path.join(root,'outputs/Cypress_Command_Brand_System_v1.0'),qa=path.join(__dirname,'qa');
for(const p of ['social/templates','print','colors'])fs.mkdirSync(path.join(out,p),{recursive:true});
fs.mkdirSync(qa,{recursive:true});
const C={cypress:'#1E4D3A',moss:'#2F6B4E',amber:'#D97706',charcoal:'#0A1F16',bone:'#F3EDE0'};
const fontface=`@font-face{font-family:Fraunces;src:url('../../fonts/Fraunces-400.woff2');font-weight:100 900}@font-face{font-family:Inter;src:url('../../fonts/Inter-400.woff2');font-weight:100 900}`;
const spec=[
 {name:'og-default',w:1200,h:630,tone:'light',kind:'landscape'},
 {name:'brand-square',w:1080,h:1080,tone:'dark',kind:'square'},
 {name:'brand-portrait',w:1080,h:1350,tone:'light',kind:'portrait'},
 {name:'brand-story',w:1080,h:1920,tone:'dark',kind:'story'},
 {name:'wide-banner-4x1',w:1584,h:396,tone:'dark',kind:'banner'},
 {name:'wide-banner-3x1',w:1500,h:500,tone:'light',kind:'banner'},
 {name:'video-background',w:1920,h:1080,tone:'dark',kind:'video'},
 {name:'desktop-wallpaper',w:3840,h:2160,tone:'dark',kind:'video'},
 {name:'announcement-square',w:1080,h:1080,tone:'light',kind:'announcement'}
];
for(const s of spec){
 const dark=s.tone==='dark',logo=dark?'reverse':'primary',bg=dark?C.cypress:C.bone,fg=dark?C.bone:C.charcoal;
 const headline=s.kind==='announcement'?'[Announcement title]':'Systems under control.<br>Results that last.';
 const headlineSize=s.kind==='story'?96:s.kind==='portrait'?84:s.kind==='banner'?57:s.kind==='landscape'?70:80;
 const pad=s.kind==='story'?112:Math.round(s.w*.07);
 const logoW=s.kind==='video'?Math.round(s.w*.22):s.kind==='banner'?310:400;
 const source=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Cypress Command ${s.name}</title><style>${fontface}*{box-sizing:border-box}html,body{margin:0;width:${s.w}px;height:${s.h}px;overflow:hidden}body{background:${bg};color:${fg};font-family:Inter,sans-serif;position:relative;padding:${pad}px}.logo{width:${logoW}px;display:block;margin-left:-${Math.round(logoW*.066)}px}h1{font-family:Fraunces,serif;font-weight:450;font-variation-settings:'opsz' 72;font-size:${headlineSize}px;line-height:1.1;letter-spacing:-.025em;margin:0;max-width:${s.kind==='banner'?820:s.w-2*pad}px}.content{position:absolute;left:${pad}px;right:${pad}px;top:${s.kind==='story'?'43%':s.kind==='portrait'?'49%':s.kind==='square'||s.kind==='announcement'?'50%':s.kind==='landscape'?'43%':'34%'}}.accent{width:58px;height:5px;background:${C.amber};margin-bottom:30px}.foot{position:absolute;left:${pad}px;bottom:${s.kind==='story'?200:pad}px;font-size:20px;line-height:1.5;letter-spacing:.01em}.symbol{width:240px;position:absolute;right:${pad}px;top:145px}.bracket{position:absolute;right:${pad}px;top:${pad}px;bottom:${pad}px;width:60px;border-top:2px solid ${fg}44;border-bottom:2px solid ${fg}44;border-right:2px solid ${fg}44}.banner .logo{position:absolute;right:${pad}px;left:auto;top:50%;transform:translateY(-50%);margin:0;width:${logoW}px}.banner .content{right:480px;top:50%;transform:translateY(-50%)}.banner .foot,.banner .accent{display:none}.video .logo{position:absolute;right:${pad}px;top:${Math.round(s.h*.08)}px;left:auto;margin:0}.video .content,.video .foot{display:none}.video .bracket{top:auto;height:${Math.round(s.h*.25)}px;width:${Math.round(s.w*.15)}px;bottom:${Math.round(s.h*.08)}px;border-top:0;opacity:.6}</style><body class="${s.kind}"><img class="logo" src="../../logos/svg/cc-04c-horizontal-${logo}.svg" alt="Cypress Command"><div class="content"><div class="accent"></div><h1>${headline}</h1></div><div class="foot">${s.kind==='announcement'?'[Supporting detail]<br>[Date or next action]':'Real estate · Operations · Systems'}</div><div class="bracket" aria-hidden="true"></div></body></html>`;
 fs.writeFileSync(path.join(out,'social/templates',`${s.name}.html`),source);
}

const printHtml=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Cypress Command business card template</title><style>@font-face{font-family:Inter;src:url('../fonts/Inter-400.woff2');font-weight:100 900}*{box-sizing:border-box}body{margin:0;background:#ddd;font-family:Inter,Arial,sans-serif;color:${C.charcoal}}.side{width:3.75in;height:2.25in;margin:20px;position:relative;overflow:hidden;break-after:page}.front{background:${C.cypress};display:grid;place-items:center}.front img{width:3in}.back{background:${C.bone};padding:.30in .32in}.back h1{font-size:14pt;font-weight:600;line-height:1.1;margin:0 0 .04in}.role{font-size:9.5pt;margin:0}.details{font-size:8.8pt;line-height:1.4;margin:.18in 0 0}.back img{position:absolute;width:.525in;right:.32in;top:.32in}.notes{max-width:680px;font:14px/1.6 Arial;margin:20px}@media print{@page{size:3.75in 2.25in;margin:0}body{background:none}.side{margin:0}.notes{display:none}.side:last-of-type{break-after:auto}*{print-color-adjust:exact;-webkit-print-color-adjust:exact}}</style><body><div class="notes">Two-sided template. Trim: 3.5 x 2 inches. Bleed: 0.125 inch on all sides. Replace bracketed fields before sending to print. The generated PDF has TrimBox and BleedBox set; its colors are sRGB for vendor proofing.</div><section class="side front"><img src="../logos/svg/cc-04c-horizontal-reverse.svg" alt="Cypress Command"></section><section class="side back"><img src="../logos/svg/cc-04c-mark-cypress.svg" alt=""><h1 contenteditable="true">Adam Abdalla</h1><p class="role" contenteditable="true">Owner / Founder</p><p class="details" contenteditable="true">[Email]<br>[Phone]<br>[Website]</p></section></body></html>`;
fs.writeFileSync(path.join(out,'print/Business_Card.html'),printHtml.replace('[Website]','cypresscommand.com'));

function embedSvg(name,x,y,w,h){let text=fs.readFileSync(path.join(out,'logos/svg',name),'utf8');return text.replace('<svg ',`<svg x="${x}" y="${y}" width="${w}" height="${h}" `);}
function svgFile(name,w,h,body,desc,unitW,unitH){fs.writeFileSync(path.join(out,'print',name),`<svg xmlns="http://www.w3.org/2000/svg" width="${unitW}" height="${unitH}" viewBox="0 0 ${w} ${h}"><title>Cypress Command ${desc}</title><desc>Approved 04C identity. ${desc}. Confirm vendor proof and actual placement before production.</desc>${body}</svg>`);}
svgFile('Sign_Horizontal_48x24in.svg',1152,576,`<rect width="1152" height="576" fill="${C.cypress}"/>${embedSvg('cc-04c-horizontal-reverse.svg',100,121,952,333)}`,'48 x 24 inch sign face layout', '48in','24in');
svgFile('Vehicle_Door_18x12in.svg',864,576,embedSvg('cc-04c-horizontal-cypress.svg',48,154,768,269),'18 x 12 inch transparent decal artboard','18in','12in');
svgFile('Field_Decal_60x60mm.svg',600,600,embedSvg('cc-04c-mark-cypress.svg',132,140,336,320),'60mm decal artboard, 33.6 x 32mm symbol, transparent background and full clear space','60mm','60mm');
svgFile('Embroidery_Icon_25mm.svg',168,160,fs.readFileSync(path.join(out,'logos/svg/cc-04c-mark-black.svg'),'utf8'),'26.25 x 25mm single-color symbol; vendor must digitize and stitch-test','26.25mm','25mm');
svgFile('Apparel_Lockup_115mm.svg',732,256,fs.readFileSync(path.join(out,'logos/svg/cc-04c-horizontal-black.svg'),'utf8'),'115mm wide lockup including built-in clear space; symbol height 25.14mm; vendor stitch-test required','115mm','40.2186mm');

// Adobe Swatch Exchange RGB swatches, exact brand values; not CMYK/Pantone approximations.
const chunks=[];for(const [name,hex] of Object.entries(C)){
 const label=name[0].toUpperCase()+name.slice(1),str=Buffer.alloc((label.length+1)*2);for(let i=0;i<label.length;i++)str.writeUInt16BE(label.charCodeAt(i),i*2);
 const data=Buffer.alloc(2+str.length+4+12+2);data.writeUInt16BE(label.length+1);str.copy(data,2);data.write('RGB ',2+str.length);[1,3,5].forEach((at,i)=>data.writeFloatBE(parseInt(hex.slice(at,at+2),16)/255,6+str.length+i*4));data.writeUInt16BE(0,data.length-2);
 const head=Buffer.alloc(6);head.writeUInt16BE(1);head.writeUInt32BE(data.length,2);chunks.push(head,data);
}const aseHead=Buffer.alloc(12);aseHead.write('ASEF');aseHead.writeUInt16BE(1,4);aseHead.writeUInt16BE(0,6);aseHead.writeUInt32BE(5,8);fs.writeFileSync(path.join(out,'colors/Cypress_Command_RGB.ase'),Buffer.concat([aseHead,...chunks]));
fs.writeFileSync(path.join(out,'colors/palette.json'),JSON.stringify(C,null,2));

async function render(){
 const browser=await chromium.launch({channel:'msedge',headless:true,args:['--allow-file-access-from-files']});
 const page=await browser.newPage({viewport:{width:1280,height:960},deviceScaleFactor:1});
 let remote=0;page.on('request',r=>{if(/^https?:/.test(r.url()))remote++});
 const records=[];
 for(const s of spec){
  await page.setViewportSize({width:s.w,height:s.h});await page.goto(pathToFileURL(path.join(out,'social/templates',`${s.name}.html`)).href,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('h1,.logo,.symbol,.foot')].map(e=>({cls:e.className||e.tagName,...Object.fromEntries(['x','y','width','height','right','bottom'].map(k=>[k,e.getBoundingClientRect()[k]]))})).filter(b=>b.x<0||b.y<0||b.right>innerWidth||b.bottom>innerHeight));
  if(overflow.length)throw Error(`Overflow ${s.name}: ${JSON.stringify(overflow)}`);
  await page.screenshot({path:path.join(out,'social',`${s.name}.png`)});records.push({file:`social/${s.name}.png`,width:s.w,height:s.h});
 }
 await sharp(path.join(out,'logos/svg/cc-04c-app-icon.svg'),{density:300}).resize(512,512).png().toFile(path.join(out,'social/avatar-512.png'));
 await page.setViewportSize({width:1280,height:960});await page.goto(pathToFileURL(path.join(out,'brand-guidelines.html')).href,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.emulateMedia({media:'print'});
 const guideOverflow=await page.locator('.sheet').evaluateAll(es=>es.map((s,i)=>({page:i+1,height:s.clientHeight,scroll:s.scrollHeight,bottom:Math.max(...[...s.children].filter(c=>!c.classList.contains('folio')).map(c=>c.getBoundingClientRect().bottom-s.getBoundingClientRect().top)),footer:s.querySelector('.folio').getBoundingClientRect().top-s.getBoundingClientRect().top})).filter(s=>s.scroll>s.height||s.bottom>s.footer-12));
 await page.pdf({path:path.join(out,'Brand_Standards.pdf'),preferCSSPageSize:true,printBackground:true,margin:{top:0,left:0,right:0,bottom:0}});
 await page.goto(pathToFileURL(path.join(out,'print/Business_Card.html')).href,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const cardTmp=path.join(qa,'business-card-raw.pdf');await page.pdf({path:cardTmp,preferCSSPageSize:true,printBackground:true,margin:{top:0,right:0,bottom:0,left:0}});
 const doc=await PDFDocument.load(fs.readFileSync(cardTmp));if(doc.getPageCount()!==2)throw Error('Business card must have exactly 2 pages');doc.getPages().forEach(p=>{p.setTrimBox(9,9,252,144);p.setBleedBox(0,0,270,162)});doc.setTitle('Cypress Command Business Card Template - Contact Fields Required');fs.writeFileSync(path.join(out,'print/Business_Card.pdf'),await doc.save());
 await browser.close();const guide=await PDFDocument.load(fs.readFileSync(path.join(out,'Brand_Standards.pdf')));
 const checks={social:records,remoteRequests:remote,guidePages:guide.getPageCount(),guideOverflow,cardPages:2,cardTrimPoints:[9,9,252,144],cardBleedPoints:[0,0,270,162]};fs.writeFileSync(path.join(qa,'asset-checks.json'),JSON.stringify(checks,null,2));console.log(JSON.stringify(checks,null,2));if(remote||guide.getPageCount()!==7||guideOverflow.length)process.exitCode=1;
}
render().catch(e=>{console.error(e);process.exitCode=1});
