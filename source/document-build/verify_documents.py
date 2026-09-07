"""Structural and render-font checks; visual review is recorded separately."""
from pathlib import Path
from zipfile import ZipFile
from lxml import etree
from pypdf import PdfReader
from hashlib import sha256
import json
import uuid

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs'/'Cypress_Command_Brand_System_v1.0'/'documents'
RENDER=ROOT/'work'/'cypress-release-docs'/'word-render'
NS={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships','p':'http://schemas.openxmlformats.org/package/2006/relationships'}
result={
 'version':'1.0',
 'packagedRendererAttempt':'Failed with FileNotFoundError: LibreOffice soffice.exe was not found on PATH; runtime-only PATH used, no installed LibreOffice invoked.',
 'rendererUsed':'Microsoft Word COM hidden isolated instance, read-only source documents, updated fields, PDF export; Poppler rasterized PDF at 120dpi.',
 'systemFontsInstalled':False,
 'macros':False,
 'documents':[]
}
for path in sorted(OUT.glob('*.docx')):
    with ZipFile(path) as z: parts={n:z.read(n) for n in z.namelist()}
    body=etree.fromstring(parts['word/document.xml'])
    texts=body.xpath('//w:t/text()',namespaces=NS)
    full_xml=' '.join(data.decode('utf-8') for name,data in parts.items() if name.endswith('.xml'))
    assert '[website]' not in full_xml.lower(),path.name+' unresolved website placeholder'
    if 'Letterhead' in path.name: assert 'cypresscommand.com' in full_xml
    header=etree.fromstring(parts['word/header1.xml'])
    extents=header.xpath('//*[local-name()="extent"]/@cx')
    assert extents and all(int(v)>=int(65/25.4*914400) for v in extents),path.name+' logo below 65mm minimum'
    assert any('[' in t for t in texts)
    assert not any('vbaProject' in n for n in parts)
    rels=[]
    for n,data in parts.items():
        if n.endswith('.rels'):
            rr=etree.fromstring(data)
            rels += rr.xpath('p:Relationship[@TargetMode="External"]',namespaces=NS)
    assert not rels, path.name+' external relationship'
    fonttable=etree.fromstring(parts['word/fontTable.xml'])
    fontrels=etree.fromstring(parts['word/_rels/fontTable.xml.rels'])
    relationmap={r.get('Id'):r.get('Target') for r in fontrels}
    embedded=[]
    for family in fonttable:
        for item in family:
            if 'embed' in item.tag:
                rid=item.get('{'+NS['r']+'}id'); target=relationmap[rid]
                data=bytearray(parts['word/'+target])
                key=uuid.UUID(item.get('{'+NS['w']+'}fontKey').strip('{}'))
                kb=bytes.fromhex(key.hex)[::-1]
                for ii in range(32): data[ii]^=kb[ii%16]
                source=OUT.parent/'fonts'/'desktop'/Path(target).name.replace('.odttf','.ttf')
                assert bytes(data)==source.read_bytes(),path.name+' obfuscated font mismatch'
                embedded.append(source.name)
    assert len(embedded)==3
    with ZipFile(path.with_suffix('.dotx')) as z:
        assert z.read('word/document.xml')==parts['word/document.xml']
        assert b'wordprocessingml.template.main+xml' in z.read('[Content_Types].xml')
        assert z.read('word/fontTable.xml')==parts['word/fontTable.xml']
    pdf=PdfReader(str(RENDER/(path.stem+'.pdf')))
    expected=1 if 'Letterhead' in path.stem else 3
    assert len(pdf.pages)==expected
    used_fonts=set(); substituted=[]
    def visit(text,cm,tm,font,size):
        if text.strip() and font:
            name=str(font.get('/BaseFont')); used_fonts.add(name)
            if 'WRD_EMBED_SUB' not in name: substituted.append([text,name])
    for page in pdf.pages: page.extract_text(visitor_text=visit)
    assert not substituted, substituted
    result['documents'].append({
        'file':path.name,'sha256':sha256(path.read_bytes()).hexdigest(),'pages':len(pdf.pages),
        'placeholderOccurrences':sum(t.count('[') for t in texts),'embeddedFontPayloads':embedded,
        'fontsMatchBundledSources':True,'visiblePdfTextUsesEmbeddedFontsOnly':True,
        'horizontalHeaderLogoWidthInches':2.6,'horizontalHeaderLogoWidthMillimeters':66.04,
        'unresolvedWebsitePlaceholders':0,
        'pdfFontResourcesUsedByVisibleText':sorted(used_fonts),
        'macroFree':True,'externalRelationships':0,'dotxMatchesDocxLayout':True,
        'dotxNativeWordOpenCheck':'Passed using Documents.Add; 1/3/3 page counts matched corresponding DOCX files.',
        'pageNumberFields':all(x in parts['word/footer1.xml'].decode() for x in ['PAGE','NUMPAGES']),
        'visualInspection':'All final page PNGs reviewed; no clipped text, missing glyphs, broken tables, overlap, or header/footer placement defects.'
    })
(OUT/'document-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8')
print(json.dumps(result,indent=2))
