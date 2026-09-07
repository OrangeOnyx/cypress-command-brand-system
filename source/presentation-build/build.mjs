import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const ROOT = 'C:/Users/adam/Documents/Codex/2026-09-05/referenced-chatgpt-conversation-this-is-an';
const BUILD = path.join(ROOT, 'work/cypress-release-slides');
const OUT = path.join(ROOT, 'outputs/Cypress_Command_Brand_System_v1.0/presentations');
const SOURCE = path.join(ROOT, 'outputs/Cypress_Command_04C_Adoption_Kit');
const SKILL = 'C:/Users/adam/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations';
const PYTHON = 'C:/Users/adam/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
process.env.RUNTIME_NODE_MODULES='C:/Users/adam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
process.env.RUNTIME_PYTHON=PYTHON;
process.env.RUNTIME_NODE='C:/Users/adam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe';
const {FontLibrary}=createRequire(path.join(process.env.RUNTIME_NODE_MODULES,'@oai/artifact-tool/package.json'))('skia-canvas');
const FONTDIR=path.join(ROOT,'outputs/Cypress_Command_Brand_System_v1.0/fonts/desktop');
FontLibrary.use('Cypress Inter',['CypressInter-Regular.ttf','CypressInter-Medium.ttf','CypressInter-SemiBold.ttf','CypressInter-Bold.ttf'].map(n=>path.join(FONTDIR,n)));
FontLibrary.use('Cypress Fraunces',[path.join(FONTDIR,'CypressFraunces-Regular.ttf')]);
const { finalizePresentation, applyPresentationChartFont } = await import(pathToFileURL(path.join(SKILL, 'container_tools/artifact_tool_utils.mjs')).href);
const C = { cypress:'#1E4D3A', moss:'#2F6B4E', amber:'#D97706', charcoal:'#0A1F16', bone:'#F3EDE0' };
const F = { display:'Cypress Fraunces', body:'Cypress Inter' };
const presentation = Presentation.create({slideSize:{width:1280,height:720}});
presentation.theme.colorScheme = { name:'Cypress Command 04C', themeColors:{
  accent1:C.cypress, accent2:C.moss, accent3:C.amber, accent4:C.charcoal, accent5:C.bone, accent6:C.moss,
  bg1:C.bone,bg2:C.cypress,tx1:C.charcoal,tx2:C.cypress,dk1:C.charcoal,dk2:C.cypress,lt1:'#FFFFFF',lt2:C.bone,hlink:C.cypress,folHlink:C.moss,
}};

function text(s,name,value,x,y,w,h,size=28,font=F.body,color=C.charcoal,bold=false,align='left') {
  const box = s.shapes.add({geometry:'textbox',name,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  box.text=value;
  box.text.style={typeface:font,fontSize:size,color,bold,alignment:align,verticalAlignment:'top',autoFit:'none',wrap:'square',insets:{left:0,right:0,top:0,bottom:0}};
  return box;
}
async function logo(s,file,x,y,w) {
  const blob=await fs.readFile(path.join(SOURCE,'logos/png',`${file}.png`));
  const meta=await sharp(blob).metadata();
  const im=s.images.add({blob:new Uint8Array(blob),contentType:'image/png',alt:'Cypress Command approved 04C logo',fit:'contain',position:{left:x,top:y,width:w,height:w*meta.height/meta.width}});
  im.lockAspectRatio=true;
  return im;
}
async function frame(s,x,y,w) {
  const blob=await fs.readFile(path.join(SOURCE,'logos/svg/cc-04d-support-frame.svg'));
  s.images.add({blob:new Uint8Array(blob),contentType:'image/svg+xml',alt:'Approved supporting 04D open-edge frame',fit:'contain',position:{left:x,top:y,width:w,height:w*900/1600}});
}
async function slide(dark=false) {
  const s=presentation.slides.add();
  s.background.fill=dark?C.cypress:C.bone;
  return s;
}
async function footer(s,n,dark=false) {
  await logo(s,dark?'cc-04c-horizontal-reverse':'cc-04c-horizontal-primary',54,623,260);
  text(s,'page-number',String(n).padStart(2,'0'),1178,662,46,25,16,F.body,dark?C.bone:C.cypress,false,'right');
}
function heading(s,title,sub='') {
  text(s,'slide-title',title,72,63,1120,84,50,F.display);
  if(sub) text(s,'slide-subtitle',sub,74,153,1090,45,23,F.body);
}
function notes(s,value) {
  s.speakerNotes.textFrame.setText(value+'\n\nBrand source: approved Cypress_Command_04C_Adoption_Kit. Logos embedded unchanged from its PNG/SVG masters. This template asserts no financial or operational company results.');
}

// 1. Title.
{
  const s=await slide();
  await logo(s,'cc-04c-horizontal-primary',54,44,348);
  text(s,'presentation-title','[Presentation title]',74,236,710,175,64,F.display);
  text(s,'presentation-subtitle','[A concise subtitle]',76,432,720,48,28);
  text(s,'presenter-date','[Presenter name]\n[Date]',77,548,780,74,21);
  await logo(s,'cc-04c-mark-primary',915,254,240);
  notes(s,'Title layout. Replace bracketed text. Keep the title to two lines. Use the existing logo as supplied.');
}
// 2. Section divider.
{
  const s=await slide(true);
  text(s,'section-number','[01]',74,84,220,47,25,F.body,C.bone);
  text(s,'section-heading','[Section title]',74,274,940,104,68,F.display,C.bone);
  text(s,'section-description','[One sentence introducing this section]',78,400,955,68,28,F.body,C.bone);
  await footer(s,2,true);
  notes(s,'Section divider. Duplicate this slide between major sections. Replace the section number and title.');
}
// 3. Executive summary.
{
  const s=await slide();
  heading(s,'[Executive summary]');
  text(s,'summary-recommendation','[The recommendation in one sentence]',74,200,1108,90,38,F.display,C.cypress);
  text(s,'summary-context-label','Context',74,324,500,40,25,F.body,C.cypress,true);
  text(s,'summary-context','[What matters now and why the decision is needed.]',74,378,504,120,27);
  text(s,'summary-decision-label','Decision requested',672,324,504,40,25,F.body,C.cypress,true);
  text(s,'summary-decision','[The specific approval, owner or next action.]',672,378,504,120,27);
  text(s,'summary-evidence','[Evidence source and date]',74,550,1100,40,18,F.body,C.cypress);
  await footer(s,3);
  notes(s,'Executive summary layout. Replace all bracketed text with verified information. Use concise narrative statements.');
}
// 4. Two-column comparison.
{
  const s=await slide();
  heading(s,'[Comparison title]','[The decision criterion or question]');
  text(s,'option-a-heading','[Option A]',74,238,506,62,36,F.display,C.cypress);
  text(s,'option-a-detail','[Primary advantage]\n\n[Main tradeoff]\n\n[Cost or effort]',74,322,502,248,27);
  text(s,'option-b-heading','[Option B]',674,238,506,62,36,F.display,C.cypress);
  text(s,'option-b-detail','[Primary advantage]\n\n[Main tradeoff]\n\n[Cost or effort]',674,322,502,248,27);
  await footer(s,4);
  notes(s,'Comparison layout. Keep the same criteria and units in each column. Add source detail in speaker notes for claims and numbers.');
}
// 5. Blank editable data table.
{
  const s=await slide();
  heading(s,'[Table title]','[Units, scope and reporting period]');
  const values=[['[Measure]','[Period]','[Value]','[Notes]'],['','','',''],['','','',''],['','','',''],['','','','']];
  const table=s.tables.add({rows:5,columns:4,left:74,top:239,width:1132,height:310,columnWidths:[350,202,182,398],values});
  table.styleOptions={headerRow:true,bandedRows:false};
  table.borders.assign({style:'solid',fill:C.cypress,width:0.7});
  for(let r=0;r<5;r++) for(let c=0;c<4;c++) {
    const cell=table.getCell(r,c);
    cell.fill=r===0?C.cypress:C.bone;
    cell.text.style={typeface:F.body,fontSize:r===0?23:25,color:r===0?C.bone:C.charcoal,bold:r===0,autoFit:'none'};
  }
  table.cells.block({row:0,column:0,rowCount:5,columnCount:4}).assign({margins:{left:15,right:15,top:15,bottom:15},anchor:'center'});
  text(s,'table-source','[Source and as-of date]',74,572,1100,34,18,F.body,C.cypress);
  await footer(s,5);
  notes(s,'Native PowerPoint table. Click a cell to enter values. Add or remove rows through Table Layout. State units and source. No example business data is included.');
}
// 6. Editable chart with explicit neutral examples.
{
  const s=await slide();
  heading(s,'[Chart title]');
  text(s,'chart-disclosure','Illustrative data. Replace every value and label.',74,152,1110,39,23,F.body,C.cypress);
  const chart=s.charts.add('bar',{
    position:{left:74,top:217,width:1127,height:344},
    categories:['Example A','Example B','Example C'],
    series:[{name:'Example value',values:[1,2,3],fill:C.cypress,valuesFormatCode:'0'}],
    barOptions:{direction:'column',grouping:'clustered',gapWidth:180},hasLegend:false,
    xAxis:{visible:true,textStyle:{typeface:F.body,fontSize:22,fill:C.charcoal},line:{fill:C.cypress,width:1},majorGridlines:null},
    yAxis:{visible:true,min:0,max:4,majorUnit:1,numberFormatCode:'0',textStyle:{typeface:F.body,fontSize:18,fill:C.charcoal},line:{fill:'none',width:0},majorGridlines:{fill:'#CED5C7',width:0.7}},
    dataLabels:{showValue:true,position:'outEnd',textStyle:{typeface:F.body,fontSize:22,fill:C.charcoal}},
    chartFill:C.bone,plotAreaFill:C.bone,chartLine:{fill:'none',width:0},plotAreaLine:{fill:'none',width:0},
  });
  applyPresentationChartFont(chart,{fontFamily:F.body});
  text(s,'chart-source','[Metric, units, period and source]',74,577,1100,36,18,F.body,C.cypress);
  await footer(s,6);
  notes(s,'Native editable chart with neutral illustrative values 1, 2 and 3 only. Use Chart Design > Edit Data to change the embedded workbook. Replace examples, units, labels and source before presenting.');
}
// 7. Image / case study placeholder.
{
  const s=await slide();
  heading(s,'[Project or case study]');
  await frame(s,40,216,692);
  text(s,'image-placeholder','[Add a project photograph]',142,367,483,64,29,F.body,C.cypress,false,'center');
  text(s,'case-context-heading','[Context]',790,232,420,48,31,F.display,C.cypress);
  text(s,'case-context','[A short statement of the situation and the work.]',790,299,405,132,26);
  text(s,'case-result-heading','[Outcome]',790,467,405,47,31,F.display,C.cypress);
  text(s,'case-result','[Verified result or current status.]',790,525,405,73,26);
  await footer(s,7);
  notes(s,'Image placeholder layout. Replace the left frame and its placeholder label with an approved photograph. Preserve the image aspect ratio or crop without removing meaningful evidence. Add photo rights, source and any result support here.');
}
// 8. Closing.
{
  const s=await slide(true);
  await logo(s,'cc-04c-horizontal-reverse',57,49,343);
  text(s,'closing-heading','[Next step]',74,242,1072,105,68,F.display,C.bone);
  text(s,'closing-action','[Action, owner and date]',77,379,1037,62,31,F.body,C.bone);
  text(s,'closing-contact','[Name]\n[Verified email or phone]\ncypresscommand.com',78,522,970,110,24,F.body,C.bone);
  notes(s,'Closing layout. Enter the agreed action and only verified contact details. Delete unused placeholders. Adam confirmed ownership of cypresscommand.com. The domain is included as a confirmed brand contact field, without asserting that a website is live or email is configured.');
}

await fs.mkdir(BUILD,{recursive:true});
await fs.mkdir(OUT,{recursive:true});
await (await PresentationFile.exportPptx(presentation)).save(path.join(BUILD,'candidate.pptx'));
for(let i=0;i<presentation.slides.items.length;i++){
  const s=presentation.slides.items[i];
  const png=await presentation.export({slide:s,format:'png',scale:1.5});
  await fs.writeFile(path.join(BUILD,`draft-slide-${i+1}.png`),new Uint8Array(await png.arrayBuffer()));
}
const result=await finalizePresentation({
  workspaceDir:ROOT,candidatePath:path.join(BUILD,'candidate.pptx'),finalPath:path.join(OUT,'Cypress_Command_Presentation_Template_v1.0_r3.pptx'),
  pythonExecutable:PYTHON,
  integrityValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(SKILL,'container_tools/inspect_presentation_layout_geometry.py'),
  explicitTotalSlideCount:8,requiredNativeTableOwnerSlides:[5],requiredNativeChartOwnerSlides:[6],
  materializeLiteralChartWorkbooks:true,
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit','--require-native-table-slide','5'],
  fontPolicy:{basis:'design',families:[F.display,F.body]},verifyArtifactToolImport:true,
  receiptPath:path.join(BUILD,'validation-portable-r3.json'),
});
console.log(JSON.stringify(result,null,2));
